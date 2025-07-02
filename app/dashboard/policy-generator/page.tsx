"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GeneratePolicyModal } from "@/components/modals/generate-policy-modal"
import { FileText, Sparkles, Copy, Download, RefreshCw, Upload, Globe, Scale, Palette, CheckCircle } from "lucide-react"

export default function PolicyGenerator() {
  const [prompt, setPrompt] = useState("")
  const [policyType, setPolicyType] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPolicy, setGeneratedPolicy] = useState("")
  const [generateModalOpen, setGenerateModalOpen] = useState(false)
  const [aiInsights, setAiInsights] = useState({
    region: "EU & US",
    laws: ["GDPR", "CCPA"],
    tone: "Professional",
    wordCount: 2847,
  })

  const handleGenerate = async () => {
    if (!prompt || !policyType) return

    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedPolicy(`# ${policyType}

## 1. Introduction

This ${policyType.toLowerCase()} governs your use of our website and services. By accessing our website, you accept this policy in full.

## 2. Information We Collect

We collect information you provide directly to us, such as when you:
- Create an account
- Make a purchase
- Subscribe to our newsletter
- Contact us for support

### Personal Information
- Name and contact information
- Payment and billing information
- Communication preferences
- Purchase history and preferences

### Automatically Collected Information
- Device and browser information
- IP address and location data
- Website usage and interaction data
- Cookies and similar technologies

## 3. How We Use Your Information

We use the information we collect to:
- Process and fulfill your orders
- Provide customer support
- Send you important updates about your account
- Improve our products and services
- Comply with legal obligations

## 4. Information Sharing

We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.

### Service Providers
We may share your information with trusted third-party service providers who assist us in:
- Payment processing
- Order fulfillment
- Email marketing
- Analytics and reporting

## 5. Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## 6. Your Rights

Depending on your location, you may have certain rights regarding your personal information:
- Right to access your data
- Right to correct inaccurate data
- Right to delete your data
- Right to data portability
- Right to object to processing

## 7. Contact Information

If you have any questions about this policy, please contact us at:
- Email: privacy@yourstore.com
- Address: [Your Business Address]

This policy was last updated on ${new Date().toLocaleDateString()}.`)
      setIsGenerating(false)
    }, 3000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPolicy)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">AI Policy Generator</h1>
        <p className="text-slate-600">
          Use AI to generate GDPR, CCPA, and other compliance policies tailored to your store.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-green-600" />
                <span>Describe Your Business</span>
              </CardTitle>
              <CardDescription>Tell our AI about your business, products, and compliance needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="e.g. I sell handmade cosmetics in the EU and US. I need a privacy and refund policy for WooCommerce. I collect email addresses for marketing and use Google Analytics for tracking."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Document Type</label>
                <Select value={policyType} onValueChange={setPolicyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Privacy Policy">Privacy Policy</SelectItem>
                    <SelectItem value="Terms of Service">Terms of Service</SelectItem>
                    <SelectItem value="Refund Policy">Refund Policy</SelectItem>
                    <SelectItem value="Shipping Policy">Shipping Policy</SelectItem>
                    <SelectItem value="Cookie Policy">Cookie Policy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => setGenerateModalOpen(true)}
                disabled={!prompt || !policyType}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Policy
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          {(generatedPolicy || isGenerating) && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-slate-600" />
                    <span>Generated {policyType}</span>
                  </CardTitle>
                  {generatedPolicy && (
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Upload className="h-4 w-4 mr-2" />
                        Publish
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>AI is analyzing your business requirements...</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono">{generatedPolicy}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Understanding</CardTitle>
              <CardDescription>What our AI detected from your prompt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Region Detected</span>
                </div>
                <Badge variant="secondary">{aiInsights.region}</Badge>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Scale className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Laws Applied</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {aiInsights.laws.map((law) => (
                    <Badge key={law} variant="outline" className="text-xs">
                      {law}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Tone</span>
                </div>
                <Badge variant="secondary">{aiInsights.tone}</Badge>
              </div>

              {generatedPolicy && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Word Count</span>
                    </div>
                    <Badge variant="secondary">{aiInsights.wordCount} words</Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <p className="text-sm text-slate-600">Be specific about your products and services</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <p className="text-sm text-slate-600">Mention your target markets and regions</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <p className="text-sm text-slate-600">Include data collection practices</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <p className="text-sm text-slate-600">Specify your e-commerce platform</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <GeneratePolicyModal
        open={generateModalOpen}
        onOpenChange={setGenerateModalOpen}
        policyType={policyType.toLowerCase()}
      />
    </div>
  )
}
