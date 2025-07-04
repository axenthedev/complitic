import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import * as cheerio from "cheerio";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function extractTrackers(html: string) {
  const trackers: string[] = [];
  if (/googletagmanager|gtag\.|google-analytics/i.test(html)) trackers.push("Google Analytics");
  if (/connect\.facebook\.net|fbq\(|fbevents\.js|Meta Pixel/i.test(html)) trackers.push("Meta Pixel");
  // Add more tracker regexes as needed
  return trackers;
}

export async function POST(req: NextRequest) {
  try {
    const { user_id, store_id, url } = await req.json();
    if (!user_id || !url) {
      return NextResponse.json({ error: "Missing user_id or url" }, { status: 400 });
    }
    // Fetch HTML
    let html;
    try {
      const response = await axios.get(url, { timeout: 30000 });
      html = response.data;
    } catch (err: any) {
      if (err.code === 'ECONNABORTED') {
        return NextResponse.json({ error: "The website took too long to respond. Please try again later or check the site URL." }, { status: 504 });
      }
      if (err.code === 'ENOTFOUND' || err.code === 'EAI_AGAIN' || /getaddrinfo/.test(err.message)) {
        return NextResponse.json({ error: "The provided link could not be reached or is not a valid store URL. Please check the URL and try again." }, { status: 400 });
      }
      return NextResponse.json({ error: err.message || "Failed to fetch site HTML" }, { status: 500 });
    }
    const $ = cheerio.load(html);

    // Check for privacy policy and terms links
    const links = $("a").map((_, el) => $(el).attr("href") || "").get();
    const privacy_policy_found = links.some((href) => /privacy/i.test(href));
    const terms_found = links.some((href) => /terms/i.test(href));
    const return_policy_found = links.some((href) => /return/i.test(href));
    const disclaimer_found = links.some((href) => /disclaimer/i.test(href));
    const shipping_policy_found = links.some((href) => /shipping/i.test(href));
    const payment_policy_found = links.some((href) => /payment/i.test(href));

    // Check for cookie banner/scripts
    const cookie_banner_found =
      $("[id*='cookie']").length > 0 ||
      $("[class*='cookie']").length > 0 ||
      /cookie(consent|banner|notice)/i.test(html);

    // Trackers
    const trackers = extractTrackers(html);

    // Contact info
    const emails = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    const tels = html.match(/tel:[+\d\-() ]{7,}/g) || [];
    const contact_info = { emails, tels };

    // Save to Supabase
    const { error } = await supabase.from("compliance_scans").insert([
      {
        user_id,
        store_id,
        url,
        privacy_policy_found,
        terms_found,
        return_policy_found,
        disclaimer_found,
        shipping_policy_found,
        payment_policy_found,
        cookie_banner_found,
        trackers,
        contact_info,
        status: "completed",
      },
    ]);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({
      privacy_policy_found,
      terms_found,
      return_policy_found,
      disclaimer_found,
      shipping_policy_found,
      payment_policy_found,
      cookie_banner_found,
      trackers,
      contact_info,
      status: "completed",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
} 