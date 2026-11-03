import { GuestWish } from "../types/wedding";
import { isSupabaseConfigured, supabase } from "./supabase";

export interface WishRow {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

function requireClient() {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured. Restart the app after adding VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
    );
  }
  return supabase;
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
  const client = requireClient();
  const { data, error } = await client
    .from("wishes")
    .select("id, name, message, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as WishRow[] | null)?.map(mapWishRow) ?? [];
}

export async function insertWish(
  name: string,
  message: string,
): Promise<GuestWish> {
  const client = requireClient();
  const { data, error } = await client
    .from("wishes")
    .insert({
      name: name.trim(),
      message: message.trim(),
    })
    .select("id, name, message, created_at")
    .single();

  if (error) throw error;
  return mapWishRow(data as WishRow);
}

export function subscribeToWishes(handlers: {
  onInsert: (wish: GuestWish) => void;
  onUpdate: (wish: GuestWish) => void;
}): () => void {
  const client = requireClient();
  const channel = client
    .channel("live-wishes")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "wishes" },
      (payload) => {
        handlers.onInsert(mapWishRow(payload.new as WishRow));
      },
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "wishes" },
      (payload) => {
        handlers.onUpdate(mapWishRow(payload.new as WishRow));
      },
    )
    .subscribe();

  return () => {
    void client.removeChannel(channel);
  };
}

export function describeWishError(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    const message = String((error as { message?: string }).message || "");
    if (
      (error instanceof DOMException && error.name === "TimeoutError") ||
      /timeout|timed out|abort/i.test(message)
    ) {
      return "Supabase did not respond within 15 seconds. Check your connection, Vercel Supabase URL, and Supabase project status, then try again.";
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
