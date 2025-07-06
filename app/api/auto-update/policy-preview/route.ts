import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';
import { fetchLatestUSPrivacyBill, fetchLatestEULaw } from '@/lib/regulations';
import { generatePolicyText } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing rule id' }, { status: 400 });

  // Get rule and store
  const { data: rule, error } = await supabase
    .from('auto_update_rules')
    .select('*, stores:store_id(*)')
    .eq('id', id)
    .eq('user_id', userId)
    .single();
  if (error || !rule) return NextResponse.json({ error: error?.message || 'Rule not found' }, { status: 404 });

  // Fetch current policy from store
  let current = '';
  if (rule.stores.platform === 'shopify') {
    const url = `https://${rule.stores.store_url}/admin/api/2023-01/pages/${rule.page_id}.json`;
    const res = await fetch(url, {
      headers: { 'X-Shopify-Access-Token': rule.stores.access_token },
    });
    if (res.ok) {
      const data = await res.json();
      current = data.page?.body_html || '';
    }
  } else if (rule.stores.platform === 'woocommerce') {
    const url = `${rule.stores.store_url.replace(/\/$/, '')}/wp-json/wp/v2/pages/${rule.page_id}`;
    const authHeader = Buffer.from(`${rule.stores.api_key}:${rule.stores.api_secret}`).toString('base64');
    const res = await fetch(url, {
      headers: { Authorization: `Basic ${authHeader}` },
    });
    if (res.ok) {
      const data = await res.json();
      current = data.content?.rendered || '';
    }
  }

  // Fetch latest regulation
  let latestReg = '';
  if (rule.region === 'US') {
    latestReg = await fetchLatestUSPrivacyBill();
  } else if (rule.region === 'EU') {
    latestReg = await fetchLatestEULaw();
  }

  // Generate preview
  let preview = '';
  if (latestReg) {
    preview = await generatePolicyText({
      policy_type: rule.policy_type,
      store_type: rule.stores.platform,
      region: rule.region,
      regulation: latestReg,
    });
  }

  return NextResponse.json({ current, preview });
} 