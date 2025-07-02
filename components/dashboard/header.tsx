"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, User, Settings, LogOut, PointerIcon as SidebarTrigger } from "lucide-react"

const pageNames: { [key: string]: string } = {
  "/dashboard": "Overview",
  "/dashboard/policy-generator": "AI Policy Generator",
  "/dashboard/cookie-manager": "Cookie Manager",
  "/dashboard/compliance-scanner": "Compliance Scanner",
  "/dashboard/auto-update": "Auto-Update Rules",
  "/dashboard/alerts": "Alerts & Notifications",
  "/dashboard/stores": "Store Connections",
  "/dashboard/settings": "Account Settings",
  "/dashboard/billing": "Billing & Plan",
}

export function DashboardHeader() {
  const pathname = usePathname()
  const currentPageName = pageNames[pathname] || "Dashboard"

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-2xl font-bold text-slate-800">{currentPageName}</h1>
        </div>

        <div className="flex items-center space-x-4">
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
              <DropdownMenuLabel>Legal Alerts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="font-medium">GDPR Update Required</div>
                <div className="text-sm text-slate-600">Your privacy policy needs updates for new EU regulations</div>
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

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-slate-600">john@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
