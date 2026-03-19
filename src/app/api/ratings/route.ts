import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error("Supabase internal error");

    const { data: ratings, error } = await supabase
      .from("ratings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    return NextResponse.json({ ok: true, ratings });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, user_name, user_email, avatar_url, rating, comment } = body;

    if (!user_id || !user_email || !rating) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error("Supabase server client missing");

    const { data, error } = await supabase
      .from("ratings")
      .insert([
        { user_id, user_name, user_email, avatar_url, rating, comment }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, data });
  } catch (error: any) {
    if (error.code === '23505') {
       return NextResponse.json({ ok: false, error: "You have already submitted a rating. Thank you!" }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
