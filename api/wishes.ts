import type { IncomingMessage, ServerResponse } from "node:http";

type VercelRequest = IncomingMessage & { body?: unknown };
type VercelResponse = ServerResponse;

interface WishRow {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

function respond(
  response: VercelResponse,
  status: number,
  body: unknown,
): void {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(body));
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim() || process.env.VITE_SUPABASE_URL?.trim();
  const anonKey =
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.VITE_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) return null;

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "https:") return null;
    return { url: parsedUrl.origin, anonKey };
  } catch {
    return null;
  }
}

async function readJsonBody(request: VercelRequest): Promise<unknown> {
  if (request.body !== undefined) return request.body;

  const chunks: Buffer[] = [];
  let totalSize = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalSize += buffer.length;
    if (totalSize > 8_192) throw new Error("Request body is too large.");
    chunks.push(buffer);
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function getSupabaseErrorMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "Supabase returned an unexpected response.";
  }

  const error = payload as { code?: unknown; message?: unknown };
  const code = String(error.code ?? "");
  const message = String(error.message ?? "");

  if (code === "42P01" || code === "PGRST205") {
    return "The wishes table was not found. Run the guestbook SQL in the Supabase SQL Editor.";
  }
  if (code === "42501" || /row-level security|permission denied/i.test(message)) {
    return "Supabase blocked this request. Check the public read and insert policies on wishes.";
  }
  return message || "Supabase rejected the guestbook request.";
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> {
  if (request.method !== "GET" && request.method !== "POST") {
    response.setHeader("Allow", "GET, POST");
    respond(response, 405, { error: "Method not allowed." });
    return;
  }

  const config = getSupabaseConfig();
  if (!config) {
    respond(response, 503, {
      error: "Guestbook server configuration is missing or invalid.",
    });
    return;
  }

  let body: { name?: unknown; message?: unknown } | undefined;
  if (request.method === "POST") {
    try {
      const parsed = await readJsonBody(request);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        respond(response, 400, { error: "A name and message are required." });
        return;
      }
      body = parsed as { name?: unknown; message?: unknown };
    } catch (error) {
      respond(response, 400, {
        error: error instanceof Error ? error.message : "Invalid request body.",
      });
      return;
    }

    const name = body.name;
    const message = body.message;
    if (typeof name !== "string" || typeof message !== "string") {
      respond(response, 400, { error: "A name and message are required." });
      return;
    }

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (trimmedName.length < 1 || trimmedName.length > 100) {
      respond(response, 400, {
        error: "Your name must be between 1 and 100 characters.",
      });
      return;
    }
    if (trimmedMessage.length < 3 || trimmedMessage.length > 2000) {
      respond(response, 400, {
        error: "Your message must be between 3 and 2000 characters.",
      });
      return;
    }
    body = { name: trimmedName, message: trimmedMessage };
  }

  const endpoint = new URL("/rest/v1/wishes", config.url);
  const headers: Record<string, string> = {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.anonKey}`,
  };

  if (request.method === "GET") {
    endpoint.search = new URLSearchParams({
      select: "id,name,message,created_at",
      order: "created_at.desc",
      limit: "200",
    }).toString();
  } else {
    endpoint.search = new URLSearchParams({
      select: "id,name,message,created_at",
    }).toString();
    headers["Content-Type"] = "application/json";
    headers.Prefer = "return=representation";
  }

  let upstream: Response;
  try {
    upstream = await fetch(endpoint, {
      method: request.method,
      headers,
      body: request.method === "POST" ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(8_000),
    });
  } catch (error) {
    console.error("Guestbook Supabase request failed", error);
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    respond(response, 502, {
      error: timedOut
        ? "Supabase did not respond within 8 seconds. Check that the project is active and the server environment variables point to it."
        : "The guestbook server could not connect to Supabase.",
    });
    return;
  }

  const responseText = await upstream.text();
  let payload: unknown;
  try {
    payload = responseText ? JSON.parse(responseText) : null;
  } catch {
    payload = null;
  }

  if (!upstream.ok) {
    console.error("Guestbook Supabase request returned an error", {
      status: upstream.status,
      payload,
    });
    respond(response, upstream.status, {
      error: getSupabaseErrorMessage(payload),
    });
    return;
  }

  if (request.method === "GET") {
    respond(response, 200, Array.isArray(payload) ? payload : []);
    return;
  }

  const insertedWish = Array.isArray(payload) ? (payload[0] as WishRow) : null;
  if (!insertedWish?.id) {
    respond(response, 502, { error: "Supabase did not return the saved wish." });
    return;
  }

  respond(response, 201, insertedWish);
}
