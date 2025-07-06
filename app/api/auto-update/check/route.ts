import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { fetchLatestUSPrivacyBill, fetchLatestEULaw, getRegulationHash } from '@/lib/regulations';
import { generatePolicyText } from '@/lib/gemini';
import { updateShopifyPolicy, updateWooPolicy } from '@/lib/store-update';

export async function POST(req: NextRequest) {
  // 1. Get all active auto_update_rules with store info
  const { data: rules, error } = await supabase
    .from('auto_update_rules')
    .select('*, stores:store_id(*)')
    .eq('active', true);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!rules) return NextResponse.json({ error: 'No rules found' }, { status: 404 });

  for (const rule of rules) {
    let latestReg = '';
    if (rule.region === 'US') {
      latestReg = await fetchLatestUSPrivacyBill();
    } else if (rule.region === 'EU') {
      latestReg = await fetchLatestEULaw();
    } else {
      continue; // skip unsupported region
    }
    const latestHash = getRegulationHash(latestReg);
    if (rule.last_checked_hash === latestHash) {
      // No change
      await supabase.from('auto_update_rules').update({ last_checked_at: new Date().toISOString() }).eq('id', rule.id);
      continue;
    }
    // Generate new policy
    const newText = await generatePolicyText({
      policy_type: rule.policy_type,
      store_type: rule.stores.platform,
      region: rule.region,
      regulation: latestReg,
    });
    // Push to store
    if (rule.stores.platform === 'shopify') {
      await updateShopifyPolicy(rule.stores, rule.page_id, newText);
    } else if (rule.stores.platform === 'woocommerce') {
      await updateWooPolicy(rule.stores, rule.page_id, newText);
    }
    // Update rule in Supabase
    await supabase
      .from('auto_update_rules')
      .update({
        last_checked_at: new Date().toISOString(),
        last_updated_at: new Date().toISOString(),
        last_checked_hash: latestHash,
      })
      .eq('id', rule.id);
  }

  return NextResponse.json({ success: true });
} 