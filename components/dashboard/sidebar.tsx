"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
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
  ChevronDown,
  User,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navigationGroups = [
  {
    title: "Compliance Tools",
    items: [
      { title: "Overview", href: "/dashboard", icon: BarChart3 },
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
    title: "Store & Settings",
    items: [
      { title: "Store Connections", href: "/dashboard/stores", icon: Store },
      { title: "Account Settings", href: "/dashboard/settings", icon: Settings },
      { title: "Billing & Plan", href: "/dashboard/billing", icon: CreditCard },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<string[]>(["Compliance Tools", "Automation", "Store & Settings"])

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupTitle) ? prev.filter((title) => title !== groupTitle) : [...prev, groupTitle],
    )
  }

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800">Complitic</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {navigationGroups.map((group) => (
          <Collapsible
            key={group.title}
            open={openGroups.includes(group.title)}
            onOpenChange={() => toggleGroup(group.title)}
          >
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between hover:bg-slate-100 rounded-md px-2 py-1 cursor-pointer">
                  <span className="text-slate-600 font-medium text-sm">{group.title}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      openGroups.includes(group.title) ? "rotate-180" : ""
                    }`}
                  />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={pathname === item.href} className="w-full justify-start">
                          <Link href={item.href} className="flex items-center space-x-3 px-3 py-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200">
        <div className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-600">
          <User className="h-4 w-4" />
          <span>john@example.com</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
