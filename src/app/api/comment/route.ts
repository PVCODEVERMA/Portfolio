import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { name?: string; email?: string; comment?: string; page?: string }
      | null;

    const name = (body?.name ?? "").toString().slice(0, 80);
    const email = (body?.email ?? "").toString().slice(0, 120);
    const comment = (body?.comment ?? "").toString().slice(0, 2000);
    const page = (body?.page ?? "/").toString().slice(0, 120);

    if (!comment.trim()) {
      return NextResponse.json({ ok: false, error: "Comment is empty" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ ok: true, stored: false });
    }

    // Table expected: comments(page text, name text, email text, comment text, created_at timestamptz default now())
    const { error } = await supabase.from("comments").insert({
      page,
      name: name || null,
      email: email || null,
      comment,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // WhatsApp Notification (Non-blocking but awaited for completeness in this context)
    try {
      const waPhone = process.env.WHATSAPP_PHONE;
      const waKey = process.env.WHATSAPP_API_KEY;
      if (waPhone && waKey) {
        const text = `🚀 New Comment on Portfolio!\n\nName: ${name || "Anonymous"}\nEmail: ${email || "None"}\nComment: ${comment}`;
        // CallMeBot API: https://api.callmebot.com/whatsapp.php?phone=[phone]&text=[text]&apikey=[apikey]
        await fetch(
          `https://api.callmebot.com/whatsapp.php?phone=${waPhone}&text=${encodeURIComponent(text)}&apikey=${waKey}`
        ).catch((err) => console.error("WhatsApp notification error:", err));
      }
    } catch (waErr) {
      console.error("WhatsApp notification outer error:", waErr);
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}

