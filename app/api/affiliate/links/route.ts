import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: links, error } = await supabase
      .from('referral_links')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching referral links:', error);
      return NextResponse.json({ error: 'Failed to fetch referral links' }, { status: 500 });
    }

    // Add full URLs to the links
    const linksWithUrls = links?.map(link => ({
      ...link,
      full_url: `${process.env.NEXT_PUBLIC_APP_URL}/ref/${link.link_code}`
    })) || [];

    return NextResponse.json({ links: linksWithUrls });

  } catch (error) {
    console.error('Referral links API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    // Generate unique link code
    const linkCode = randomBytes(8).toString('hex');

    // Create new referral link
    const { data: link, error } = await supabase
      .from('referral_links')
      .insert({
        user_id: userId,
        link_code: linkCode,
        name: name || `Link ${Date.now()}`,
        clicks: 0,
        conversions: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating referral link:', error);
      return NextResponse.json({ error: 'Failed to create referral link' }, { status: 500 });
    }

    const linkWithUrl = {
      ...link,
      full_url: `${process.env.NEXT_PUBLIC_APP_URL}/ref/${link.link_code}`
    };

    return NextResponse.json({ link: linkWithUrl });

  } catch (error) {
    console.error('Create referral link API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 