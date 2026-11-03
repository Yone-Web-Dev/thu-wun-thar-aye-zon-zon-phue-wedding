import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(url && anonKey);

const fetchWithTimeout: typeof fetch = (input, init) =>
  fetch(input, {
    ...init,
    signal: AbortSignal.timeout(15_000),
  });

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, { global: { fetch: fetchWithTimeout } })
  : null;
