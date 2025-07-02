"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { InviteMemberModal } from "@/components/modals/invite-member-modal"
import { Users, Plus, Settings, Mail, Shield, Crown, UserCheck, Clock, MoreHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function TeamPage() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false)

  const teamMembers = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Owner",
      status: "active",
      lastActive: "Online now",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      joinedDate: "Jan 2023",
    },
    {
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "Admin",
      status: "active",
      lastActive: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SC",
      joinedDate: "Mar 2023",
    },
    {
      name: "Mike Rodriguez",
      email: "mike@example.com",
      role: "Editor",
      status: "active",
      lastActive: "1 day ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MR",
      joinedDate: "Jun 2023",
    },
    {
      name: "Emma Thompson",
      email: "emma@example.com",
      role: "Viewer",
      status: "pending",
      lastActive: "Invitation sent",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ET",
      joinedDate: "Pending",
    },
  ]

  const rolePermissions = {
    Owner: {
      description: "Full access to all features and settings",
      permissions: ["Manage team", "Billing", "All compliance tools", "Store connections"],
      color: "bg-purple-100 text-purple-800",
      icon: Crown,
    },
    Admin: {
      description: "Manage compliance and team members",
      permissions: ["Manage team", "All compliance tools", "Store connections"],
      color: "bg-blue-100 text-blue-800",
      icon: Shield,
    },
    Editor: {
      description: "Create and edit compliance policies",
      permissions: ["Policy generator", "Cookie manager", "View reports"],
      color: "bg-green-100 text-green-800",
      icon: UserCheck,
    },
    Viewer: {
      description: "View-only access to compliance data",
      permissions: ["View reports", "View policies"],
      color: "bg-slate-100 text-slate-800",
      icon: Users,
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Team Members</h1>
        <p className="text-slate-600">Manage your team and control access to compliance tools and data.</p>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-600">Total Members</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">4</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-slate-600">Active</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">3</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-slate-600">Pending</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">1</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-slate-600">Admins</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">2</div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Team Members</span>
            </span>
            <Button
              onClick={() => setInviteModalOpen(true)}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </CardTitle>
          <CardDescription>Manage team access and permissions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="bg-slate-100">{member.initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{member.name}</h4>
                    <Badge className={rolePermissions[member.role as keyof typeof rolePermissions].color}>
                      {member.role}
                    </Badge>
                    <Badge
                      className={
                        member.status === "active" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                      }
                    >
                      {member.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{member.email}</p>
                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                    <span>{member.lastActive}</span>
                    <span>Joined {member.joinedDate}</span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Role
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend Invite
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-purple-600" />
            <span>Role Permissions</span>
          </CardTitle>
          <CardDescription>Understanding what each role can access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(rolePermissions).map(([role, details]) => (
            <div key={role} className="p-4 border border-slate-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <details.icon className="h-5 w-5 text-slate-600 mt-1" />
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{role}</h4>
                    <Badge className={details.color}>{role}</Badge>
                  </div>
                  <p className="text-sm text-slate-600">{details.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {details.permissions.map((permission, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <InviteMemberModal open={inviteModalOpen} onOpenChange={setInviteModalOpen} />
    </div>
  )
}
