import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ 
        status: 'error',
        message: 'OPENROUTER_API_KEY not found in environment variables',
        setupInstructions: 'Get a free API key from https://openrouter.ai/ and add it to your .env.local file'
      });
    }

    // Test the API key with a simple request
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://complitic.com',
        'X-Title': 'Complitic AI Generator'
      },
      body: JSON.stringify({
        model: 'deepseek-ai/deepseek-coder-6.7b-instruct',
        messages: [
          {
            role: 'user',
            content: 'Hello, this is a test message.'
          }
        ],
        max_tokens: 50
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ 
        status: 'error',
        message: `API test failed: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      status: 'success',
      message: 'OpenRouter API is working correctly',
      model: data.model,
      usage: data.usage
    });

  } catch (error) {
    console.error('Error in test-ai API:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 