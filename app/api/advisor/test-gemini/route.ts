import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function GET(req: NextRequest) {
  try {
    const results: any = {
      config: {
        hasApiKey: !!OPENROUTER_API_KEY,
        apiKeyLength: OPENROUTER_API_KEY ? OPENROUTER_API_KEY.length : 0,
        apiUrl: OPENROUTER_API_URL,
        apiKeyPrefix: OPENROUTER_API_KEY ? OPENROUTER_API_KEY.substring(0, 10) + '...' : 'Not set'
      },
      test: {}
    };

    if (!OPENROUTER_API_KEY) {
      results.error = 'OPENROUTER_API_KEY is not configured';
      return NextResponse.json(results, { status: 500 });
    }

    // Test a simple request to DeepSeek R1 API
    try {
      const testResponse = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://complitic.com',
          'X-Title': 'Complitic Compliance Advisor',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528-qwen3-8b',
          messages: [
            { role: 'user', content: 'Hello, this is a test message.' }
          ],
          max_tokens: 50,
          temperature: 0.1,
        }),
      });

      results.test.status = testResponse.status;
      results.test.statusText = testResponse.statusText;
      results.test.headers = Object.fromEntries(testResponse.headers.entries());

      if (testResponse.ok) {
        const data = await testResponse.json();
        results.test.success = true;
        results.test.responseKeys = Object.keys(data);
        results.test.hasChoices = !!data.choices;
        results.test.choicesLength = data.choices?.length || 0;
        results.test.hasContent = !!data.choices?.[0]?.message?.content;
        results.test.contentLength = data.choices?.[0]?.message?.content?.length || 0;
      } else {
        const errorText = await testResponse.text();
        results.test.success = false;
        results.test.error = errorText;
      }
    } catch (apiError) {
      results.test.success = false;
      results.test.error = apiError instanceof Error ? apiError.message : 'Unknown error';
      results.test.exception = true;
    }

    return NextResponse.json(results);

  } catch (error) {
    console.error('Unexpected error in test-deepseek:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 