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

function validateUrl(url: string): { isValid: boolean; error?: string } {
  try {
    const urlObj = new URL(url);
    if (!urlObj.protocol || !urlObj.hostname) {
      return { isValid: false, error: "Please enter a valid URL with protocol (e.g., https://example.com)" };
    }
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: "Only HTTP and HTTPS protocols are supported" };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, error: "Please enter a valid URL (e.g., https://example.com)" };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user_id, store_id, url } = await req.json();
    
    // Validate required fields
    if (!user_id) {
      return NextResponse.json({ error: "User authentication required" }, { status: 401 });
    }
    if (!url) {
      return NextResponse.json({ error: "Please enter a website URL to scan" }, { status: 400 });
    }

    // Validate URL format
    const urlValidation = validateUrl(url);
    if (!urlValidation.isValid) {
      return NextResponse.json({ error: urlValidation.error }, { status: 400 });
    }

    // Fetch HTML
    let html;
    try {
      const response = await axios.get(url, { 
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      html = response.data;
    } catch (err: any) {
      // Handle different types of network errors
      if (err.code === 'ECONNABORTED') {
        return NextResponse.json({ 
          error: "The website took too long to respond (timeout after 30 seconds). Please try again later or check if the website is accessible." 
        }, { status: 504 });
      }
      
      if (err.code === 'ENOTFOUND' || err.code === 'EAI_AGAIN' || /getaddrinfo/.test(err.message)) {
        return NextResponse.json({ 
          error: "Website not found. Please check the URL and make sure the website is accessible." 
        }, { status: 404 });
      }
      
      if (err.code === 'ECONNREFUSED') {
        return NextResponse.json({ 
          error: "Connection refused. The website may be down or blocking our requests." 
        }, { status: 503 });
      }
      
      if (err.response) {
        // HTTP error responses
        const status = err.response.status;
        if (status === 403) {
          return NextResponse.json({ 
            error: "Access denied. This website is blocking automated access. Please try scanning a different website." 
          }, { status: 403 });
        }
        if (status === 404) {
          return NextResponse.json({ 
            error: "Page not found. Please check the URL and make sure the page exists." 
          }, { status: 404 });
        }
        if (status >= 500) {
          return NextResponse.json({ 
            error: "The website is experiencing technical difficulties. Please try again later." 
          }, { status: 502 });
        }
        return NextResponse.json({ 
          error: `Website returned an error (${status}). Please try again later.` 
        }, { status: 502 });
      }
      
      return NextResponse.json({ 
        error: "Unable to access the website. Please check the URL and try again." 
      }, { status: 500 });
    }

    // Validate that we got HTML content
    if (!html || typeof html !== 'string') {
      return NextResponse.json({ 
        error: "The website returned invalid content. Please try a different website." 
      }, { status: 400 });
    }

    if (html.length < 100) {
      return NextResponse.json({ 
        error: "The website returned very little content. This might not be a valid webpage." 
      }, { status: 400 });
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
    const { error: dbError } = await supabase.from("compliance_scans").insert([
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
    
    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ 
        error: "Failed to save scan results. Please try again." 
      }, { status: 500 });
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
    console.error("Unexpected error:", err);
    return NextResponse.json({ 
      error: "An unexpected error occurred. Please try again later." 
    }, { status: 500 });
  }
} 