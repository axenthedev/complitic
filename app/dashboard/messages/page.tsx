"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Mail,
  Send,
  Search,
  Filter,
  Archive,
  Trash2,
  Star,
  Reply,
  Forward,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState(0)
  const [replyText, setReplyText] = useState("")

  const messages = [
    {
      id: 1,
      from: "Compliance Team",
      fromEmail: "compliance@complitic.com",
      subject: "GDPR Update Required - Action Needed",
      preview: "Your privacy policy needs immediate updates to comply with new EU regulations...",
      content: `Dear John,

We've detected that your privacy policy requires updates to comply with the latest GDPR amendments that came into effect this month.

Key changes needed:
• Update data retention periods
• Add new consent mechanisms
• Include third-party processor information

Our AI has already prepared the necessary updates. You can review and approve them in your dashboard.

Best regards,
Complitic Compliance Team`,
      timestamp: "2 hours ago",
      status: "unread",
      priority: "high",
      type: "compliance",
      avatar: "🛡️",
    },
    {
      id: 2,
      from: "Sarah Chen",
      fromEmail: "sarah@example.com",
      subject: "Cookie Banner Configuration",
      preview: "I've updated the cookie banner settings for our EU stores. Can you review?",
      content: `Hi John,

I've made some changes to our cookie banner configuration to improve user experience while maintaining compliance.

Changes made:
• Simplified consent options
• Added granular cookie categories
• Updated banner text for clarity

The changes are live on the staging environment. Please review when you have a chance.

Thanks!
Sarah`,
      timestamp: "5 hours ago",
      status: "read",
      priority: "medium",
      type: "team",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      from: "System Notifications",
      fromEmail: "system@complitic.com",
      subject: "Weekly Compliance Report",
      preview: "Your weekly compliance summary is ready. Overall score: 87%",
      content: `Weekly Compliance Report - January 8-14, 2024

Overall Compliance Score: 87% (+2% from last week)

Summary:
• 3 policies updated automatically
• 2 new compliance issues detected
• 1 store connection restored
• 15 cookie consent interactions

Recommendations:
• Update CCPA policy sections
• Review data processing agreements
• Enable cookie banner for new store

View full report in your dashboard.`,
      timestamp: "1 day ago",
      status: "read",
      priority: "low",
      type: "report",
      avatar: "📊",
    },
    {
      id: 4,
      from: "Mike Rodriguez",
      fromEmail: "mike@example.com",
      subject: "Store Connection Issue",
      preview: "Having trouble connecting the new WooCommerce store. Getting API errors...",
      content: `Hey John,

I'm trying to connect our new WooCommerce store but keep getting API authentication errors. 

Error details:
• API key seems valid
• Store URL is correct
• Getting 401 unauthorized responses

Could you check if there are any specific permissions needed for the API key?

Thanks,
Mike`,
      timestamp: "2 days ago",
      status: "read",
      priority: "medium",
      type: "support",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      from: "Legal Updates",
      fromEmail: "legal@complitic.com",
      subject: "New California Privacy Law Changes",
      preview: "Important updates to CCPA regulations effective March 2024...",
      content: `Important Legal Update

New amendments to the California Consumer Privacy Act (CCPA) will take effect on March 1, 2024.

Key changes:
• Expanded definition of personal information
• New requirements for data deletion requests
• Updated notice requirements for data collection

Action required:
• Review current privacy policies
• Update data handling procedures
• Ensure compliance before March 1st

We'll automatically update your policies once the changes are finalized.

Complitic Legal Team`,
      timestamp: "3 days ago",
      status: "read",
      priority: "high",
      type: "legal",
      avatar: "⚖️",
    },
  ]

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "compliance":
        return AlertCircle
      case "team":
        return Mail
      case "report":
        return CheckCircle
      case "support":
        return Clock
      case "legal":
        return AlertCircle
      default:
        return Mail
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-orange-600"
      case "low":
        return "text-blue-600"
      default:
        return "text-slate-600"
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

  const handleSendReply = () => {
    if (replyText.trim()) {
      // Handle reply logic here
      setReplyText("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Messages</h1>
        <p className="text-slate-600">Compliance notifications, team communications, and system updates.</p>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-600">Total</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">24</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-slate-600">Unread</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">3</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-slate-600">Starred</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">7</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Archive className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-slate-600">Archived</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">156</div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <Card className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <span>Inbox</span>
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {messages.map((message, index) => {
                const MessageIcon = getMessageIcon(message.type)
                return (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(index)}
                    className={`p-4 cursor-pointer border-b border-slate-100 hover:bg-slate-50 ${
                      selectedMessage === index ? "bg-blue-50 border-l-4 border-l-blue-600" : ""
                    } ${message.status === "unread" ? "bg-blue-25" : ""}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {typeof message.avatar === "string" && message.avatar.startsWith("/") ? (
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={message.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{message.from.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg">
                            {message.avatar}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p
                            className={`text-sm font-medium truncate ${
                              message.status === "unread" ? "text-slate-900" : "text-slate-700"
                            }`}
                          >
                            {message.from}
                          </p>
                          {message.status === "unread" && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                        </div>
                        <p
                          className={`text-sm truncate ${
                            message.status === "unread" ? "text-slate-900 font-medium" : "text-slate-600"
                          }`}
                        >
                          {message.subject}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{message.preview}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-slate-400">{message.timestamp}</span>
                          <Badge className={getPriorityBadge(message.priority)} variant="outline">
                            {message.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Message Content */}
        <Card className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{messages[selectedMessage].subject}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <span>From: {messages[selectedMessage].from}</span>
                  <span>•</span>
                  <span>{messages[selectedMessage].timestamp}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Message Content */}
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-slate-700">{messages[selectedMessage].content}</div>
            </div>

            {/* Reply Section */}
            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-center space-x-2 mb-4">
                <Button variant="outline" size="sm">
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </Button>
                <Button variant="outline" size="sm">
                  <Forward className="h-4 w-4 mr-2" />
                  Forward
                </Button>
              </div>

              <div className="space-y-4">
                <Textarea
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Attach File
                    </Button>
                  </div>
                  <Button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
