import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  const { store_url, api_key, api_secret } = await req.json();
  if (!store_url || !api_key || !api_secret) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  // Validate WooCommerce credentials
  const endpoint = `${store_url.replace(/\/$/, '')}/wp-json/wc/v3/products?per_page=1`;
  const authHeader = Buffer.from(`${api_key}:${api_secret}`).toString('base64');
  const res = await fetch(endpoint, {
    headers: { 'Authorization': `Basic ${authHeader}` },
  });
  if (!res.ok) {
    return NextResponse.json({ error: 'Invalid WooCommerce credentials or store URL' }, { status: 400 });
  }
  // Clerk user
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  // Save to Supabase
  const { error } = await supabase.from('store_connections').insert({
    user_id: userId,
    store_type: 'woocommerce',
    store_name: store_url,
    store_url,
    api_key,
    api_secret,
    status: 'connected',
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
} 