import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, store_id, categories, region } = body;
    if (!user_id || !categories) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const { error } = await supabase.from("user_cookie_consents").insert([
      {
        user_id,
        store_id,
        categories,
        region,
      },
    ]);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
} 