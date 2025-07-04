import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const shop = searchParams.get('shop');
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  if (!shop || !code) {
    return NextResponse.json({ error: 'Missing shop or code' }, { status: 400 });
  }
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  const redirectUri = process.env.SHOPIFY_REDIRECT_URI;
  // Exchange code for access token
  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });
  if (!tokenRes.ok) {
    return NextResponse.json({ error: 'Failed to get access token' }, { status: 400 });
  }
  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;
  // Fetch store info
  const storeRes = await fetch(`https://${shop}/admin/api/2023-10/shop.json`, {
    headers: { 'X-Shopify-Access-Token': accessToken },
  });
  if (!storeRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch store info' }, { status: 400 });
  }
  const storeData = await storeRes.json();
  const storeName = storeData.shop?.name || shop;
  // Clerk user
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  // Save to Supabase
  const { error } = await supabase.from('store_connections').insert({
    user_id: userId,
    store_type: 'shopify',
    store_name: storeName,
    store_url: shop,
    access_token: accessToken,
    status: 'connected',
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // Redirect to dashboard or show success
  return NextResponse.redirect('/dashboard/stores?connected=shopify');
} 