"use client"

import { Card, CardContent } from "@/components/ui/card"
import { UserProfile } from "@clerk/nextjs"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Account Settings</h1>
        <p className="text-slate-600">
          Manage your profile, security settings, and account preferences.
        </p>
      </div>

      {/* Clerk UserProfile with Security */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <UserProfile 
            routing="hash"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 p-0",
                pageScrollBox: "p-6",
                navbar: "hidden",
                pageHeader: "hidden",
                formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white",
                formButtonSecondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",
                formFieldInput: "border-slate-300 focus:border-green-500 focus:ring-green-500",
                formFieldLabel: "text-slate-700 font-medium",
                dividerLine: "bg-slate-200",
                dividerText: "text-slate-500",
                headerTitle: "text-slate-800",
                headerSubtitle: "text-slate-600",
                profileSectionTitle: "text-slate-800 font-semibold text-lg",
                profileSectionSubtitle: "text-slate-600",
                badge: "bg-green-100 text-green-800 border-green-200",
                dangerZone: "border-red-200 bg-red-50",
                dangerZoneButton: "bg-red-600 hover:bg-red-700 text-white",
                formSectionTitle: "text-slate-800 font-semibold text-base",
                formSectionSubtitle: "text-slate-600 text-sm"
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
