"use client"

import { useEffect } from "react"
import { useUser, useAuth } from "@clerk/nextjs"
import supabase from "@/lib/supabase/browser"

export const SyncUser = () => {
  const { user } = useUser()
  const { getToken } = useAuth()

  useEffect(() => {
    const sync = async () => {
      if (!user?.id || !user.emailAddresses?.[0]?.emailAddress) return

      // Get Clerk session token for Supabase
      const token = await getToken({ template: "supabase" })
      if (token) {
        await supabase.auth.setSession({ access_token: token, refresh_token: "" })
      }

      const { error } = await supabase
        .from("users")
        .upsert({
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          full_name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          first_name: user.firstName ?? "",
          last_name: user.lastName ?? "",
        })

      if (error) {
        console.error("Failed to sync user:", error.message)
      }
    }

    sync()
  }, [user, getToken])

  return null
}
