import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { name?: string; email?: string; comment?: string; page?: string }
      | null;

    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
    }

    const name = (body?.name ?? "").toString().slice(0, 80);
    const email = (body?.email ?? "").toString().slice(0, 120);
    const comment = (body?.comment ?? "").toString().slice(0, 2000);
    const page = (body?.page ?? "/").toString().slice(0, 120);

    if (!comment.trim()) {
      return NextResponse.json({ ok: false, error: "Comment is empty" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      console.error("Supabase client failed to initialize. Check SUPABASE_URL and SUPABASE_ANON_KEY.");
      return NextResponse.json({ ok: false, error: "Database configuration missing" }, { status: 500 });
    }

    // Table expected: comments(page text, name text, email text, comment text, created_at timestamptz default now())
    const { error: dbError } = await supabase.from("comments").insert({
      page,
      name: name || null,
      email: email || null,
      comment,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ 
        ok: false, 
        error: `Database error: ${dbError.message}. Make sure the 'comments' table exists in Supabase.` 
      }, { status: 500 });
    }

    // WhatsApp Notification (Non-blocking)
    const waPhone = process.env.WHATSAPP_PHONE;
    const waKey = process.env.WHATSAPP_API_KEY;
    if (waPhone && waKey) {
      const text = `🚀 New Comment on Portfolio!\n\nName: ${name || "Anonymous"}\nEmail: ${email || "None"}\nComment: ${comment}`;
      fetch(
        `https://api.callmebot.com/whatsapp.php?phone=${waPhone}&text=${encodeURIComponent(text)}&apikey=${waKey}`
      ).catch((err) => console.error("WhatsApp notification error:", err));
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (e: any) {
    console.error("API error:", e);
    return NextResponse.json({ ok: false, error: e.message || "Internal Server Error" }, { status: 500 });
  }
}

