"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, HelpCircle, Store, CheckCircle } from "lucide-react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"

interface DashboardTopbarProps {
  // pageTitle prop removed
}

interface StoreConnection {
  id: string
  store_name: string
  store_url: string
  store_type: string
  status: string
}

export function DashboardTopbar({}: DashboardTopbarProps) {
  const [storeConnections, setStoreConnections] = useState<StoreConnection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStoreConnections()
  }, [])

  const fetchStoreConnections = async () => {
    try {
      const response = await fetch('/api/store-connections')
      if (response.ok) {
        const data = await response.json()
        setStoreConnections(data.connections || [])
      }
    } catch (error) {
      console.error('Error fetching store connections:', error)
    } finally {
      setLoading(false)
    }
  }

  const hasConnectedStores = storeConnections.length > 0 && storeConnections.some(conn => conn.status === 'connected')

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Empty */}
        <div className="flex items-center space-x-4">
          <div className="ml-12 md:ml-0">
            {/* Page title removed */}
          </div>
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center space-x-3">
          {/* Connect Store Button */}
          <Button
            variant={hasConnectedStores ? "outline" : "default"}
            size="sm"
            disabled={hasConnectedStores || loading}
            asChild={!hasConnectedStores}
            className={hasConnectedStores 
              ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-50" 
              : "bg-green-600 hover:bg-green-700 text-white"
            }
          >
            {hasConnectedStores ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Store Connected
              </div>
            ) : (
              <Link href="/dashboard/stores" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                Connect Store
              </Link>
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="font-medium">GDPR Update Required</div>
                <div className="text-sm text-slate-600">Your privacy policy needs updates</div>
                <div className="text-xs text-slate-400">2 hours ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="font-medium">Cookie Banner Inactive</div>
                <div className="text-sm text-slate-600">Enable cookie consent for EU visitors</div>
                <div className="text-xs text-slate-400">1 day ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="font-medium">Compliance Scan Complete</div>
                <div className="text-sm text-slate-600">Found 2 issues that need attention</div>
                <div className="text-xs text-slate-400">3 days ago</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Help */}
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* User Profile - Clerk UserButton */}
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
                userButtonPopoverCard: "shadow-lg border border-slate-200",
                userButtonPopoverActionButton: "hover:bg-slate-50",
                userButtonPopoverActionButtonText: "text-slate-700",
                userButtonPopoverFooter: "border-t border-slate-200"
              }
            }}
          />
        </div>
      </div>
    </header>
  )
}
