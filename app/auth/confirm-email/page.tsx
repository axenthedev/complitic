"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Mail, CheckCircle, ArrowLeft, RefreshCw } from "lucide-react"

export default function ConfirmEmailPage() {
  const [isResending, setIsResending] = useState(false)
  const [resendCount, setResendCount] = useState(0)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResendEmail = async () => {
    setIsResending(true)
    setResendCount(resendCount + 1)
    setCountdown(60) // 60 second cooldown

    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Complitic</span>
            </Link>
            <Link href="/" className="flex items-center text-slate-600 hover:text-slate-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Card className="border border-slate-200 shadow-lg">
            <CardHeader className="space-y-4 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800">Check your email</CardTitle>
              <CardDescription className="text-slate-600">
                We've sent a verification link to your email address. Click the link to activate your account and start
                for free.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email sent confirmation */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-green-800">Verification email sent</p>
                    <p className="text-sm text-green-700">
                      Check your inbox and spam folder for an email from Complitic.
                    </p>
                  </div>
                </div>
              </div>

              

              {/* Resend email */}
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-3">Didn't receive the email?</p>
                  <Button
                    variant="outline"
                    onClick={handleResendEmail}
                    disabled={isResending || countdown > 0}
                    className="border-slate-300"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : countdown > 0 ? (
                      `Resend in ${countdown}s`
                    ) : (
                      "Resend verification email"
                    )}
                  </Button>
                  {resendCount > 0 && (
                    <p className="text-xs text-green-600 mt-2">
                      ✓ Verification email sent {resendCount > 1 ? `(${resendCount} times)` : ""}
                    </p>
                  )}
                </div>
              </div>

              
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-slate-600">
              Want to use a different email?{" "}
              <Link href="/auth/signup" className="font-medium text-green-600 hover:text-green-500">
                Sign up again
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
