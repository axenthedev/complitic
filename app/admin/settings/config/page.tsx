"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Database, Cloud, Zap, Bot, Code, Server } from "lucide-react"

export default function AppConfigurationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">App Configuration</h1>
        <p className="text-slate-600 mt-2">Advanced application settings and integrations</p>
      </div>

      {/* Database Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Database Configuration</span>
          </CardTitle>
          <CardDescription>Database connection and performance settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="db-host">Database Host</Label>
              <Input id="db-host" defaultValue="localhost" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-port">Port</Label>
              <Input id="db-port" defaultValue="5432" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-name">Database Name</Label>
              <Input id="db-name" defaultValue="complitic_prod" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-pool">Connection Pool Size</Label>
              <Select defaultValue="20">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 connections</SelectItem>
                  <SelectItem value="20">20 connections</SelectItem>
                  <SelectItem value="50">50 connections</SelectItem>
                  <SelectItem value="100">100 connections</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Connection SSL</Label>
              <p className="text-sm text-slate-600">Enable SSL for database connections</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Query Logging</Label>
              <p className="text-sm text-slate-600">Log database queries for debugging</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* AI Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>AI Configuration</span>
          </CardTitle>
          <CardDescription>AI model and processing settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ai-provider">AI Provider</Label>
              <Select defaultValue="openai">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic</SelectItem>
                  <SelectItem value="google">Google AI</SelectItem>
                  <SelectItem value="azure">Azure OpenAI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ai-model">Default Model</Label>
              <Select defaultValue="gpt-4">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ai-temperature">Temperature</Label>
              <Select defaultValue="0.7">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.1">0.1 (Conservative)</SelectItem>
                  <SelectItem value="0.5">0.5 (Balanced)</SelectItem>
                  <SelectItem value="0.7">0.7 (Creative)</SelectItem>
                  <SelectItem value="1.0">1.0 (Very Creative)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ai-timeout">Request Timeout</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">60 seconds</SelectItem>
                  <SelectItem value="120">120 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Fallback Model</Label>
              <p className="text-sm text-slate-600">Use backup model if primary fails</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Response Caching</Label>
              <p className="text-sm text-slate-600">Cache AI responses for similar requests</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Cloud Storage Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="h-5 w-5" />
            <span>Cloud Storage</span>
          </CardTitle>
          <CardDescription>File storage and CDN configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="storage-provider">Storage Provider</Label>
              <Select defaultValue="aws-s3">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aws-s3">AWS S3</SelectItem>
                  <SelectItem value="google-cloud">Google Cloud Storage</SelectItem>
                  <SelectItem value="azure-blob">Azure Blob Storage</SelectItem>
                  <SelectItem value="cloudflare-r2">Cloudflare R2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="storage-region">Region</Label>
              <Select defaultValue="us-east-1">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                  <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                  <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                  <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="storage-bucket">Bucket Name</Label>
              <Input id="storage-bucket" defaultValue="complitic-prod-files" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cdn-domain">CDN Domain</Label>
              <Input id="cdn-domain" defaultValue="cdn.complitic.com" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable CDN</Label>
              <p className="text-sm text-slate-600">Use CDN for faster file delivery</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>File Compression</Label>
              <p className="text-sm text-slate-600">Compress files before storage</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Performance Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Performance Settings</span>
          </CardTitle>
          <CardDescription>Application performance and caching settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cache-provider">Cache Provider</Label>
              <Select defaultValue="redis">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="redis">Redis</SelectItem>
                  <SelectItem value="memcached">Memcached</SelectItem>
                  <SelectItem value="memory">In-Memory</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cache-ttl">Default Cache TTL</Label>
              <Select defaultValue="3600">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">5 minutes</SelectItem>
                  <SelectItem value="1800">30 minutes</SelectItem>
                  <SelectItem value="3600">1 hour</SelectItem>
                  <SelectItem value="86400">24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="worker-processes">Worker Processes</Label>
              <Select defaultValue="4">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 processes</SelectItem>
                  <SelectItem value="4">4 processes</SelectItem>
                  <SelectItem value="8">8 processes</SelectItem>
                  <SelectItem value="16">16 processes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-requests">Max Requests per Process</Label>
              <Select defaultValue="1000">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500">500 requests</SelectItem>
                  <SelectItem value="1000">1,000 requests</SelectItem>
                  <SelectItem value="2000">2,000 requests</SelectItem>
                  <SelectItem value="5000">5,000 requests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Gzip Compression</Label>
              <p className="text-sm text-slate-600">Compress HTTP responses</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Static File Caching</Label>
              <p className="text-sm text-slate-600">Cache static assets</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>Monitoring & Logging</span>
          </CardTitle>
          <CardDescription>Application monitoring and logging configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="log-level">Log Level</Label>
              <Select defaultValue="info">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">Debug</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warn">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="log-retention">Log Retention</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="metrics-provider">Metrics Provider</Label>
              <Select defaultValue="prometheus">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prometheus">Prometheus</SelectItem>
                  <SelectItem value="datadog">Datadog</SelectItem>
                  <SelectItem value="newrelic">New Relic</SelectItem>
                  <SelectItem value="grafana">Grafana Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="error-tracking">Error Tracking</Label>
              <Select defaultValue="sentry">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sentry">Sentry</SelectItem>
                  <SelectItem value="rollbar">Rollbar</SelectItem>
                  <SelectItem value="bugsnag">Bugsnag</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Health Check Endpoint</Label>
              <p className="text-sm text-slate-600">Enable /health endpoint</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Performance Monitoring</Label>
              <p className="text-sm text-slate-600">Track application performance metrics</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Environment Variables */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Environment Variables</span>
          </CardTitle>
          <CardDescription>Manage application environment variables</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">NODE_ENV</div>
                <div className="text-sm text-slate-600">Application environment</div>
              </div>
              <Badge>production</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">API_VERSION</div>
                <div className="text-sm text-slate-600">Current API version</div>
              </div>
              <Badge variant="outline">v2.1.0</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">FEATURE_FLAGS</div>
                <div className="text-sm text-slate-600">Enabled feature flags</div>
              </div>
              <div className="flex space-x-2">
                <Badge variant="secondary">auto_update</Badge>
                <Badge variant="secondary">ai_enhanced</Badge>
                <Badge variant="secondary">webhooks</Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Manage Environment Variables
          </Button>
        </CardContent>
      </Card>

      {/* Save Configuration */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Test Configuration</Button>
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Configuration</Button>
      </div>
    </div>
  )
}
