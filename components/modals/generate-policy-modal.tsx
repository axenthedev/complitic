"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Sparkles, CheckCircle, Loader2, Copy, Download } from "lucide-react"

interface GeneratePolicyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  policyType?: string
}

export function GeneratePolicyModal({ open, onOpenChange, policyType }: GeneratePolicyModalProps) {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    businessDescription: "",
    policyType: policyType || "",
    region: "",
  })

  const [generatedPolicy] = useState(`# Privacy Policy

## 1. Introduction
This Privacy Policy describes how we collect, use, and protect your personal information when you use our services.

## 2. Information We Collect
We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.

## 3. How We Use Your Information
We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.

## 4. Information Sharing
We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.

## 5. Data Security
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## 6. Your Rights
You have certain rights regarding your personal information, including the right to access, correct, or delete your data.

## 7. Contact Us
If you have any questions about this Privacy Policy, please contact us at privacy@yourcompany.com.

This policy was last updated on ${new Date().toLocaleDateString()}.`)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      setStep(2)
    }, 3000)
  }

  const handleClose = () => {
    setStep(1)
    setFormData({ businessDescription: "", policyType: policyType || "", region: "" })
    onOpenChange(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPolicy)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-green-600" />
            <span>AI Policy Generator</span>
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Describe your business to generate a customized policy"}
            {step === 2 && "Your policy has been generated successfully"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="policyType">Policy Type</Label>
              <Select
                value={formData.policyType}
                onValueChange={(value) => setFormData({ ...formData, policyType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select policy type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="privacy">Privacy Policy</SelectItem>
                  <SelectItem value="terms">Terms of Service</SelectItem>
                  <SelectItem value="refund">Refund Policy</SelectItem>
                  <SelectItem value="shipping">Shipping Policy</SelectItem>
                  <SelectItem value="cookie">Cookie Policy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Target Region</Label>
              <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eu">European Union (GDPR)</SelectItem>
                  <SelectItem value="us">United States (CCPA)</SelectItem>
                  <SelectItem value="ca">Canada (PIPEDA)</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessDescription">Business Description</Label>
              <Textarea
                id="businessDescription"
                placeholder="e.g., I sell handmade cosmetics online. I collect email addresses for marketing and use Google Analytics for tracking. I ship to EU and US customers."
                value={formData.businessDescription}
                onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">AI Analysis Preview</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Region: {formData.region || "Not selected"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Type: {formData.policyType || "Not selected"}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={!formData.businessDescription || !formData.policyType || !formData.region || isGenerating}
                className="bg-green-600 hover:bg-green-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Policy
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">Policy Generated Successfully</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 max-h-[400px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-slate-700">{generatedPolicy}</pre>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <FileText className="h-4 w-4 mr-2" />
                Publish Policy
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
