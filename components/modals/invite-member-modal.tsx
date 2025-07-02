"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Mail, CheckCircle, Loader2 } from "lucide-react"

interface InviteMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InviteMemberModal({ open, onOpenChange }: InviteMemberModalProps) {
  const [isInviting, setIsInviting] = useState(false)
  const [inviteSent, setInviteSent] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    role: "viewer",
    message: "",
  })

  const handleInvite = async () => {
    setIsInviting(true)
    // Simulate API call
    setTimeout(() => {
      setIsInviting(false)
      setInviteSent(true)
    }, 2000)
  }

  const handleClose = () => {
    setFormData({ email: "", role: "viewer", message: "" })
    setInviteSent(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <span>Invite Team Member</span>
          </DialogTitle>
          <DialogDescription>
            {inviteSent ? "Invitation sent successfully!" : "Add a new member to your compliance team"}
          </DialogDescription>
        </DialogHeader>

        {!inviteSent ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin - Full access to compliance tools</SelectItem>
                  <SelectItem value="editor">Editor - Create and edit policies</SelectItem>
                  <SelectItem value="viewer">Viewer - View-only access</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Input
                id="message"
                placeholder="Welcome to our compliance team!"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <Separator />

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleInvite}
                disabled={!formData.email || isInviting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isInviting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invitation
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-8">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Invitation Sent!</h3>
              <p className="text-sm text-slate-600">
                An invitation has been sent to <strong>{formData.email}</strong> with {formData.role} access.
              </p>
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
