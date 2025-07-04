"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Shield,
  BarChart3,
  FileText,
  Cookie,
  Search,
  Zap,
  Bell,
  Store,
  Settings,
  CreditCard,
  Menu,
  X,
  Home,
  Users,
  Calendar,
  Mail,
} from "lucide-react"

const navigationGroups = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: Home },
      { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Compliance Tools",
    items: [
      { title: "Policy Generator", href: "/dashboard/policy-generator", icon: FileText },
      { title: "Cookie Manager", href: "/dashboard/cookie-manager", icon: Cookie },
      { title: "Compliance Scanner", href: "/dashboard/compliance-scanner", icon: Search },
    ],
  },
  {
    title: "Automation",
    items: [
      { title: "Auto-Update Rules", href: "/dashboard/auto-update", icon: Zap },
      { title: "Alerts & Notifications", href: "/dashboard/alerts", icon: Bell },
    ],
  },
  {
    title: "Management",
    items: [
      { title: "Store Connections", href: "/dashboard/stores", icon: Store },
      { title: "Team Members", href: "/dashboard/team", icon: Users },
      { title: "Calendar", href: "/dashboard/calendar", icon: Calendar },
      { title: "Messages", href: "/dashboard/messages", icon: Mail },
    ],
  },
  {
    title: "Affiliate",
    items: [{ title: "Affiliate Dashboard", href: "/dashboard/affiliate", icon: Users }],
  },
  {
    title: "Settings",
    items: [
      { title: "Account Settings", href: "/dashboard/settings", icon: Settings },
      { title: "Billing & Plan", href: "/dashboard/billing", icon: CreditCard },
      { title: "API / Tracking Script", href: "/dashboard/api", icon: FileText },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo/Brand */}
      <div className="flex items-center space-x-3 p-6 border-b border-slate-700">
        <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold text-white">Complitic</span>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-6">
          {navigationGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2">{group.title}</div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700 transition-colors",
                          isActive && "bg-slate-700 text-white border-r-2 border-green-500",
                        )}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.title}
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Section */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-slate-400 truncate">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-[#1E293B] text-white flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50 bg-[#1E293B] text-white hover:bg-slate-700"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileOpen(false)} />
          <div className="relative w-64 bg-[#1E293B] text-white flex-col">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  )
}
