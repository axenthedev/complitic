"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Sparkles, Copy, Download, RefreshCw, Save, Send, Bot, User, CheckCircle, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface BusinessInfo {
  storeName?: string
  region?: string
  businessType?: string
  platform?: string
  address?: string
  phone?: string
  email?: string
  website?: string
}

// Utility function to convert markdown bold to HTML
const formatMessageContent = (content: string) => {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />')
}

export default function AIGenerator() {
  const { user } = useUser()
  const { toast } = useToast()
  
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [policyType, setPolicyType] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [title, setTitle] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({})
  const [isFirstMessage, setIsFirstMessage] = useState(true)
  const [isRewriting, setIsRewriting] = useState(false)

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `👋 Welcome to the AI Policy Generator! I'm here to help you create professional policies for your business.

I'll need to gather some information about your business to create a tailored policy. Let's start with the basics:

**What's your business/store name?**`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a message.",
        variant: "destructive"
      })
      return
    }

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsGenerating(true)

    try {
      let response: Message

      if (isFirstMessage) {
        // Handle initial conversation flow
        response = await handleConversationFlow(currentInput)
        setIsFirstMessage(false)
      } else if (isRewriting) {
        // Handle policy rewriting
        response = await handlePolicyRewrite(currentInput)
        setIsRewriting(false)
      } else if (!businessInfo.address) {
        // Continue gathering business information
        response = await handleConversationFlow(currentInput)
      } else if (!policyType) {
        // Handle policy type selection
        response = await handleConversationFlow(currentInput)
      } else {
        // Handle regular policy generation
        response = await handlePolicyGeneration(currentInput)
      }

      setMessages(prev => [...prev, response])
      
      if (response.content.includes("**") || response.content.length > 500) {
        setGeneratedContent(response.content)
        // Auto-generate title
        if (!title) {
          setTitle(`${policyType} - ${businessInfo.storeName || 'My Business'} - ${new Date().toLocaleDateString()}`)
        }
      }

    } catch (error) {
      console.error("Generation error:", error)
      
      const errorMessage = error instanceof Error ? error.message : "Failed to generate content. Please try again."
      
      const errorAssistantMessage: Message = {
        role: 'assistant',
        content: `❌ Error: ${errorMessage}`,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorAssistantMessage])
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleConversationFlow = async (userInput: string): Promise<Message> => {
    // Extract business name from user input
    if (!businessInfo.storeName) {
      setBusinessInfo(prev => ({ ...prev, storeName: userInput }))
      return {
        role: 'assistant',
        content: `Great! Your business name is **${userInput}**.

**What type of business do you run?** (e.g., E-commerce store, SaaS platform, Physical retail store, Restaurant, etc.)`,
        timestamp: new Date()
      }
    }

    // Extract business type
    if (!businessInfo.businessType) {
      setBusinessInfo(prev => ({ ...prev, businessType: userInput }))
      return {
        role: 'assistant',
        content: `Perfect! You run a **${userInput}** business.

**What region or country does your business operate in?** (e.g., United States, European Union, United Kingdom, Canada, Australia, or Global)`,
        timestamp: new Date()
      }
    }

    // Extract region
    if (!businessInfo.region) {
      setBusinessInfo(prev => ({ ...prev, region: userInput }))
      return {
        role: 'assistant',
        content: `Got it! You operate in **${userInput}**.

**What platform or technology do you use?** (e.g., Shopify, WooCommerce, Custom website, Mobile app, etc.)`,
        timestamp: new Date()
      }
    }

    // Extract platform
    if (!businessInfo.platform) {
      setBusinessInfo(prev => ({ ...prev, platform: userInput }))
      return {
        role: 'assistant',
        content: `Excellent! You're using **${userInput}**.

**What's your business address?** (This helps with legal compliance)`,
        timestamp: new Date()
      }
    }

    // Extract address
    if (!businessInfo.address) {
      setBusinessInfo(prev => ({ ...prev, address: userInput }))
      return {
        role: 'assistant',
        content: `Perfect! Your business address is **${userInput}**.

**What's your business phone number?** (This will be included in the policy for contact purposes)`,
        timestamp: new Date()
      }
    }

    // Extract phone number
    if (!businessInfo.phone) {
      setBusinessInfo(prev => ({ ...prev, phone: userInput }))
      return {
        role: 'assistant',
        content: `Great! Your phone number is **${userInput}**.

**What's your business email address?** (This will be included in the policy for contact purposes)`,
        timestamp: new Date()
      }
    }

    // Extract email
    if (!businessInfo.email) {
      setBusinessInfo(prev => ({ ...prev, email: userInput }))
      return {
        role: 'assistant',
        content: `Excellent! Your email is **${userInput}**.

**What's your business website URL?** (e.g., https://www.yourstore.com)`,
        timestamp: new Date()
      }
    }

    // Extract website
    if (!businessInfo.website) {
      setBusinessInfo(prev => ({ ...prev, website: userInput }))
      return {
        role: 'assistant',
        content: `Perfect! I have all the information I need about your business:

• **Business Name:** ${businessInfo.storeName}
• **Business Type:** ${businessInfo.businessType}
• **Region:** ${businessInfo.region}
• **Platform:** ${businessInfo.platform}
• **Address:** ${businessInfo.address}
• **Phone:** ${businessInfo.phone}
• **Email:** ${businessInfo.email}
• **Website:** ${userInput}

**What type of policy would you like me to generate?** Choose from:
• Privacy Policy
• Terms of Service
• Refund Policy
• Shipping Policy
• Cookie Policy
• Return Policy
• Acceptable Use Policy
• Data Processing Agreement

Or if you have an existing policy you'd like me to rewrite or improve, just paste it here and I'll help you enhance it!`,
        timestamp: new Date()
      }
    }

    // Handle policy type selection
    const policyTypes = [
      'Privacy Policy', 'Terms of Service', 'Refund Policy', 'Shipping Policy',
      'Cookie Policy', 'Return Policy', 'Acceptable Use Policy', 'Data Processing Agreement'
    ]

    // Check if user input contains a policy type
    const matchedPolicyType = policyTypes.find(type => 
      userInput.toLowerCase().includes(type.toLowerCase())
    )

    if (matchedPolicyType) {
      setPolicyType(matchedPolicyType)
      return {
        role: 'assistant',
        content: `Great choice! I'll generate a **${matchedPolicyType}** for your business.

**Please describe any specific requirements or details you'd like included in your policy.** For example:
• What data do you collect from customers?
• What are your refund/shipping terms?
• Any specific legal requirements you need to address?

Or just say "generate a standard policy" and I'll create a comprehensive one for you!`,
        timestamp: new Date()
      }
    }

    // Check if user is pasting an existing policy to rewrite
    if (userInput.length > 200 && (userInput.toLowerCase().includes('policy') || userInput.toLowerCase().includes('terms') || userInput.toLowerCase().includes('privacy'))) {
      setIsRewriting(true)
      return {
        role: 'assistant',
        content: `I see you've pasted what looks like an existing policy. I'll help you rewrite and improve it!

**What specific improvements would you like me to make?** For example:
• Make it more legally compliant
• Improve clarity and readability
• Add missing sections
• Update for new regulations
• Make it more specific to your business

Or just say "improve this policy" and I'll enhance it comprehensively!`,
        timestamp: new Date()
      }
    }

    // If we have a policy type but user is providing requirements, proceed to generation
    if (policyType && userInput.length > 10) {
      return await handlePolicyGeneration(userInput)
    }

    // Default response for other inputs
    return {
      role: 'assistant',
      content: `I understand you want to include: **${userInput}**

Let me generate a comprehensive policy for your business. This might take a moment...`,
      timestamp: new Date()
    }
  }

  const handlePolicyGeneration = async (userInput: string): Promise<Message> => {
    const enhancedPrompt = buildEnhancedPrompt(userInput, businessInfo, policyType)

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        policyType
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || data.details || "Failed to generate content")
    }

    // Clean the response content - remove any AI wrapper text
    let cleanContent = data.content
    
    // Remove common AI response patterns
    const patternsToRemove = [
      /^Here's your \*\*.*?\*\* for \*\*.*?\*\*:\s*/i,
      /^Here's your .*? policy for .*?:\s*/i,
      /^Generated content:\s*/i,
      /^Your .*? policy:\s*/i,
      /^---\s*$/m,
      /^\*You can copy this content.*$/m,
      /^\*The policy has been enhanced.*$/m
    ]
    
    patternsToRemove.forEach(pattern => {
      cleanContent = cleanContent.replace(pattern, '')
    })
    
    // Trim any extra whitespace
    cleanContent = cleanContent.trim()

    return {
      role: 'assistant',
      content: cleanContent,
      timestamp: new Date()
    }
  }

  const handlePolicyRewrite = async (userInput: string): Promise<Message> => {
    // Find the user's original policy in the conversation
    const originalPolicy = messages.findLast(m => m.role === 'user' && m.content.length > 200)?.content || ""
    
    const rewritePrompt = `I need you to rewrite and improve the following policy. Here are the user's requirements: ${userInput}

Original Policy:
${originalPolicy}

Please provide a completely rewritten, improved version that addresses the user's requirements while maintaining legal compliance and improving clarity. Return ONLY the policy content without any wrapper text.`

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: rewritePrompt,
        policyType: "Policy Rewrite"
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || data.details || "Failed to rewrite policy")
    }

    // Clean the response content - remove any AI wrapper text
    let cleanContent = data.content
    
    // Remove common AI response patterns
    const patternsToRemove = [
      /^Here's your \*\*.*?\*\* for \*\*.*?\*\*:\s*/i,
      /^Here's your .*? policy for .*?:\s*/i,
      /^Generated content:\s*/i,
      /^Your .*? policy:\s*/i,
      /^---\s*$/m,
      /^\*You can copy this content.*$/m,
      /^\*The policy has been enhanced.*$/m
    ]
    
    patternsToRemove.forEach(pattern => {
      cleanContent = cleanContent.replace(pattern, '')
    })
    
    // Trim any extra whitespace
    cleanContent = cleanContent.trim()

    return {
      role: 'assistant',
      content: cleanContent,
      timestamp: new Date()
    }
  }

  const buildEnhancedPrompt = (userInput: string, businessInfo: BusinessInfo, policyType: string) => {
    const { storeName, region, businessType, platform, address, phone, email, website } = businessInfo
    
    let enhancedPrompt = `Generate a comprehensive ${policyType} for the following business:\n\n`
    
    if (storeName) enhancedPrompt += `Business Name: ${storeName}\n`
    if (region) enhancedPrompt += `Region: ${region}\n`
    if (businessType) enhancedPrompt += `Business Type: ${businessType}\n`
    if (platform) enhancedPrompt += `Platform: ${platform}\n`
    if (address) enhancedPrompt += `Address: ${address}\n`
    if (phone) enhancedPrompt += `Phone Number: ${phone}\n`
    if (email) enhancedPrompt += `Email Address: ${email}\n`
    if (website) enhancedPrompt += `Website URL: ${website}\n`
    
    enhancedPrompt += `\nAdditional Requirements: ${userInput}\n\n`
    enhancedPrompt += `Please create a professional, legally-compliant ${policyType} that is specific to this business and includes all necessary sections. Use the actual business information provided above instead of placeholder text like [Address], [Phone Number], etc.`
    
    return enhancedPrompt
  }

  const handleSave = async () => {
    if (!generatedContent || !title) {
      toast({
        title: "Missing Information",
        description: "Please ensure you have generated content and a title.",
        variant: "destructive"
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch("/api/generated-policies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          prompt: buildEnhancedPrompt("", businessInfo, policyType),
          result: generatedContent
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save content")
      }

      toast({
        title: "Saved Successfully",
        description: "Your generated content has been saved to your library.",
      })

    } catch (error) {
      console.error("Save error:", error)
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save content. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    toast({
      title: "Copied",
      description: "Content copied to clipboard!",
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleNewConversation = () => {
    setMessages([])
    setInput("")
    setPolicyType("")
    setGeneratedContent("")
    setTitle("")
    setBusinessInfo({})
    setIsFirstMessage(true)
    setIsRewriting(false)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Policy Maker</h1>
            <p className="text-sm text-gray-600">Generate professional policies tailored to your business</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewConversation}
              className="mr-2"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Chat
            </Button>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-4xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' ? 'bg-blue-600' : 'bg-green-600'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`rounded-lg px-4 py-3 ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border shadow-sm'
                }`}>
                  <div 
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                  />
                  <div className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isGenerating && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-4xl">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border shadow-sm rounded-lg px-4 py-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Generating your policy...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area - Centered when only one message, bottom when more */}
        {messages.length === 1 ? (
          // Centered input area for first message
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
              <div className="bg-white rounded-lg border shadow-lg p-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isFirstMessage ? "Enter your business name..." : "Type your message here..."}
                      className="min-h-[60px] resize-none border-0 focus:ring-2 focus:ring-green-500 focus:ring-offset-0"
                      disabled={isGenerating}
                      autoFocus={messages.length === 1}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isGenerating}
                    className="bg-green-600 hover:bg-green-700 px-4 shadow-sm"
                    size="lg"
                  >
                    {isGenerating ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Press Enter to send, Shift+Enter for new line</span>
                  <span>{input.length} characters</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Bottom input area for ongoing conversation
          <div className="border-t bg-white p-3 shadow-lg">
            <div className="max-w-4xl mx-auto">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isFirstMessage ? "Enter your business name..." : "Type your message here..."}
                    className="min-h-[60px] resize-none border-0 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 shadow-sm"
                    disabled={isGenerating}
                    autoFocus={messages.length === 1}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isGenerating}
                  className="bg-green-600 hover:bg-green-700 px-4 shadow-sm"
                  size="lg"
                >
                  {isGenerating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{input.length} characters</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons - Only show when content is generated */}
        {generatedContent && (
          <div className="border-t bg-white p-4">
            <div className="max-w-4xl mx-auto flex items-center justify-center space-x-4">
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                size="sm"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save to Library
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCopy}
                size="sm"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Content
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
