import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await req.json();
    const { prompt, policyType } = body;

    if (!prompt || !policyType) {
      return NextResponse.json({ error: 'Missing prompt or policy type' }, { status: 400 });
    }

    // Use OpenRouter API with a more reliable model
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

    if (!OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY not found in environment variables');
      return NextResponse.json({ 
        error: 'AI service not configured. Please add OPENROUTER_API_KEY to your environment variables.',
        setupInstructions: 'Get a free API key from https://openrouter.ai/ and add it to your .env.local file'
      }, { status: 500 });
    }

    const systemPrompt = `You are a legal compliance expert specializing in creating comprehensive business policies and legal documents. 
    
Your task is to generate a detailed, professional ${policyType} based on the user's business description. 

IMPORTANT FORMATTING REQUIREMENTS:
- Use **bold text** for section headers instead of markdown headers (##)
- Use **bold text** for important terms, definitions, and key points
- Use bullet points (•) for lists and sub-sections
- Use proper paragraph breaks for readability
- Do NOT use markdown headers like ## or ###
- Do NOT include any AI response wrapper text like "Here's your policy" or "Generated content"
- Start directly with the policy title and content
- Do NOT use asterisks (*) for formatting - use proper bold formatting
- Use the ACTUAL business information provided (name, address, phone, email, website) instead of placeholder text like [Address], [Phone Number], [Email], etc.

CONTENT REQUIREMENTS:
- Generate a comprehensive, detailed policy (minimum 1500-2000 words)
- Include all necessary legal sections and subsections
- Make it specific to the user's business type and region
- Ensure compliance with relevant regulations (GDPR, CCPA, etc.)
- Include detailed explanations for each section
- Add comprehensive data collection, usage, sharing, security, and user rights sections
- Include specific examples and scenarios relevant to the business
- Add detailed contact information and procedures using the actual business details provided
- Include dispute resolution procedures
- Add comprehensive liability and indemnification clauses
- Include detailed terms for data retention and deletion
- Add specific provisions for the business platform/technology mentioned

STRUCTURE:
- Start with a clear title in bold
- Include an effective date
- Add a comprehensive table of contents (if applicable)
- Use bold section headers throughout
- Include detailed subsections with bullet points
- End with contact information and signature sections using actual business details

Make the policy legally sound, comprehensive, and immediately usable for the business. Return ONLY the policy content without any AI response wrapper. Use the actual business information provided instead of placeholder text.`;

    const requestBody = {
      model: 'anthropic/claude-3-haiku', // More reliable model
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `Please generate a comprehensive, detailed ${policyType} for the following business. Make it at least 1500-2000 words with proper bold formatting for headers and key terms. Replace ALL placeholders like [Address], [Phone Number], [Email Address], [URL] with the actual business information provided. Return ONLY the policy content without any wrapper text: ${prompt}`
        }
      ],
      max_tokens: 4000,
      temperature: 0.7
    };

    console.log('Making request to OpenRouter with model:', requestBody.model);
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://complitic.com',
        'X-Title': 'Complitic AI Generator'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('OpenRouter response status:', response.status);
    console.log('OpenRouter response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      
      // Provide more specific error messages
      if (response.status === 401) {
        return NextResponse.json({ 
          error: 'Invalid API key. Please check your OPENROUTER_API_KEY configuration.',
          details: 'Authentication failed with OpenRouter API'
        }, { status: 500 });
      } else if (response.status === 429) {
        return NextResponse.json({ 
          error: 'Rate limit exceeded. Please try again in a few minutes.',
          details: 'Too many requests to OpenRouter API'
        }, { status: 500 });
      } else if (response.status === 400) {
        return NextResponse.json({ 
          error: 'Invalid request to AI service. Please check your input.',
          details: errorText
        }, { status: 500 });
      } else {
        return NextResponse.json({ 
          error: 'Failed to generate content from AI service',
          details: errorText,
          status: response.status
        }, { status: 500 });
      }
    }

    const data = await response.json();
    console.log('OpenRouter response data:', JSON.stringify(data, null, 2));

    const generatedContent = data.choices?.[0]?.message?.content;

    if (!generatedContent) {
      console.error('No content in response:', data);
      return NextResponse.json({ error: 'No content generated from AI service' }, { status: 500 });
    }

    return NextResponse.json({ 
      content: generatedContent,
      model: data.model,
      usage: data.usage
    });

  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json({ 
      error: 'Internal server error while generating content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 