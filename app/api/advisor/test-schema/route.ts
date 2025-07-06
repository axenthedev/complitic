import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const results: any = {
      userId,
      tables: {},
      errors: []
    };

    // Test stores table
    try {
      const { data: storesData, error: storesError } = await supabase
        .from('stores')
        .select('count')
        .limit(1);
      
      if (storesError) {
        results.tables.stores = { exists: false, error: storesError.message };
        results.errors.push(`Stores table error: ${storesError.message}`);
      } else {
        results.tables.stores = { exists: true, count: storesData?.length || 0 };
      }
    } catch (e) {
      results.tables.stores = { exists: false, error: e instanceof Error ? e.message : 'Unknown error' };
      results.errors.push(`Stores table exception: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }

    // Test policies table
    try {
      const { data: policiesData, error: policiesError } = await supabase
        .from('policies')
        .select('count')
        .limit(1);
      
      if (policiesError) {
        results.tables.policies = { exists: false, error: policiesError.message };
        results.errors.push(`Policies table error: ${policiesError.message}`);
      } else {
        results.tables.policies = { exists: true, count: policiesData?.length || 0 };
      }
    } catch (e) {
      results.tables.policies = { exists: false, error: e instanceof Error ? e.message : 'Unknown error' };
      results.errors.push(`Policies table exception: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }

    // Test advisor_chat_history table
    try {
      const { data: chatData, error: chatError } = await supabase
        .from('advisor_chat_history')
        .select('count')
        .limit(1);
      
      if (chatError) {
        results.tables.advisor_chat_history = { exists: false, error: chatError.message };
        results.errors.push(`Chat history table error: ${chatError.message}`);
      } else {
        results.tables.advisor_chat_history = { exists: true, count: chatData?.length || 0 };
      }
    } catch (e) {
      results.tables.advisor_chat_history = { exists: false, error: e instanceof Error ? e.message : 'Unknown error' };
      results.errors.push(`Chat history table exception: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }

    // Check environment variables
    results.env = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
      geminiKey: process.env.GEMINI_API_KEY ? 'Set' : 'Missing'
    };

    return NextResponse.json(results);

  } catch (error) {
    console.error('Unexpected error in test-schema:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 