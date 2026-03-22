import { createClient } from "@supabase/supabase-js";

export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || process.env.SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Prefer service role if present (server-only). Otherwise fall back to anon key
  const key = serviceRoleKey || anonKey;
  
  if (!url || !key) {
    if (url || key) console.warn("Supabase Config Half-Missing: URL:", !!url, " Key:", !!key);
    return null;
  }

  // Basic validation to ensure it's a Supabase key (JWT format)
  if (!key.startsWith('eyJ')) {
    console.error("Supabase Error: The provided key does NOT look like a valid Supabase JWT. It starts with:", key.substring(0, 15));
    if (key.startsWith('sb_publishable_')) {
      console.error("HINT: This looks like a Stytch publishable key. Please check your .env.local file.");
    }
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

