import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

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

    // Get or create affiliate stats for the user
    let { data: stats, error: statsError } = await supabase
      .from('affiliate_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (statsError && statsError.code === 'PGRST116') {
      // No stats found, create default stats
      const { data: newStats, error: createError } = await supabase
        .from('affiliate_stats')
        .insert({
          user_id: userId,
          clicks: 0,
          conversions: 0,
          conversion_rate: 0.0,
          total_earnings: 0.0,
          available_balance: 0.0,
          pending_balance: 0.0
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating affiliate stats:', createError);
        return NextResponse.json({ error: 'Failed to create affiliate stats' }, { status: 500 });
      }
      
      stats = newStats;
    } else if (statsError) {
      console.error('Error fetching affiliate stats:', statsError);
      return NextResponse.json({ error: 'Failed to fetch affiliate stats' }, { status: 500 });
    }

    // Get referral counts
    const { data: referrals, error: referralsError } = await supabase
      .from('referrals')
      .select('status')
      .eq('user_id', userId);

    if (referralsError) {
      console.error('Error fetching referrals:', referralsError);
      return NextResponse.json({ error: 'Failed to fetch referrals' }, { status: 500 });
    }

    // Calculate referral stats
    const totalReferrals = referrals?.length || 0;
    const activeReferrals = referrals?.filter(r => r.status === 'active').length || 0;
    const convertedReferrals = referrals?.filter(r => r.status === 'converted').length || 0;

    // Get recent payouts
    const { data: payouts, error: payoutsError } = await supabase
      .from('payouts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (payoutsError) {
      console.error('Error fetching payouts:', payoutsError);
      return NextResponse.json({ error: 'Failed to fetch payouts' }, { status: 500 });
    }

    // Get performance data for last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const { data: performanceData, error: performanceError } = await supabase
      .from('referral_links')
      .select('clicks, conversions, created_at')
      .eq('user_id', userId)
      .gte('created_at', sixMonthsAgo.toISOString());

    if (performanceError) {
      console.error('Error fetching performance data:', performanceError);
      return NextResponse.json({ error: 'Failed to fetch performance data' }, { status: 500 });
    }

    // Format the response
    const response = {
      stats: {
        ...stats,
        total_referrals: totalReferrals,
        active_referrals: activeReferrals,
        converted_referrals: convertedReferrals,
      },
      recent_payouts: payouts || [],
      performance_overview: performanceData || [],
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Affiliate stats API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 