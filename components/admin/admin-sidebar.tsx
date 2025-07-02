"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  Users,
  UserX,
  TrendingUp,
  Trophy,
  CreditCard,
  FileText,
  Activity,
  Zap,
  Settings,
  Cog,
  ShoppingCart,
  Shield,
  DollarSign,
  X,
} from "lucide-react"

const navigation = [
  {
    name: "Platform Overview",
    items: [{ name: "Dashboard", href: "/admin", icon: BarChart3 }],
  },
  {
    name: "Users",
    items: [
      { name: "All Users", href: "/admin/users", icon: Users },
      { name: "Banned / Flagged Users", href: "/admin/users/flagged", icon: UserX },
    ],
  },
  {
    name: "Affiliates",
    items: [
      { name: "Affiliate Overview", href: "/admin/affiliates", icon: TrendingUp },
      { name: "Top Performers", href: "/admin/affiliates/top-performers", icon: Trophy },
      { name: "Pending Payouts", href: "/admin/affiliates/payouts", icon: CreditCard },
    ],
  },
  {
    name: "Usage",
    items: [
      { name: "Policy Generation Logs", href: "/admin/usage/policy-logs", icon: FileText },
      { name: "API Usage", href: "/admin/usage/api", icon: Activity },
      { name: "Auto-Update Activity", href: "/admin/usage/auto-update", icon: Zap },
    ],
  },
  {
    name: "Management",
    items: [
      { name: "Plans & Pricing", href: "/admin/management/plans", icon: DollarSign },
      { name: "Compliance Rule Engine", href: "/admin/management/rules", icon: Shield },
      { name: "Store Integrations", href: "/admin/management/integrations", icon: ShoppingCart },
    ],
  },
  {
    name: "Settings",
    items: [
      { name: "Admin Settings", href: "/admin/settings", icon: Settings },
      { name: "App Configuration", href: "/admin/settings/config", icon: Cog },
    ],
  },
]

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-slate-800 text-white flex-col">
        <SidebarContent pathname={pathname} />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 text-white flex-col transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div>
            <h1 className="text-lg font-bold">Complitic Admin</h1>
            <p className="text-slate-400 text-xs mt-1">Platform Management</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-slate-700">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <SidebarContent pathname={pathname} onItemClick={onClose} />
      </div>
    </>
  )
}

function SidebarContent({ pathname, onItemClick }: { pathname: string; onItemClick?: () => void }) {
  return (
    <>
      <div className="hidden lg:block p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">Complitic Admin</h1>
        <p className="text-slate-400 text-sm mt-1">Platform Management</p>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav>
          {navigation.map((section) => (
            <div key={section.name} className="mb-6">
              <h3 className="px-4 lg:px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                {section.name}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onItemClick}
                      className={cn(
                        "flex items-center px-4 lg:px-6 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-slate-700 text-white border-r-2 border-blue-500"
                          : "text-slate-300 hover:bg-slate-700 hover:text-white",
                      )}
                    >
                      <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Admin Profile Section */}
      <div className="p-4 lg:p-6 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-white">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-slate-400 truncate">admin@complitic.com</p>
          </div>
        </div>
      </div>
    </>
  )
}
