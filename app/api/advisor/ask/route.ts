import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

function buildPrompt({ question, context, history, ragDocs }: { question: string; context: any; history: any[]; ragDocs: any[] }) {
  let prompt = `You are an AI legal compliance assistant for e-commerce. Answer in plain English, referencing the user's store type (${context?.storeType || 'Unknown'}), region (${context?.region || 'Unknown'}), and the following policy documents if relevant. If you use a policy doc, cite it as a numbered [source].\n\n`;
  if (ragDocs && ragDocs.length > 0) {
    prompt += 'Policy Documents:\n';
    ragDocs.forEach((doc: any, i: number) => {
      prompt += `[${i + 1}] ${doc.type} (last updated ${doc.last_updated_at}):\n${doc.content}\n`;
    });
    prompt += '\n';
  }
  prompt += `User question: ${question}\n`;
  if (history && history.length > 0) {
    prompt += '\nChat history:\n';
    history.forEach((msg: any) => {
      prompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}\n`;
    });
  }
  prompt += '\nIf you use a policy doc, cite it as [source] and list sources at the end.';
  return prompt;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, context, history } = body;
    
    // Validate required fields
    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required and must be a string' }, { status: 400 });
    }
    
    if (!context) {
      return NextResponse.json({ error: 'Context is required' }, { status: 400 });
    }
    
    if (!OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not configured');
      return NextResponse.json({ 
        text: 'AI service is not configured. Please contact support.' 
      }, { status: 500 });
    }
    
    console.log('Processing question:', { 
      questionLength: question.length, 
      hasContext: !!context, 
      historyLength: history?.length || 0,
      hasOpenRouterKey: !!OPENROUTER_API_KEY
    });
    
    // RAG: find relevant policy docs
    let ragDocs: any[] = context?.policies || [];
    
    // Build prompt
    const prompt = buildPrompt({ question, context, history: history || [], ragDocs });
    
    console.log('Built prompt, length:', prompt.length);
    
    // Call DeepSeek R1 via OpenRouter
    const requestBody = {
      model: 'deepseek/deepseek-r1-0528-qwen3-8b',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 1024,
      temperature: 0.2,
    };
    
    console.log('Making request to DeepSeek R1 API:', {
      url: OPENROUTER_API_URL,
      model: requestBody.model,
      promptLength: prompt.length,
      maxTokens: requestBody.max_tokens
    });
    
    const res = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://complitic.com', // required for OpenRouter free tier
        'X-Title': 'Complitic Compliance Advisor',
      },
      body: JSON.stringify(requestBody),
    });
    
    console.log('DeepSeek R1 API response status:', res.status, res.statusText);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('AI API error details:', { 
        status: res.status, 
        statusText: res.statusText, 
        error: errorText,
        headers: Object.fromEntries(res.headers.entries())
      });
      
      // Provide more specific error messages based on status code
      if (res.status === 401) {
        return NextResponse.json({ 
          text: 'AI service authentication failed. Please check API key configuration.' 
        }, { status: 500 });
      } else if (res.status === 429) {
        return NextResponse.json({ 
          text: 'AI service rate limit exceeded. Please try again in a moment.' 
        }, { status: 500 });
      } else if (res.status === 503) {
        return NextResponse.json({ 
          text: 'AI service is temporarily unavailable. Please try again later.' 
        }, { status: 500 });
      } else {
        return NextResponse.json({ 
          text: `AI service error (${res.status}): ${res.statusText}. Please try again later.` 
        }, { status: 500 });
      }
    }
    
    const data: any = await res.json();
    console.log('AI API response received, data keys:', Object.keys(data));
    
    // OpenRouter returns answer in data.choices[0].message.content
    const text: string = data.choices?.[0]?.message?.content || '';
    
    if (!text) {
      console.error('No text in AI response:', data);
      return NextResponse.json({ 
        text: 'Sorry, I received an empty response from the AI service. Please try again.' 
      }, { status: 500 });
    }
    
    console.log('AI response text length:', text.length);
    
    // Extract sources (simple regex for [1], [2], ...)
    const sources: any[] = [];
    if (ragDocs && text) {
      const matches: string[] | null = text.match(/\[(\d+)\]/g);
      if (matches) {
        const unique = Array.from(new Set(matches.map((m: string) => m.replace(/\D/g, ''))));
        unique.forEach((idx: string) => {
          const doc = ragDocs[parseInt(idx, 10) - 1];
          if (doc) sources.push({ title: doc.type, url: undefined });
        });
      }
    }
    
    return NextResponse.json({ text, sources });
  } catch (error) {
    console.error('Unexpected error in ask API:', error);
    return NextResponse.json({ 
      text: 'Sorry, an unexpected error occurred while processing your request. Please try again.' 
    }, { status: 500 });
  }
} 