import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch Shopify stores
    const { data: shopifyStores, error: shopifyError } = await supabase
      .from('shopify_stores')
      .select('id, store_url, connected_at')
      .eq('user_id', userId);

    if (shopifyError) {
      console.error('Error fetching Shopify stores:', shopifyError);
    }

    // Fetch WooCommerce stores
    const { data: woocommerceStores, error: wooError } = await supabase
      .from('woocommerce_stores')
      .select('id, store_url, connected_at')
      .eq('user_id', userId);

    if (wooError) {
      console.error('Error fetching WooCommerce stores:', wooError);
    }

    // Combine and format stores
    const stores = [
      ...(shopifyStores || []).map(store => ({
        ...store,
        store_type: 'shopify' as const,
      })),
      ...(woocommerceStores || []).map(store => ({
        ...store,
        store_type: 'woocommerce' as const,
      })),
    ];

    return NextResponse.json({
      stores,
      total: stores.length,
    });

  } catch (error) {
    console.error('Error fetching connected stores:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 