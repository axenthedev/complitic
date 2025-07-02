"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Store, CheckCircle, Loader2 } from "lucide-react"

interface ConnectStoreModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  platform?: string
}

export function ConnectStoreModal({ open, onOpenChange, platform }: ConnectStoreModalProps) {
  const [step, setStep] = useState(1)
  const [isConnecting, setIsConnecting] = useState(false)
  const [formData, setFormData] = useState({
    storeName: "",
    storeUrl: "",
    apiKey: "",
    platform: platform || "",
  })

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate API call
    setTimeout(() => {
      setIsConnecting(false)
      setStep(3)
    }, 2000)
  }

  const handleClose = () => {
    setStep(1)
    setFormData({ storeName: "", storeUrl: "", apiKey: "", platform: platform || "" })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Store className="h-5 w-5 text-blue-600" />
            <span>Connect Store</span>
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Enter your store details to connect"}
            {step === 2 && "Connecting to your store..."}
            {step === 3 && "Store connected successfully!"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => setFormData({ ...formData, platform: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shopify">Shopify</SelectItem>
                  <SelectItem value="woocommerce">WooCommerce</SelectItem>
                  <SelectItem value="bigcommerce">BigCommerce</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                placeholder="My Awesome Store"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeUrl">Store URL</Label>
              <Input
                id="storeUrl"
                placeholder="https://your-store.myshopify.com"
                value={formData.storeUrl}
                onChange={(e) => setFormData({ ...formData, storeUrl: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your API key"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              />
            </div>

            <Separator />

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={!formData.storeName || !formData.storeUrl || !formData.apiKey || !formData.platform}
                className="bg-green-600 hover:bg-green-700"
              >
                Connect Store
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 py-8">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Connecting to {formData.storeName}</h3>
              <p className="text-sm text-slate-600">Verifying credentials and setting up compliance monitoring...</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Validating API credentials</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span>Setting up compliance monitoring</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <div className="h-4 w-4 rounded-full border-2 border-slate-300" />
                <span>Configuring automated scans</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 py-8">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Store Connected Successfully!</h3>
              <p className="text-sm text-slate-600 mb-4">
                {formData.storeName} is now connected and being monitored for compliance.
              </p>
              <Badge className="bg-green-100 text-green-800">Active Monitoring</Badge>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleClose} className="bg-green-600 hover:bg-green-700">
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
