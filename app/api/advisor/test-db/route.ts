import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from('advisor_chat_history')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('Database connection test failed:', testError);
      return NextResponse.json({ 
        error: 'Database connection failed', 
        details: testError.message,
        code: testError.code 
      }, { status: 500 });
    }

    // Test inserting a test record
    const { data: insertData, error: insertError } = await supabase
      .from('advisor_chat_history')
      .insert({ 
        user_id: userId, 
        role: 'assistant', 
        message: 'Test message' 
      })
      .select();

    if (insertError) {
      console.error('Insert test failed:', insertError);
      return NextResponse.json({ 
        error: 'Insert test failed', 
        details: insertError.message,
        code: insertError.code 
      }, { status: 500 });
    }

    // Clean up test record
    if (insertData && insertData[0]) {
      await supabase
        .from('advisor_chat_history')
        .delete()
        .eq('id', insertData[0].id);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database connection and operations working correctly',
      userId,
      env: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasGeminiKey: !!process.env.GEMINI_API_KEY
      }
    });

  } catch (error) {
    console.error('Unexpected error in test-db:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 