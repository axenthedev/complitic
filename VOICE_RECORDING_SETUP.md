# Voice Recording Setup for AI Compliance Advisor

## Overview
The AI Compliance Advisor now supports voice recording functionality, allowing users to record their questions and have them automatically transcribed to text.

## Current Implementation
- **Frontend**: Voice recording button with visual indicators
- **Backend**: Mock transcription API (ready for real STT service integration)
- **Features**: Recording timer, visual feedback, automatic transcription

## Speech-to-Text Service Options

### 1. OpenAI Whisper (Recommended)
```bash
# Add to your .env file
OPENAI_API_KEY=your_openai_api_key_here
```

**Pros**: High accuracy, supports multiple languages, easy integration
**Cons**: Requires API key, usage costs

### 2. Google Speech-to-Text
```bash
# Add to your .env file
GOOGLE_CLOUD_CREDENTIALS=path_to_service_account_key.json
```

**Pros**: High accuracy, real-time streaming, multiple language support
**Cons**: Requires Google Cloud account, setup complexity

### 3. Azure Speech Services
```bash
# Add to your .env file
AZURE_SPEECH_KEY=your_azure_speech_key
AZURE_SPEECH_REGION=your_azure_region
```

**Pros**: Good accuracy, Microsoft ecosystem integration
**Cons**: Requires Azure account, usage costs

### 4. AWS Transcribe
```bash
# Add to your .env file
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
```

**Pros**: Scalable, good for enterprise
**Cons**: Requires AWS account, setup complexity

## Setup Instructions

### 1. Choose a Speech-to-Text Service
Select one of the services above based on your needs and budget.

### 2. Get API Credentials
Follow the service provider's documentation to obtain API keys or credentials.

### 3. Update Environment Variables
Add the required environment variables to your `.env.local` file.

### 4. Update the Transcription API
Edit `app/api/advisor/transcribe/route.ts` and uncomment the appropriate service implementation.

### 5. Test the Feature
1. Navigate to the Advisor page
2. Click the microphone button to start recording
3. Speak your question
4. Click the stop button to end recording
5. Wait for transcription to complete
6. Review and send the transcribed text

## Browser Compatibility
- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support

## Security Considerations
- Microphone access requires user permission
- Audio is processed locally before sending to transcription service
- No audio files are stored permanently
- Transcription results are only used for the current session

## Troubleshooting

### Microphone Permission Denied
- Check browser settings for microphone permissions
- Ensure the site is served over HTTPS (required for microphone access)
- Try refreshing the page and granting permission again

### Transcription Fails
- Check API key configuration
- Verify network connectivity
- Check browser console for error messages
- Ensure audio file format is supported

### Recording Quality Issues
- Use a quiet environment
- Speak clearly and at normal volume
- Ensure microphone is working properly
- Check browser microphone settings

## Future Enhancements
- Real-time transcription preview
- Multiple language support
- Voice command shortcuts
- Audio playback of AI responses
- Noise reduction and audio enhancement 