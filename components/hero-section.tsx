"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, Globe, Zap, Play, Send } from "lucide-react"

const headlines = [
  "Stay Legally Compliant. Automatically.",
  "AI-Powered Policies for Your Store.",
  "Compliance That Updates Itself.",
]

const promptSteps = [
  {
    id: 1,
    prompt: "I sell handmade jewelry to customers in EU and US. Need GDPR compliance.",
    delay: 1000,
  },
  {
    id: 2,
    status: "AI analyzing your business requirements...",
    delay: 2500,
  },
  {
    id: 3,
    followUp: "Do you collect email addresses for marketing purposes?",
    delay: 4000,
  },
  {
    id: 4,
    prompt: "Yes, for newsletters and order updates.",
    delay: 5500,
  },
  {
    id: 5,
    status: "Generating GDPR and CCPA compliant policies...",
    delay: 7000,
  },
]

export function HeroSection() {
  const [currentHeadline, setCurrentHeadline] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [showPolicyCount, setShowPolicyCount] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState("")

  useEffect(() => {
    const headline = headlines[currentHeadline]
    let currentIndex = 0

    if (isTyping) {
      const typingInterval = setInterval(() => {
        if (currentIndex <= headline.length) {
          setDisplayText(headline.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsTyping(false)
          setTimeout(() => {
            setIsTyping(true)
            setCurrentHeadline((prev) => (prev + 1) % headlines.length)
          }, 2000)
          clearInterval(typingInterval)
        }
      }, 100)

      return () => clearInterval(typingInterval)
    }
  }, [currentHeadline, isTyping])

  // Animate prompt steps
  useEffect(() => {
    promptSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index + 1)
        if (step.prompt) {
          setCurrentPrompt(step.prompt)
        }
      }, step.delay)
    })

    // Show policy count after all steps
    setTimeout(() => {
      setShowPolicyCount(true)
    }, 8500)

    // Reset animation every 20 seconds
    const resetInterval = setInterval(() => {
      setCurrentStep(0)
      setCurrentPrompt("")
      setShowPolicyCount(false)

      // Restart the animation
      setTimeout(() => {
        promptSteps.forEach((step, index) => {
          setTimeout(() => {
            setCurrentStep(index + 1)
            if (step.prompt) {
              setCurrentPrompt(step.prompt)
            }
          }, step.delay)
        })

        setTimeout(() => {
          setShowPolicyCount(true)
        }, 8500)
      }, 1000)
    }, 20000)

    return () => clearInterval(resetInterval)
  }, [])

  const getCurrentStep = () => {
    return promptSteps[currentStep - 1]
  }

  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Centered Hero Content */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
              <span className="block h-16 sm:h-20">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Complitic uses AI to generate and automatically update GDPR, CCPA, Return, and Cookie policies tailored to
              your store's region, products, and business type.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Generate Free Policy
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-lg bg-transparent"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Setup in 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Used by 1,200+ stores</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Compliance Dashboard</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Live</span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <Shield className="h-8 w-8 text-green-600 mb-2" />
                  <div className="text-sm font-medium text-green-800">GDPR Compliant</div>
                  <div className="text-xs text-green-600">Auto-updated 2h ago</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <Globe className="h-8 w-8 text-blue-600 mb-2" />
                  <div className="text-sm font-medium text-blue-800">CCPA Ready</div>
                  <div className="text-xs text-blue-600">Monitoring changes</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <Zap className="h-8 w-8 text-purple-600 mb-2" />
                  <div className="text-sm font-medium text-purple-800">Cookie Banner</div>
                  <div className="text-xs text-purple-600">Active & compliant</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <CheckCircle className="h-8 w-8 text-orange-600 mb-2" />
                  <div className="text-sm font-medium text-orange-800">Return Policy</div>
                  <div className="text-xs text-orange-600">Region-specific</div>
                </div>
              </div>

              {/* AI Prompt Interface */}
              <div className="pt-4 border-t border-slate-100">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    AI Policy Generator
                  </div>

                  {/* Prompt Input Box */}
                  <div className="relative">
                    <div className="bg-white border-2 border-slate-200 rounded-lg p-4 min-h-[60px] flex items-center">
                      <div className="flex-1">
                        {currentPrompt ? (
                          <div className="text-sm text-slate-700 animate-fade-in">{currentPrompt}</div>
                        ) : (
                          <div className="text-sm text-slate-400">Describe your business and compliance needs...</div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="ml-3 bg-green-600 hover:bg-green-700 text-white p-2"
                        disabled={!currentPrompt}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* AI Response/Status Area */}
                  {currentStep > 0 && (
                    <div
                      className={`bg-slate-50 rounded-lg p-4 transform transition-all duration-500 ease-out ${
                        currentStep > 1 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                    >
                      {getCurrentStep()?.status && (
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span>{getCurrentStep()?.status}</span>
                        </div>
                      )}

                      {getCurrentStep()?.followUp && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-sm text-blue-800 font-medium">AI Follow-up Question:</div>
                          <div className="text-sm text-blue-700 mt-1">{getCurrentStep()?.followUp}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Status Bar */}
                  <div
                    className={`flex items-center justify-between pt-2 border-t border-slate-200 transform transition-all duration-500 ease-out ${
                      showPolicyCount ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <span className="text-xs text-slate-500">Analysis complete</span>
                    <div className="text-xs text-green-600 font-medium">✓ 3 policies generated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
