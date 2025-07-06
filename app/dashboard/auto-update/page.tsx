"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Clock, Settings, CheckCircle, RefreshCw, ChevronDown, ChevronUp, Eye } from "lucide-react"

export default function AutoUpdatePage() {
  const [updateRules, setUpdateRules] = useState<any[]>([])
  const [recentUpdates, setRecentUpdates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [forceLoading, setForceLoading] = useState(false)
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true)
  const [autoUpdateLoading, setAutoUpdateLoading] = useState(false)
  const [expandedRule, setExpandedRule] = useState<string | null>(null)
  const [policyPreview, setPolicyPreview] = useState<{ current: string; preview: string } | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      // Fetch auto_update_rules
      const rulesRes = await fetch("/api/auto-update/rules")
      const rulesData = await rulesRes.json()
      setUpdateRules(rulesData.rules || [])
      // Fetch recent updates
      const updatesRes = await fetch("/api/auto-update/recent")
      const updatesData = await updatesRes.json()
      setRecentUpdates(updatesData.updates || [])
      // Fetch global auto-update setting
      const globalRes = await fetch("/api/auto-update/global")
      const globalData = await globalRes.json()
      setAutoUpdateEnabled(globalData.enabled ?? true)
      setLoading(false)
    }
    fetchData()
  }, [])

  async function handleForceUpdate() {
    setForceLoading(true)
    await fetch("/api/auto-update/check", { method: "POST" })
    setForceLoading(false)
  }

  async function handleRuleToggle(ruleId: string, checked: boolean) {
    setLoading(true)
    await fetch('/api/auto-update/rules', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: ruleId, active: checked }),
    });
    setUpdateRules((prev) => prev.map((r) => (r.id === ruleId ? { ...r, active: checked } : r)))
    setLoading(false)
  }

  async function handleGlobalToggle(checked: boolean) {
    setAutoUpdateLoading(true)
    setAutoUpdateEnabled(checked)
    await fetch('/api/auto-update/global', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: checked }),
    })
    setAutoUpdateLoading(false)
  }

  async function handlePreview(ruleId: string) {
    setPreviewLoading(true)
    setExpandedRule(ruleId)
    setPolicyPreview(null)
    const res = await fetch('/api/auto-update/policy-preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: ruleId }),
    })
    const data = await res.json()
    setPolicyPreview(data)
    setPreviewLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Auto-Update Rules</h1>
        <p className="text-slate-600">
          Configure automatic policy updates when regulations change to stay compliant effortlessly.
        </p>
      </div>

      {/* Global Auto-Update Toggle */}
      <Card className="animate-fadein shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Enable Auto-Update</span>
            <Switch
              checked={autoUpdateEnabled}
              disabled={autoUpdateLoading}
              onCheckedChange={handleGlobalToggle}
            />
          </CardTitle>
          <CardDescription>
            When enabled, your policies will be automatically updated when regulations change.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Update Rules */}
      <Card className="animate-fadein shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-slate-600" />
            <span>Update Rules</span>
          </CardTitle>
          <CardDescription>Configure specific rules for different types of policy updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            updateRules.map((rule, idx) => (
              <div
                key={rule.id}
                className="flex flex-col gap-2 p-4 border border-slate-200 rounded-lg bg-white/80 shadow-sm transition-all duration-500 ease-out opacity-0 translate-y-4 animate-fadein"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{rule.policy_type} Policy</h4>
                  <Badge variant="outline" className="text-xs">
                    {rule.region}
                  </Badge>
                  <Badge
                        className={rule.active ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"}
                  >
                        {rule.active ? "active" : "inactive"}
                  </Badge>
                </div>
                    <p className="text-sm text-slate-600">Auto-update for {rule.policy_type} policy in {rule.region}</p>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                      <span>Last triggered: {rule.last_checked_at ? new Date(rule.last_checked_at).toLocaleString() : "Never"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rule.active}
                      disabled={loading}
                      onCheckedChange={(checked) => handleRuleToggle(rule.id, checked)}
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => expandedRule === rule.id ? setExpandedRule(null) : handlePreview(rule.id)}
                      disabled={previewLoading && expandedRule === rule.id}
                      aria-label="Preview policy"
                    >
                      {expandedRule === rule.id ? <ChevronUp className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                {expandedRule === rule.id && (
                  <div className="mt-2 border-t pt-3">
                    {previewLoading ? (
                      <div>Loading preview...</div>
                    ) : policyPreview ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="font-semibold mb-1">Current Policy</div>
                          <div className="p-2 bg-slate-50 rounded text-xs whitespace-pre-line max-h-64 overflow-auto border">
                            {policyPreview.current || <span className="text-slate-400">No policy found.</span>}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Preview (New Policy)</div>
                          <div className="p-2 bg-slate-50 rounded text-xs whitespace-pre-line max-h-64 overflow-auto border">
                            {policyPreview.preview || <span className="text-slate-400">No preview available.</span>}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Recent Updates */}
      <Card className="animate-fadein shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-blue-600" />
              <span>Recent Updates</span>
            </CardTitle>
            <CardDescription>Latest automatic policy updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            recentUpdates.map((update, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 bg-white/80 shadow-sm transition-all duration-500 ease-out opacity-0 translate-y-4 animate-fadein"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium">{update.policy_type} Policy</p>
                  <p className="text-xs text-slate-600">{update.change}</p>
                  <p className="text-xs text-slate-400">{update.timestamp ? new Date(update.timestamp).toLocaleString() : ""}</p>
                </div>
              </div>
            ))
          )}
          </CardContent>
        </Card>

      {/* Force Update Button */}
      <div className="flex justify-end">
            <Button
          className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-lg animate-fadein"
          onClick={handleForceUpdate}
          disabled={forceLoading}
        >
          <RefreshCw className="h-6 w-6" />
          <span className="text-sm">{forceLoading ? "Updating..." : "Force Update"}</span>
            </Button>
          </div>
      <style jsx global>{`
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein {
          opacity: 1 !important;
          transform: none !important;
          animation: fadein 0.7s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </div>
  )
}
