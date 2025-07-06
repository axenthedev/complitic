import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';
import { publishToShopify } from '@/lib/publishToShopify';
import { publishToWooCommerce } from '@/lib/publishToWoo';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      store_id,
      store_type,
      page_destination,
      custom_url,
      policy_title,
      policy_content,
    } = body;

    // Validate required fields
    if (!store_id || !store_type || !page_destination || !policy_title || !policy_content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch store credentials based on type
    let storeCredentials: any;
    let storeUrl: string;

    if (store_type === 'shopify') {
      const { data: shopifyStore, error: shopifyError } = await supabase
        .from('shopify_stores')
        .select('store_url, access_token')
        .eq('id', store_id)
        .eq('user_id', userId)
        .single();

      if (shopifyError || !shopifyStore) {
        return NextResponse.json(
          { error: 'Shopify store not found or access denied' },
          { status: 404 }
        );
      }

      storeCredentials = shopifyStore;
      storeUrl = shopifyStore.store_url;
    } else if (store_type === 'woocommerce') {
      const { data: wooStore, error: wooError } = await supabase
        .from('woocommerce_stores')
        .select('store_url, consumer_key, consumer_secret')
        .eq('id', store_id)
        .eq('user_id', userId)
        .single();

      if (wooError || !wooStore) {
        return NextResponse.json(
          { error: 'WooCommerce store not found or access denied' },
          { status: 404 }
        );
      }

      storeCredentials = wooStore;
      storeUrl = wooStore.store_url;
    } else {
      return NextResponse.json(
        { error: 'Unsupported store type' },
        { status: 400 }
      );
    }

    // Publish to the appropriate platform
    let publishResult;

    if (store_type === 'shopify') {
      publishResult = await publishToShopify(
        storeUrl,
        storeCredentials.access_token,
        policy_title,
        policy_content,
        page_destination,
        custom_url
      );
    } else if (store_type === 'woocommerce') {
      publishResult = await publishToWooCommerce(
        storeUrl,
        storeCredentials.consumer_key,
        storeCredentials.consumer_secret,
        policy_title,
        policy_content,
        page_destination,
        custom_url
      );
    }

    if (!publishResult || !publishResult.success) {
      return NextResponse.json(
        { error: publishResult?.error || 'Failed to publish policy' },
        { status: 500 }
      );
    }

    // Save the published policy to our database
    const { error: saveError } = await supabase
      .from('generated_policies')
      .insert([
        {
          user_id: userId,
          title: policy_title,
          slug: policy_title.toLowerCase().replace(/\s+/g, '-'),
          content: policy_content,
          store_id,
          store_type,
          page_destination,
          custom_url,
          published_url: publishResult.url,
          published_at: new Date().toISOString(),
        }
      ]);

    if (saveError) {
      console.error('Error saving published policy:', saveError);
      // Don't fail the request if saving to our DB fails
    }

    return NextResponse.json({
      success: true,
      message: 'Policy published successfully',
      data: {
        pageId: publishResult.pageId,
        url: publishResult.url,
        storeUrl,
        storeType: store_type,
      }
    });

  } catch (error) {
    console.error('Error publishing policy:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 