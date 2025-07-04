"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const defaultTrafficData = [
  { day: "Mon", visitors: 1200, pageViews: 2400 },
  { day: "Tue", visitors: 1900, pageViews: 3200 },
  { day: "Wed", visitors: 1600, pageViews: 2800 },
  { day: "Thu", visitors: 2200, pageViews: 3800 },
  { day: "Fri", visitors: 2800, pageViews: 4200 },
  { day: "Sat", visitors: 2100, pageViews: 3600 },
  { day: "Sun", visitors: 1800, pageViews: 3000 },
]

export function TrafficChart({ data }: { data?: any[] }) {
  const trafficData = data && data.length > 0 ? data : defaultTrafficData;
  return (
    <ChartContainer
      config={{
        visitors: {
          label: "Unique Visitors",
          color: "hsl(var(--chart-1))",
        },
        pageViews: {
          label: "Page Views",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trafficData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
          <XAxis dataKey="day" className="text-xs text-slate-600" axisLine={false} tickLine={false} />
          <YAxis className="text-xs text-slate-600" axisLine={false} tickLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="var(--color-visitors)"
            strokeWidth={3}
            dot={{ fill: "var(--color-visitors)", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "var(--color-visitors)", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="pageViews"
            stroke="var(--color-pageViews)"
            strokeWidth={3}
            dot={{ fill: "var(--color-pageViews)", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "var(--color-pageViews)", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
