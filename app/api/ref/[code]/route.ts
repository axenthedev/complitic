import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    
    if (!code) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Find the referral link
    const { data: link, error: linkError } = await supabase
      .from('referral_links')
      .select('*')
      .eq('link_code', code)
      .single();

    if (linkError || !link) {
      console.error('Referral link not found:', code);
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Increment click count
    await supabase
      .from('referral_links')
      .update({ clicks: link.clicks + 1 })
      .eq('id', link.id);

    // Update affiliate stats
    const { data: stats } = await supabase
      .from('affiliate_stats')
      .select('*')
      .eq('user_id', link.user_id)
      .single();

    if (stats) {
      await supabase
        .from('affiliate_stats')
        .update({ 
          clicks: stats.clicks + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', stats.id);
    }

    // Store click event for analytics
    await supabase
      .from('referral_clicks')
      .insert({
        referral_link_id: link.id,
        user_id: link.user_id,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
        referrer: request.headers.get('referer') || 'direct'
      });

    // Set referral cookie for 30 days
    const response = NextResponse.redirect(new URL('/signup?ref=' + code, request.url));
    response.cookies.set('ref_code', code, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return response;

  } catch (error) {
    console.error('Referral tracking error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
} 