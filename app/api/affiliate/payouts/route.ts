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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('payouts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: payouts, error } = await query
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching payouts:', error);
      return NextResponse.json({ error: 'Failed to fetch payouts' }, { status: 500 });
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('payouts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Calculate summary stats
    const { data: summaryStats } = await supabase
      .from('payouts')
      .select('amount, status')
      .eq('user_id', userId);

    const totalPaid = summaryStats?.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0) || 0;
    const totalPending = summaryStats?.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0) || 0;

    return NextResponse.json({
      payouts: payouts || [],
      summary: {
        total_paid: totalPaid,
        total_pending: totalPending,
        total_payouts: summaryStats?.length || 0
      },
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / limit)
      }
    });

  } catch (error) {
    console.error('Payouts API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 