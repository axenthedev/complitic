import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { referralEmail, subscriptionAmount = 60.0 } = body;

    if (!referralEmail) {
      return NextResponse.json({ error: 'Referral email is required' }, { status: 400 });
    }

    // Calculate commission (30% of subscription amount)
    const commissionRate = 30.0;
    const commissionAmount = (subscriptionAmount * commissionRate) / 100;

    // Create or update referral
    const { data: existingReferral } = await supabase
      .from('referrals')
      .select('*')
      .eq('user_id', userId)
      .eq('referred_email', referralEmail)
      .single();

    if (existingReferral) {
      // Update existing referral to converted status
      const { data: updatedReferral, error: updateError } = await supabase
        .from('referrals')
        .update({
          status: 'converted',
          commission_earned: commissionAmount,
          subscription_amount: subscriptionAmount
        })
        .eq('id', existingReferral.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating referral:', updateError);
        return NextResponse.json({ error: 'Failed to update referral' }, { status: 500 });
      }

      // Create commission event
      const { error: eventError } = await supabase
        .from('commission_events')
        .insert({
          user_id: userId,
          referral_id: updatedReferral.id,
          event_type: 'conversion',
          amount: subscriptionAmount,
          commission_rate: commissionRate,
          commission_amount: commissionAmount,
          metadata: {
            subscription_amount: subscriptionAmount,
            commission_rate: commissionRate
          }
        });

      if (eventError) {
        console.error('Error creating commission event:', eventError);
      }

      return NextResponse.json({
        success: true,
        referral: updatedReferral,
        commission_earned: commissionAmount
      });

    } else {
      // Create new referral with converted status
      const { data: newReferral, error: createError } = await supabase
        .from('referrals')
        .insert({
          user_id: userId,
          referred_email: referralEmail,
          status: 'converted',
          commission_earned: commissionAmount,
          subscription_amount: subscriptionAmount
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating referral:', createError);
        return NextResponse.json({ error: 'Failed to create referral' }, { status: 500 });
      }

      // Create commission event
      const { error: eventError } = await supabase
        .from('commission_events')
        .insert({
          user_id: userId,
          referral_id: newReferral.id,
          event_type: 'conversion',
          amount: subscriptionAmount,
          commission_rate: commissionRate,
          commission_amount: commissionAmount,
          metadata: {
            subscription_amount: subscriptionAmount,
            commission_rate: commissionRate
          }
        });

      if (eventError) {
        console.error('Error creating commission event:', eventError);
      }

      return NextResponse.json({
        success: true,
        referral: newReferral,
        commission_earned: commissionAmount
      });
    }

  } catch (error) {
    console.error('Commission API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get commission events for the user
    const { data: events, error } = await supabase
      .from('commission_events')
      .select(`
        *,
        referrals (
          referred_email,
          status,
          created_at
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching commission events:', error);
      return NextResponse.json({ error: 'Failed to fetch commission events' }, { status: 500 });
    }

    // Calculate summary
    const totalCommissions = events?.reduce((sum, event) => sum + (event.commission_amount || 0), 0) || 0;
    const totalConversions = events?.filter(event => event.event_type === 'conversion').length || 0;

    return NextResponse.json({
      events: events || [],
      summary: {
        total_commissions: totalCommissions,
        total_conversions: totalConversions,
        commission_rate: 30.0
      }
    });

  } catch (error) {
    console.error('Commission events API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 