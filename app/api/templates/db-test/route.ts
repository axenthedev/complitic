import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({
        error: 'Missing NEXT_PUBLIC_SUPABASE_URL',
        success: false
      });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({
        error: 'Missing SUPABASE_SERVICE_ROLE_KEY',
        success: false
      });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Test database connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from('policy_documents')
      .select('count')
      .limit(1);

    if (connectionError) {
      return NextResponse.json({
        error: `Database connection failed: ${connectionError.message}`,
        success: false,
        details: connectionError
      });
    }

    // Test table structure
    const { data: tableInfo, error: tableError } = await supabase
      .rpc('get_table_info', { table_name: 'policy_documents' })
      .single();

    if (tableError) {
      // If RPC doesn't exist, try a simple query
      const { data: simpleTest, error: simpleError } = await supabase
        .from('policy_documents')
        .select('*')
        .limit(1);

      if (simpleError) {
        return NextResponse.json({
          error: `Table access failed: ${simpleError.message}`,
          success: false,
          details: simpleError
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Database connection successful',
        tableExists: true,
        canQuery: true,
        sampleData: simpleTest
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      tableInfo: tableInfo
    });

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      error: `Database test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      success: false
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({
        error: 'Authentication required',
        success: false
      });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({
        error: 'Missing environment variables',
        success: false
      });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Test insert operation
    const testData = {
      user_id: userId,
      template_slug: 'test-template',
      template_name: 'Test Template',
      content: 'Test content for database verification',
      form_data: { test: true },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('policy_documents')
      .insert([testData])
      .select()
      .single();

    if (error) {
      return NextResponse.json({
        error: `Insert test failed: ${error.message}`,
        success: false,
        details: error
      });
    }

    // Clean up test data
    await supabase
      .from('policy_documents')
      .delete()
      .eq('id', data.id);

    return NextResponse.json({
      success: true,
      message: 'Database insert/delete test successful',
      testId: data.id
    });

  } catch (error) {
    console.error('Database POST test error:', error);
    return NextResponse.json({
      error: `Database POST test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      success: false
    });
  }
} 