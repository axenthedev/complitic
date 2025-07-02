"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Plus, Bell, CheckCircle, AlertTriangle, RefreshCw, Globe, FileText } from "lucide-react"

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const upcomingEvents = [
    {
      title: "GDPR Regulation Review",
      description: "Quarterly review of EU privacy regulations",
      date: "2024-01-15",
      time: "09:00 AM",
      type: "compliance",
      priority: "high",
      status: "scheduled",
    },
    {
      title: "Cookie Policy Update",
      description: "Automatic update based on new tracking technologies",
      date: "2024-01-18",
      time: "02:00 PM",
      type: "auto-update",
      priority: "medium",
      status: "scheduled",
    },
    {
      title: "CCPA Law Changes Review",
      description: "Review upcoming California privacy law amendments",
      date: "2024-01-22",
      time: "11:00 AM",
      type: "compliance",
      priority: "high",
      status: "scheduled",
    },
    {
      title: "Monthly Compliance Scan",
      description: "Automated scan of all connected stores",
      date: "2024-01-25",
      time: "03:00 AM",
      type: "scan",
      priority: "low",
      status: "scheduled",
    },
    {
      title: "Privacy Policy Renewal",
      description: "Annual review and update of privacy policies",
      date: "2024-02-01",
      time: "10:00 AM",
      type: "renewal",
      priority: "high",
      status: "scheduled",
    },
  ]

  const recentEvents = [
    {
      title: "Privacy Policy Updated",
      description: "Automatic GDPR compliance update completed",
      date: "2024-01-10",
      time: "02:30 PM",
      type: "completed",
      status: "success",
    },
    {
      title: "Cookie Banner Deployment",
      description: "New cookie consent banner deployed to all stores",
      date: "2024-01-08",
      time: "11:15 AM",
      type: "completed",
      status: "success",
    },
    {
      title: "Compliance Scan Failed",
      description: "Store connection timeout during scheduled scan",
      date: "2024-01-05",
      time: "03:00 AM",
      type: "completed",
      status: "failed",
    },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "compliance":
        return Globe
      case "auto-update":
        return RefreshCw
      case "scan":
        return CheckCircle
      case "renewal":
        return FileText
      default:
        return CalendarIcon
    }
  }

  const getEventColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-orange-200 bg-orange-50"
      case "low":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-slate-200 bg-slate-50"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Compliance Calendar</h1>
        <p className="text-slate-600">Track compliance deadlines, scheduled updates, and important regulatory dates.</p>
      </div>

      {/* Calendar Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-600">This Month</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">8</div>
            <div className="text-xs text-slate-500">Events scheduled</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-slate-600">High Priority</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">3</div>
            <div className="text-xs text-slate-500">Critical deadlines</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-slate-600">Auto Updates</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">5</div>
            <div className="text-xs text-slate-500">Scheduled updates</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-slate-600">Completed</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">12</div>
            <div className="text-xs text-slate-500">This month</div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span>Upcoming Events</span>
            </span>
            <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </CardTitle>
          <CardDescription>Scheduled compliance activities and deadlines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map((event, index) => {
            const EventIcon = getEventIcon(event.type)
            return (
              <div key={index} className={`p-4 border rounded-lg ${getEventColor(event.priority)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <EventIcon className="h-5 w-5 text-slate-600 mt-1" />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge className={getPriorityBadge(event.priority)}>{event.priority}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{event.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>{event.date}</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Remind
                  </Button>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Recently completed compliance events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEvents.map((event, index) => (
              <div key={index} className="flex items-start space-x-3">
                {event.status === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                )}
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-slate-600">{event.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <span>Quick Schedule</span>
            </CardTitle>
            <CardDescription>Add common compliance events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-white border-slate-200 hover:bg-slate-50">
              <Globe className="h-4 w-4 mr-2" />
              Schedule GDPR Review
            </Button>
            <Button variant="outline" className="w-full justify-start bg-white border-slate-200 hover:bg-slate-50">
              <RefreshCw className="h-4 w-4 mr-2" />
              Plan Policy Update
            </Button>
            <Button variant="outline" className="w-full justify-start bg-white border-slate-200 hover:bg-slate-50">
              <CheckCircle className="h-4 w-4 mr-2" />
              Schedule Compliance Scan
            </Button>
            <Button variant="outline" className="w-full justify-start bg-white border-slate-200 hover:bg-slate-50">
              <FileText className="h-4 w-4 mr-2" />
              Set Renewal Reminder
            </Button>
            <Button variant="outline" className="w-full justify-start bg-white border-slate-200 hover:bg-slate-50">
              <Bell className="h-4 w-4 mr-2" />
              Custom Event
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Widget Placeholder */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-purple-600" />
            <span>Calendar View</span>
          </CardTitle>
          <CardDescription>Visual calendar with all compliance events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-slate-500">
              <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Interactive calendar view would be displayed here</p>
              <p className="text-sm mt-1">Showing events for January 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
