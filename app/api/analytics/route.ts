import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      page_path,
      referrer,
      country,
      session_id,
      event_type,
      occurred_at,
      user_id,
      store_id,
    } = body;

    // Basic validation
    if (!user_id || !page_path || !event_type || !occurred_at) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const { error } = await supabase.from("analytics_events").insert([
      {
        user_id,
        store_id,
        page_path,
        country,
        session_id,
        event_type,
        occurred_at,
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