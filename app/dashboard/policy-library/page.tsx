"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  FileText, 
  Search, 
  Copy, 
  Download, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  Filter,
  SortAsc,
  SortDesc,
  Clock,
  Edit
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Policy {
  id: string
  title: string
  user_prompt: string
  result: string
  created_at: string
  updated_at: string
}

interface CustomizedTemplate {
  id: string
  template_slug: string
  template_name: string
  content: string
  form_data: any
  created_at: string
  updated_at: string
}

// Utility function to convert markdown bold to clean text
const formatPolicyContent = (content: string) => {
  return content
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove asterisks, keep the text
    .replace(/\n/g, '<br />')
}

export default function PolicyLibrary() {
  const { user } = useUser()
  const { toast } = useToast()
  
  const [policies, setPolicies] = useState<Policy[]>([])
  const [customizedTemplates, setCustomizedTemplates] = useState<CustomizedTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filterType, setFilterType] = useState<string>('all')

  useEffect(() => {
    fetchPolicies()
    fetchCustomizedTemplates()
  }, [])

  const fetchPolicies = async () => {
    try {
      const response = await fetch("/api/generated-policies")
      if (!response.ok) {
        throw new Error("Failed to fetch policies")
      }
      const data = await response.json()
      setPolicies(data.policies || [])
    } catch (error) {
      console.error("Error fetching policies:", error)
      toast({
        title: "Error",
        description: "Failed to load your policies. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchCustomizedTemplates = async () => {
    try {
      const response = await fetch('/api/templates/customized')
      if (response.ok) {
        const data = await response.json()
        setCustomizedTemplates(data.customizedTemplates || [])
      }
    } catch (error) {
      console.error('Error fetching customized templates:', error)
    }
  }

  const handleCopy = (content: string) => {
    // Remove all formatting for clean copy
    const cleanContent = content
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove asterisks
      .replace(/\n/g, '\n') // Keep line breaks
    navigator.clipboard.writeText(cleanContent)
    toast({
      title: "Copied",
      description: "Policy content copied to clipboard!",
    })
  }

  const handleDownload = (policy: Policy) => {
    // Remove all formatting for clean download
    const cleanContent = policy.result
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove asterisks
      .replace(/\n/g, '\n') // Keep line breaks
    const blob = new Blob([cleanContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${policy.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: "Downloaded",
      description: "Policy downloaded successfully!",
    })
  }

  const handleDelete = async (policyId: string) => {
    if (!confirm("Are you sure you want to delete this policy?")) return

    try {
      const response = await fetch(`/api/generated-policies/${policyId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error("Failed to delete policy")
      }

      setPolicies(policies.filter(p => p.id !== policyId))
      toast({
        title: "Deleted",
        description: "Policy deleted successfully!",
      })
    } catch (error) {
      console.error("Error deleting policy:", error)
      toast({
        title: "Error",
        description: "Failed to delete policy. Please try again.",
        variant: "destructive"
      })
    }
  }

  const downloadCustomizedTemplate = (template: CustomizedTemplate) => {
    const blob = new Blob([template.content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${template.template_name.toLowerCase().replace(/\s+/g, "_")}_${template.form_data?.store_name || 'customized'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: "Downloaded",
      description: "Template downloaded successfully!",
    })
  }

  const filteredAndSortedPolicies = policies
    .filter(policy => {
      const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           policy.result.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterType === 'all' || 
                           policy.title.toLowerCase().includes(filterType.toLowerCase())
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })

  const getPolicyType = (title: string) => {
    const types = ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Shipping Policy', 
                   'Cookie Policy', 'Return Policy', 'Acceptable Use Policy', 'Data Processing Agreement']
    return types.find(type => title.includes(type)) || 'Policy'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading your policies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Policy Library</h1>
          <p className="text-gray-600 mt-2">Manage and access your AI-generated policies and customized templates</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <FileText className="w-4 h-4 mr-2" />
          {policies.length + customizedTemplates.length} Total
        </Badge>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search policies and templates by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Types</option>
            <option value="privacy">Privacy Policy</option>
            <option value="terms">Terms of Service</option>
            <option value="refund">Refund Policy</option>
            <option value="shipping">Shipping Policy</option>
            <option value="cookie">Cookie Policy</option>
            <option value="return">Return Policy</option>
            <option value="acceptable">Acceptable Use Policy</option>
            <option value="data">Data Processing Agreement</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* AI Generated Policies Grid */}
      {filteredAndSortedPolicies.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">No policies found</h3>
              <p className="text-gray-600 mt-2">
                {searchTerm || filterType !== 'all' 
                  ? "Try adjusting your search or filters"
                  : "Start by generating your first policy using the AI Policy Maker or customize a template"
                }
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedPolicies.map((policy) => (
            <Card key={policy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{policy.title}</CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-3 h-3" />
                        {formatDate(policy.created_at)}
                      </div>
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {getPolicyType(policy.title)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div 
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: formatPolicyContent(policy.result.substring(0, 200)) + '...' }}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPolicy(policy)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{policy.title}</DialogTitle>
                            <DialogDescription>
                              Generated on {formatDate(policy.created_at)}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">Generated Content:</h4>
                              <div 
                                className="text-sm max-h-96 overflow-y-auto"
                                dangerouslySetInnerHTML={{ __html: formatPolicyContent(policy.result) }}
                              />
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">Original Prompt:</h4>
                              <div className="text-sm text-gray-700">
                                {policy.user_prompt}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(policy.result)}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(policy)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(policy.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recently Customized Templates Section */}
      {customizedTemplates.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Recently Customized Templates</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customizedTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                      {template.template_name}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatDate(template.created_at)}
                    </span>
                  </div>
                  <CardTitle className="text-sm">
                    {template.form_data?.store_name || 'Customized Template'}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {template.form_data?.store_url || 'No URL provided'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => downloadCustomizedTemplate(template)}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                    >
                      <Link href={`/dashboard/templates/${template.template_slug}`}>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 