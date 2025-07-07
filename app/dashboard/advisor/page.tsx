"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageCircle, User, Image as ImageIcon, Link as LinkIcon, Trash2, Mic, MicOff, Square } from "lucide-react";

// TypeScript declarations for Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

function parseMessage(text: string) {
  // Parse markdown links and images
  const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  const imgRegex = /!\[([^\]]*)\]\(([^\)]+)\)/g;
  let parts: (string | { type: 'img', alt: string, src: string } | { type: 'link', text: string, href: string })[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  // Images first
  while ((match = imgRegex.exec(text))) {
    if (match.index > lastIdx) parts.push(text.slice(lastIdx, match.index));
    parts.push({ type: 'img', alt: match[1], src: match[2] });
    lastIdx = match.index + match[0].length;
  }
  text = text.slice(lastIdx);
  lastIdx = 0;
  // Links
  while ((match = linkRegex.exec(text))) {
    if (match.index > lastIdx) parts.push(text.slice(lastIdx, match.index));
    parts.push({ type: 'link', text: match[1], href: match[2] });
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts;
}

function stripMarkdownBold(text: string) {
  // Convert **text** to <strong>text</strong> for bold formatting
  // Remove single * for italics since we don't want italics
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*/g, '').trim();
}

function MessageBubble({ role, text, sources }: { role: string; text: string; sources?: any[] }) {
  // Only strip for assistant replies
  const displayText = role === 'assistant' ? stripMarkdownBold(text || "") : (text || "");
  const parts = parseMessage(displayText);
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${role === "user" ? "bg-green-100" : "bg-white border shadow-sm"}`}>
        <div className="whitespace-pre-line leading-relaxed">
          {parts.map((part, i) => {
            if (typeof part === 'string') {
              // Check if the string contains HTML tags
              if (part.includes('<strong>')) {
                return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
              }
              return <span key={i}>{part}</span>;
            }
            if (part.type === 'img') return <img key={i} src={part.src} alt={part.alt} className="inline-block max-w-xs max-h-40 rounded border my-2" />;
            if (part.type === 'link') return <a key={i} href={part.href} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">{part.text}</a>;
            return null;
          })}
        </div>
        {sources && sources.length > 0 && (
          <div className="mt-3 pt-3 border-t text-xs text-slate-500">
            <div className="font-medium mb-1">Sources:</div>
            <ul className="list-disc ml-4 space-y-1">
              {sources.map((src, i) => (
                <li key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">{src.title || src.url}</a></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdvisorPage() {
  const { getToken, isLoaded } = useAuth();
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  
  const [messages, setMessages] = useState<any[]>([{
    role: "assistant",
    text: "Hi! I'm your AI Compliance Assistant. Ask me any legal or compliance question about your store, privacy, cookies, or regulations. You can also attach images or links for context.",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    async function fetchContextAndHistory() {
      try {
        // Get Clerk session token for API calls
        const token = await getToken({ template: "supabase" });
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Fetch context
        const res = await fetch("/api/advisor/context", { headers });
        if (!res.ok) {
          const errorText = await res.text();
          console.error('Failed to fetch context:', res.status, res.statusText, errorText);
          setContext({ storeType: 'Unknown', region: 'Unknown', policies: [], hasStores: false, hasPolicies: false });
        } else {
          const data = await res.json();
          console.log('Context loaded successfully:', data);
          setContext(data);
        }

        // Fetch chat history
        const chatRes = await fetch("/api/advisor/chat", { headers });
        if (!chatRes.ok) {
          const errorText = await chatRes.text();
          console.error('Failed to fetch chat history:', chatRes.status, chatRes.statusText, errorText);
          // Set default welcome message if chat history fails
          setMessages([{
            role: "assistant",
            text: "Hi! I'm your AI Compliance Assistant. Ask me any legal or compliance question about your store, privacy, cookies, or regulations. You can also attach images or links for context.",
          }]);
        } else {
          const chatData = await chatRes.json();
          if (chatData.messages && chatData.messages.length > 0) {
            setMessages(chatData.messages.map((m: any) => ({ role: m.role, text: m.message, image_url: m.image_url })));
          } else {
            // Set default welcome message if no chat history
            setMessages([{
              role: "assistant",
              text: "Hi! I'm your AI Compliance Assistant. Ask me any legal or compliance question about your store, privacy, cookies, or regulations. You can also attach images or links for context.",
            }]);
          }
        }
      } catch (error) {
        console.error('Error fetching context and history:', error);
        // Set fallback context and welcome message
        setContext({ storeType: 'Unknown', region: 'Unknown', policies: [], hasStores: false, hasPolicies: false });
        setMessages([{
          role: "assistant",
          text: "Hi! I'm your AI Compliance Assistant. Ask me any legal or compliance question about your store, privacy, cookies, or regulations. You can also attach images or links for context.",
        }]);
      }
    }
    
    if (isLoaded && isClerkLoaded && clerkUser?.id) {
      fetchContextAndHistory();
    }
  }, [getToken, isLoaded, isClerkLoaded, clerkUser?.id]);

  // Cleanup recording timer on unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  async function sendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!input.trim() && !image) return;
    
    let msgText = input;
    if (image) {
      msgText += `\n![attached image](${image})`;
    }
    
    const userMsg = { role: "user", text: msgText };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setImage(null);
    setLoading(true);
    
    try {
      // Get Clerk session token for API calls
      const token = await getToken({ template: "supabase" });
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Save user message (optional - continue even if it fails)
      try {
        const saveUserRes = await fetch("/api/advisor/chat", {
          method: "POST",
          headers,
          body: JSON.stringify({ role: "user", message: msgText, image_url: image }),
        });
        
        if (!saveUserRes.ok) {
          const errorText = await saveUserRes.text();
          console.error('Failed to save user message:', saveUserRes.status, errorText);
        }
      } catch (saveError) {
        console.error('Error saving user message:', saveError);
        // Continue with AI request even if save fails
      }
      
      // Call backend API for Gemini answer
      const res = await fetch("/api/advisor/ask", {
        method: "POST",
        headers,
        body: JSON.stringify({
          question: msgText,
          history: messages,
          context,
        }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Ask API error:', res.status, res.statusText, errorText);
        throw new Error(`Failed to get response: ${res.status} ${res.statusText} - ${errorText}`);
      }
      
      const data = await res.json();
      
      if (!data.text) {
        throw new Error('No response text received from AI');
      }
      
      setMessages((msgs) => [...msgs, { role: "assistant", text: data.text, sources: data.sources }]);
      
      // Save assistant message (optional - continue even if it fails)
      try {
        const saveAssistantRes = await fetch("/api/advisor/chat", {
          method: "POST",
          headers,
          body: JSON.stringify({ role: "assistant", message: data.text }),
        });
        
        if (!saveAssistantRes.ok) {
          const errorText = await saveAssistantRes.text();
          console.error('Failed to save assistant message:', saveAssistantRes.status, errorText);
        }
      } catch (saveError) {
        console.error('Error saving assistant message:', saveError);
        // Continue even if save fails
      }
      
    } catch (error) {
      console.error('Error in sendMessage:', error);
      setMessages((msgs) => [...msgs, { 
        role: "assistant", 
        text: "Sorry, I encountered an error while processing your request. Please try again in a moment." 
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleAddLink() {
    const url = prompt("Enter a URL to add:");
    if (url && url.startsWith("http")) {
      setInput((prev) => prev + ` [link](${url})`);
      inputRef.current?.focus();
    }
  }

  async function clearChat() {
    if (confirm("Are you sure you want to clear the chat history?")) {
      try {
        // Get Clerk session token for API calls
        const token = await getToken({ template: "supabase" });
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch("/api/advisor/chat", { 
          method: "DELETE",
          headers
        });
        if (!res.ok) {
          throw new Error(`Failed to clear chat: ${res.status}`);
        }
        setMessages([{
          role: "assistant",
          text: "Hi! I'm your AI Compliance Assistant. Ask me any legal or compliance question about your store, privacy, cookies, or regulations. You can also attach images or links for context.",
        }]);
      } catch (error) {
        console.error("Failed to clear chat:", error);
        alert("Failed to clear chat history. Please try again.");
      }
    }
  }

  async function startRecording() {
    try {
      // Check if Web Speech API is available
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
        return;
      }

      // Create speech recognition instance
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      speechRecognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      let finalTranscript = '';

      recognition.onstart = () => {
        setIsRecording(true);
        setRecordingTime(0);
        setTranscription('');
        
        // Start recording timer
        recordingIntervalRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        const fullTranscript = finalTranscript + interimTranscript;
        setTranscription(fullTranscript.trim());
        setInput(fullTranscript.trim());
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          alert('No speech detected. Please try speaking again.');
        } else {
          alert(`Speech recognition error: ${event.error}`);
        }
        stopRecording();
      };

      recognition.onend = () => {
        stopRecording();
      };

      recognition.start();
      
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Failed to start recording. Please check microphone permissions.');
    }
  }

  function stopRecording() {
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      setIsRecording(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold">AI Compliance Assistant</h1>
          </div>
          <button
            type="button"
            onClick={clearChat}
            className="h-10 w-10 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Clear chat history"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Area - Uses main scroll */}
      <div className="flex-1 px-6 py-8">
        <div className="space-y-6">
          {messages.map((msg, i) => (
            <MessageBubble key={i} role={msg.role} text={msg.text} sources={msg.sources} />
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-3 text-sm bg-white border flex items-center gap-2 shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t">
        <div className="max-w-4xl mx-auto p-6">
          <form onSubmit={sendMessage} className="flex gap-3 items-end">
            <div className="flex flex-col flex-1 gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isRecording ? "Listening..." : "Ask a compliance question..."}
                className="flex-1 min-h-[44px]"
                autoFocus
                disabled={loading}
              />
              {isRecording && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Listening... Speak now</span>
                </div>
              )}
              {transcription && !isRecording && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <span>✓ Transcribed: "{transcription}"</span>
                </div>
              )}
              {image && (
                <div className="flex items-center gap-2 mt-1">
                  <img src={image} alt="preview" className="max-h-20 rounded border" />
                  <Button type="button" size="sm" variant="outline" onClick={() => setImage(null)}>
                    Remove
                  </Button>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="advisor-image-upload"
              className="hidden"
              onChange={handleImageChange}
              disabled={loading}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => document.getElementById('advisor-image-upload')?.click()}
              disabled={loading}
              aria-label="Attach image"
              className="h-11 w-11"
            >
              <ImageIcon className="w-5 h-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleAddLink}
              disabled={loading}
              aria-label="Add link"
              className="h-11 w-11"
            >
              <LinkIcon className="w-5 h-5" />
            </Button>
            <Button
              type="button"
              variant={isRecording ? "destructive" : "outline"}
              size="icon"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={loading}
              aria-label={isRecording ? "Stop recording" : "Start voice recording"}
              className={`h-11 w-11 ${isRecording ? 'animate-pulse' : ''}`}
            >
              {isRecording ? (
                <Square className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </Button>
            {isRecording && (
              <div className="flex items-center text-sm text-red-600 font-mono">
                {formatTime(recordingTime)}
              </div>
            )}
            <Button 
              type="submit" 
              disabled={loading || (!input.trim() && !image)}
              className="h-11 px-6"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
} 