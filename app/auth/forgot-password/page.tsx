"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
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

        {/* Success Content */}
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <Card className="border border-slate-200 shadow-lg">
              <CardHeader className="space-y-4 text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800">Check your email</CardTitle>
                <CardDescription className="text-slate-600">
                  We've sent password reset instructions to <strong>{email}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Success message */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-green-800">Reset email sent</p>
                      <p className="text-sm text-green-700">
                        Check your inbox and spam folder for password reset instructions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-slate-800">What to do next:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                        1
                      </div>
                      <p className="text-sm text-slate-600">Check your email for reset instructions</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                        2
                      </div>
                      <p className="text-sm text-slate-600">Click the reset link (valid for 1 hour)</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                        3
                      </div>
                      <p className="text-sm text-slate-600">Create a new password and sign in</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
                    asChild
                  >
                    <Link href="/auth/signin">Back to Sign In</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-slate-300 bg-transparent"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try different email
                  </Button>
                </div>

                {/* Help */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-800 mb-2">Didn't receive the email?</h4>
                  <ul className="text-sm text-slate-600 space-y-1 mb-3">
                    <li>• Check your spam or junk folder</li>
                    <li>• Make sure you entered the correct email</li>
                    <li>• The reset link expires in 1 hour</li>
                  </ul>
                  <Link href="#" className="text-sm text-green-600 hover:text-green-500">
                    Contact support →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
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
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-slate-800">Reset your password</CardTitle>
              <CardDescription className="text-slate-600">
                Enter your email address and we'll send you instructions to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`border-slate-300 focus:border-green-500 focus:ring-green-500 ${
                      error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {error && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending instructions..." : "Send reset instructions"}
                </Button>
              </form>

              {/* Info box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-blue-800">How it works</p>
                    <p className="text-sm text-blue-700">
                      We'll send you a secure link to reset your password. The link will expire in 1 hour for security.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <p className="text-sm text-slate-600">
              Remember your password?{" "}
              <Link href="/auth/signin" className="font-medium text-green-600 hover:text-green-500">
                Sign in
              </Link>
            </p>
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-green-600 hover:text-green-500">
                Start your free trial
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
