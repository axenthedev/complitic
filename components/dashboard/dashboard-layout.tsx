"use client"

import type { ReactNode } from "react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardTopbar } from "./dashboard-topbar"

interface DashboardLayoutProps {
  children: ReactNode
  pageTitle?: string
}

export function DashboardLayout({ children, pageTitle = "Dashboard" }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        {/* Top Navigation Bar */}
        <DashboardTopbar pageTitle={pageTitle} />

        {/* Page Content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
