import { GuestWish } from "../types/wedding";

export interface WishRow {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

async function requestApi<T>(method: "GET" | "POST", body?: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch("/api/wishes", {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(12_000),
    });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new Error("The guestbook server did not respond in time. Please try again.");
    }
    throw new Error("Could not reach the guestbook server. Check your connection and try again.");
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "error" in payload
        ? String(payload.error)
        : `Guestbook request failed (${response.status}).`;
    throw new Error(message);
  }

  return payload as T;
}

export function formatWishDate(createdAt: string): string {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function mapWishRow(row: WishRow): GuestWish {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    timestamp: Date.parse(row.created_at) || Date.now(),
    formattedDate: formatWishDate(row.created_at),
  };
}

export async function fetchWishes(): Promise<GuestWish[]> {
  const rows = await requestApi<WishRow[]>("GET");
  return rows.map(mapWishRow);
}

export async function insertWish(
  name: string,
  message: string,
): Promise<GuestWish> {
  const row = await requestApi<WishRow>("POST", {
    name: name.trim(),
    message: message.trim(),
  });
  return mapWishRow(row);
}

export function describeWishError(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    const message = String((error as { message?: string }).message || "");
    if (
      (error instanceof DOMException && error.name === "TimeoutError") ||
      /timeout|timed out|abort/i.test(message)
    ) {
      return "The guestbook server did not respond in time. Check the Vercel function logs and Supabase project status, then try again.";
    }
    if (
      /relation .*wishes.* does not exist/i.test(message) ||
      /could not find the table .*wishes/i.test(message) ||
      message.includes("42P01") ||
      message.includes("PGRST205")
    ) {
      return "The wishes table was not found. Run the guestbook SQL in the Supabase SQL Editor.";
    }
    if (/row-level security|RLS|permission denied|42501/i.test(message)) {
      return "Supabase blocked this save. Check that the public insert policy is enabled on wishes.";
    }
    if (message) return message;
  }
  if (error instanceof Error && error.message) return error.message;
  return "Could not save your wish. Please try again.";
}
