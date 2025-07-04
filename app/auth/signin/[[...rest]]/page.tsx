"use client"

import { SignIn } from "@clerk/nextjs"
import { Shield } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-1">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">Complitic</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <SignIn
            path="/auth/signin"
            routing="path"
            signUpUrl="/auth/signup"
            appearance={{
              variables: {
                colorPrimary: "#16a34a", // Tailwind green-600
              },
            }}
          />
        </div>
      </main>
    </div>
  )
}
