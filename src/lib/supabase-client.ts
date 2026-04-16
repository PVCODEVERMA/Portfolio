import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (_client) return _client;
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
    "";

  if (!url || !key) {
    console.warn(
      "Supabase: Missing configuration.",
      !url ? "NEXT_PUBLIC_SUPABASE_URL is not set." : "",
      !key ? "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set." : ""
    );
    return null;
  }

  try {
    _client = createClient(url, key);
    return _client;
  } catch (err) {
    console.error("Supabase: Failed to initialize client:", err);
    return null;
  }
}
