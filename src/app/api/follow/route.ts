import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { platform?: string; handle?: string }
      | null;

    const platform = (body?.platform ?? "").toString().slice(0, 40);
    const handle = (body?.handle ?? "").toString().slice(0, 80);

    if (!platform) {
      return NextResponse.json({ ok: false, error: "Missing platform" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      // If DB isn't configured, still return success so UI works.
      return NextResponse.json({ ok: true, stored: false });
    }

    // Table expected: follows(platform text, handle text, created_at timestamptz default now())
    const { error } = await supabase.from("follows").insert({
      platform,
      handle: handle || null,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}

