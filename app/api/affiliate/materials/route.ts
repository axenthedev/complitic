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
    const type = searchParams.get('type');

    let query = supabase
      .from('affiliate_materials')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (type && type !== 'all') {
      query = query.eq('type', type);
    }

    const { data: materials, error } = await query;

    if (error) {
      console.error('Error fetching affiliate materials:', error);
      return NextResponse.json({ error: 'Failed to fetch affiliate materials' }, { status: 500 });
    }

    // Group materials by type
    const groupedMaterials = materials?.reduce((acc, material) => {
      if (!acc[material.type]) {
        acc[material.type] = [];
      }
      acc[material.type].push(material);
      return acc;
    }, {} as Record<string, any[]>) || {};

    return NextResponse.json({
      materials: materials || [],
      grouped: groupedMaterials
    });

  } catch (error) {
    console.error('Affiliate materials API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 