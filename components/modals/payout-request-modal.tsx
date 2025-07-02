"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, DollarSign, CreditCard, Building2, Smartphone, AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PayoutRequestModalProps {
  isOpen: boolean
  onClose: () => void
  availableBalance: number
}

export function PayoutRequestModal({ isOpen, onClose, availableBalance }: PayoutRequestModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    method: "",
    paypalEmail: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountHolderName: "",
    swiftCode: "",
    mobileNumber: "",
    notes: "",
  })

  const { toast } = useToast()

  const minimumPayout = 50
  const processingFee = 2.5

  const payoutMethods = [
    { value: "paypal", label: "PayPal", icon: CreditCard, fee: "2.9% + $0.30" },
    { value: "bank", label: "Bank Transfer", icon: Building2, fee: "$5.00" },
    { value: "mobile", label: "Mobile Money", icon: Smartphone, fee: "3.5%" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation
    const amount = Number.parseFloat(formData.amount)
    if (amount < minimumPayout) {
      toast({ variant: "destructive", title: "Error", description: `Minimum payout amount is $${minimumPayout}` })
      setIsLoading(false)
      return
    }

    if (amount > availableBalance) {
      toast({ variant: "destructive", title: "Error", description: "Payout amount exceeds available balance" })
      setIsLoading(false)
      return
    }

    if (!formData.method) {
      toast({ variant: "destructive", title: "Error", description: "Please select a payout method" })
      setIsLoading(false)
      return
    }

    // Method-specific validation
    if (formData.method === "paypal" && !formData.paypalEmail) {
      toast({ variant: "destructive", title: "Error", description: "PayPal email is required" })
      setIsLoading(false)
      return
    }

    if (formData.method === "bank" && (!formData.bankName || !formData.accountNumber || !formData.accountHolderName)) {
      toast({ variant: "destructive", title: "Error", description: "All bank details are required" })
      setIsLoading(false)
      return
    }

    if (formData.method === "mobile" && !formData.mobileNumber) {
      toast({ variant: "destructive", title: "Error", description: "Mobile number is required" })
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSuccess(true)
    setIsLoading(false)
    toast({ title: "Success", description: "Payout request submitted successfully!" })
  }

  const resetForm = () => {
    setFormData({
      amount: "",
      method: "",
      paypalEmail: "",
      bankName: "",
      accountNumber: "",
      routingNumber: "",
      accountHolderName: "",
      swiftCode: "",
      mobileNumber: "",
      notes: "",
    })
    setIsSuccess(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const getNetAmount = () => {
    const amount = Number.parseFloat(formData.amount) || 0
    if (formData.method === "paypal") {
      return amount - (amount * 0.029 + 0.3)
    } else if (formData.method === "bank") {
      return amount - 5
    } else if (formData.method === "mobile") {
      return amount - amount * 0.035
    }
    return amount
  }

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Payout Request Submitted
            </DialogTitle>
            <DialogDescription>Your payout request has been successfully submitted.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Request Amount:</span>
                  <span className="font-medium">${Number.parseFloat(formData.amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Net Amount:</span>
                  <span className="font-medium text-green-600">${getNetAmount().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Method:</span>
                  <span className="font-medium">{payoutMethods.find((m) => m.value === formData.method)?.label}</span>
                </div>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your payout request is being processed. You'll receive an email confirmation within 24 hours, and
                payment will be processed within 3-5 business days.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button onClick={handleClose} className="flex-1">
                Close
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  resetForm()
                  setIsSuccess(false)
                }}
                className="flex-1"
              >
                Request Another
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Request Payout
          </DialogTitle>
          <DialogDescription>Request a payout from your affiliate earnings</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Available Balance */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Available Balance:</span>
              <span className="text-lg font-bold text-blue-600">${availableBalance.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimum payout: ${minimumPayout}</p>
          </div>

          {/* Payout Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Payout Amount *</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                min={minimumPayout}
                max={availableBalance}
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Payout Method */}
          <div className="space-y-2">
            <Label htmlFor="method">Payout Method *</Label>
            <Select value={formData.method} onValueChange={(value) => handleInputChange("method", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select payout method" />
              </SelectTrigger>
              <SelectContent>
                {payoutMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    <div className="flex items-center gap-2">
                      <method.icon className="h-4 w-4" />
                      <span>{method.label}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {method.fee}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Method-specific fields */}
          {formData.method === "paypal" && (
            <div className="space-y-2">
              <Label htmlFor="paypalEmail">PayPal Email *</Label>
              <Input
                id="paypalEmail"
                type="email"
                placeholder="your-paypal@email.com"
                value={formData.paypalEmail}
                onChange={(e) => handleInputChange("paypalEmail", e.target.value)}
                required
              />
            </div>
          )}

          {formData.method === "bank" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    placeholder="Bank of America"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange("bankName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                  <Input
                    id="accountHolderName"
                    placeholder="John Doe"
                    value={formData.accountHolderName}
                    onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    placeholder="1234567890"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input
                    id="routingNumber"
                    placeholder="021000021"
                    value={formData.routingNumber}
                    onChange={(e) => handleInputChange("routingNumber", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="swiftCode">SWIFT Code (International)</Label>
                <Input
                  id="swiftCode"
                  placeholder="BOFAUS3N"
                  value={formData.swiftCode}
                  onChange={(e) => handleInputChange("swiftCode", e.target.value)}
                />
              </div>
            </div>
          )}

          {formData.method === "mobile" && (
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number *</Label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                required
              />
            </div>
          )}

          {/* Fee Calculation */}
          {formData.amount && formData.method && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Requested Amount:</span>
                  <span>${Number.parseFloat(formData.amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Processing Fee:</span>
                  <span>-${(Number.parseFloat(formData.amount) - getNetAmount()).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Net Amount:</span>
                  <span className="text-green-600">${getNetAmount().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information or special instructions..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
