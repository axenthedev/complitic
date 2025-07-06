import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const { data, error } = await supabase
      .from('advisor_chat_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error fetching chat history:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ messages: data || [] });
  } catch (error) {
    console.error('Unexpected error in GET chat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const body = await req.json();
    const { role, message, image_url } = body;
    
    if (!role || !message) {
      return NextResponse.json({ error: 'Missing role or message' }, { status: 400 });
    }
    
    if (!['user', 'assistant'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role. Must be "user" or "assistant"' }, { status: 400 });
    }
    
    console.log('Inserting chat message:', { userId, role, message: message.substring(0, 100) + '...', image_url });
    
    const { data, error } = await supabase
      .from('advisor_chat_history')
      .insert({ 
        user_id: userId, 
        role, 
        message: message.substring(0, 10000), // Limit message length
        image_url: image_url || null 
      })
      .select();
      
    if (error) {
      console.error('Error inserting chat message:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    console.log('Successfully inserted chat message:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error in POST chat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const { error } = await supabase
      .from('advisor_chat_history')
      .delete()
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error deleting chat history:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error in DELETE chat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 