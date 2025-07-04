import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get('shop');
  if (!shop) {
    return NextResponse.json({ error: 'Missing shop parameter' }, { status: 400 });
  }
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const redirectUri = process.env.SHOPIFY_REDIRECT_URI;
  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: 'Shopify app not configured' }, { status: 500 });
  }
  const scopes = 'read_products,read_orders'; // Adjust as needed
  const state = Math.random().toString(36).substring(2); // Optionally store for CSRF
  // Sanitize shop: remove protocol, www, and trailing slashes
  const sanitizedShop = shop.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
  const oauthUrl = `https://${sanitizedShop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
  return NextResponse.redirect(oauthUrl);
} 