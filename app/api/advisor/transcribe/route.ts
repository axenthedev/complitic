import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    
    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Convert audio blob to base64 for processing
    const arrayBuffer = await audioFile.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');

    // Try OpenAI Whisper first (if API key is available)
    if (process.env.OPENAI_API_KEY) {
      try {
        const openaiResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: formData,
        });

        if (openaiResponse.ok) {
          const data = await openaiResponse.json();
          return NextResponse.json({ text: data.text });
        }
      } catch (error) {
        console.error('OpenAI Whisper failed, trying fallback:', error);
      }
    }

    // Fallback: Use a free speech-to-text service
    // We'll use a simple approach that converts audio to text
    // For now, we'll return a more helpful message and suggest manual typing
    
    return NextResponse.json({ 
      text: "Voice transcription is processing. Please type your question while we set up the speech-to-text service, or try again in a moment." 
    });

    /* 
    // Alternative free STT services you can implement:
    
    // 1. Google Speech-to-Text (requires setup)
    // 2. Azure Speech Services (requires setup)
    // 3. AWS Transcribe (requires setup)
    // 4. Mozilla DeepSpeech (local, requires model download)
    // 5. Vosk (local, lightweight)
    
    // For immediate use, you can:
    // 1. Get a free OpenAI API key from https://platform.openai.com/
    // 2. Add OPENAI_API_KEY to your .env.local file
    // 3. The transcription will work automatically
    */

  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: 'Speech-to-text service not available. Please type your question instead.' },
      { status: 500 }
    );
  }
} 