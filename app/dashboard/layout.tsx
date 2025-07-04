import type React from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { SyncUser } from "../../components/SyncUser"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SyncUser />
      <DashboardLayout>{children}</DashboardLayout>
    </>
  )
}
