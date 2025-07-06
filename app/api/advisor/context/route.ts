import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    console.log('Fetching context for user:', userId);

    // Get user's stores
    let stores = [];
    let storeType = 'Unknown';
    let region = 'Unknown';
    
    try {
      const { data: storesData, error: storesError } = await supabase
        .from('stores')
        .select('*')
        .eq('user_id', userId)
        .limit(1);

      if (storesError) {
        console.error('Error fetching stores:', storesError);
        // Continue with default values instead of failing
      } else {
        stores = storesData || [];
        if (stores.length > 0) {
          storeType = stores[0].platform || 'Unknown';
          region = stores[0].region || 'Unknown';
        }
      }
    } catch (storesException) {
      console.error('Exception fetching stores:', storesException);
      // Continue with default values
    }

    // Get user's policies
    let policies = [];
    
    try {
      const { data: policiesData, error: policiesError } = await supabase
        .from('policies')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (policiesError) {
        console.error('Error fetching policies:', policiesError);
        // Continue with empty policies instead of failing
      } else {
        policies = policiesData || [];
      }
    } catch (policiesException) {
      console.error('Exception fetching policies:', policiesException);
      // Continue with empty policies
    }

    // Build context object
    const context = {
      storeType,
      region,
      policies,
      hasStores: stores.length > 0,
      hasPolicies: policies.length > 0
    };

    console.log('Context built successfully:', {
      storeType,
      region,
      policiesCount: policies.length,
      hasStores: stores.length > 0,
      hasPolicies: policies.length > 0
    });

    return NextResponse.json(context);
  } catch (error) {
    console.error('Unexpected error in advisor context:', error);
    // Return a fallback context instead of failing completely
    return NextResponse.json({
      storeType: 'Unknown',
      region: 'Unknown',
      policies: [],
      hasStores: false,
      hasPolicies: false,
      error: 'Some data could not be loaded'
    });
  }
} 