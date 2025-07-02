"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const complianceData = [
  { name: "GDPR Complete", value: 100, color: "#10B981" },
  { name: "CCPA In Progress", value: 75, color: "#F59E0B" },
  { name: "Cookie Consent Active", value: 100, color: "#8B5CF6" },
  { name: "Remaining", value: 25, color: "#E5E7EB" },
]

export function ComplianceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={complianceData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={2} dataKey="value">
          {complianceData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value}%`, name]}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => <span className="text-sm text-slate-600">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
