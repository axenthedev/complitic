"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Download, Save, Eye, Edit, Upload } from "lucide-react";
import Link from "next/link";
import { getTemplateBySlug } from "@/lib/templates/policies";
import { PublishModal } from "@/components/publish-modal";

interface FormData {
  store_name: string;
  store_url: string;
  contact_email: string;
  contact_phone: string;
  store_address: string;
  country: string;
  business_type: string;
  current_date: string;
  timezone: string;
}

export default function TemplatePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [template, setTemplate] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    store_name: "",
    store_url: "",
    contact_email: "",
    contact_phone: "",
    store_address: "",
    country: "",
    business_type: "",
    current_date: new Date().toLocaleDateString(),
    timezone: "UTC",
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  useEffect(() => {
    const templateData = getTemplateBySlug(slug);
    if (!templateData) {
      router.push("/dashboard/templates");
      return;
    }
    setTemplate(templateData);
  }, [slug, router]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateDocument = () => {
    if (!template) return;
    
    setIsGenerating(true);
    
    // Replace placeholders with form data
    let content = template.content;
    Object.entries(formData).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      content = content.replace(new RegExp(placeholder, 'g'), value);
    });
    
    setGeneratedContent(content);
    setActiveTab("preview");
    setIsGenerating(false);
  };

  const saveToSupabase = async () => {
    if (!generatedContent) return;
    
    setIsSaving(true);
    
    try {
      console.log('Attempting to save document...');
      console.log('Request data:', {
        template_slug: slug,
        template_name: template.name,
        content_length: generatedContent.length,
        form_data: formData,
      });

      const response = await fetch("/api/templates/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_slug: slug,
          template_name: template.name,
          content: generatedContent,
          form_data: formData,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response received:', text.substring(0, 500));
        throw new Error(`Server returned non-JSON response (${response.status}): ${text.substring(0, 100)}...`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      console.log('Response data type:', typeof data);
      console.log('Response data keys:', Object.keys(data || {}));

      if (!response.ok) {
        console.error('Save API error - Status:', response.status);
        console.error('Save API error - Data:', data);
        console.error('Save API error - Data type:', typeof data);
        throw new Error(data?.error || `HTTP ${response.status}: Failed to save document`);
      }

      // Check if we got a successful response
      if (!data || Object.keys(data).length === 0) {
        console.error('Empty response data received');
        throw new Error('Server returned empty response');
      }

      if (!data.success) {
        console.error('API returned success: false');
        throw new Error(data.error || 'Save operation failed');
      }

      console.log('Save successful:', data);
      alert("Document copy saved successfully!");
      
    } catch (error) {
      console.error("Error saving document:", error);
      
      // Test API connectivity
      try {
        console.log('Testing API connectivity...');
        const testResponse = await fetch("/api/templates/test");
        const testData = await testResponse.json();
        console.log('API test result:', testData);
      } catch (testError) {
        console.error('API connectivity test failed:', testError);
      }
      
      alert(`Failed to save document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const downloadDocument = () => {
    if (!generatedContent) return;
    
    const blob = new Blob([generatedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template?.name.toLowerCase().replace(/\s+/g, "_")}_${formData.store_name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!template) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Template not found</h3>
          <Button asChild>
            <Link href="/dashboard/templates">Back to Templates</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard/templates">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Link>
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{template.name}</h1>
            <p className="text-gray-600">{template.description}</p>
          </div>
          <Badge variant={template.category === "legal" ? "default" : "secondary"}>
            {template.category}
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="form" className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Fill Form
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="template" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Template
          </TabsTrigger>
        </TabsList>

        {/* Form Tab */}
        <TabsContent value="form" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Required Information</CardTitle>
              <CardDescription>
                Fill in the required fields to generate your {template.name.toLowerCase()}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="store_name">Store Name *</Label>
                  <Input
                    id="store_name"
                    value={formData.store_name}
                    onChange={(e) => handleInputChange("store_name", e.target.value)}
                    placeholder="Your Store Name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store_url">Store URL *</Label>
                  <Input
                    id="store_url"
                    value={formData.store_url}
                    onChange={(e) => handleInputChange("store_url", e.target.value)}
                    placeholder="https://yourstore.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_email">Contact Email *</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => handleInputChange("contact_email", e.target.value)}
                    placeholder="contact@yourstore.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => handleInputChange("contact_phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_type">Business Type</Label>
                  <Select value={formData.business_type} onValueChange={(value) => handleInputChange("business_type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="E-commerce Store">E-commerce Store</SelectItem>
                      <SelectItem value="Online Service">Online Service</SelectItem>
                      <SelectItem value="Digital Products">Digital Products</SelectItem>
                      <SelectItem value="Physical Products">Physical Products</SelectItem>
                      <SelectItem value="Subscription Service">Subscription Service</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                      <SelectItem value="CST">Central Time (CST)</SelectItem>
                      <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                      <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="CET">Central European Time (CET)</SelectItem>
                      <SelectItem value="AEST">Australian Eastern Time (AEST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="store_address">Store Address</Label>
                  <Textarea
                    id="store_address"
                    value={formData.store_address}
                    onChange={(e) => handleInputChange("store_address", e.target.value)}
                    placeholder="Enter your business address"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={generateDocument}
                  disabled={!formData.store_name || !formData.store_url || !formData.contact_email || !formData.country}
                  className="flex-1"
                >
                  Generate Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Document</CardTitle>
              <CardDescription>
                Preview your {template.name.toLowerCase()} with the information you provided.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm font-mono">{generatedContent}</pre>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button onClick={saveToSupabase} className="flex-1" disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Saving..." : "Save Copy"}
                    </Button>
                    <Button onClick={downloadDocument} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button 
                      onClick={() => setIsPublishModalOpen(true)}
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      📤 Publish to Store
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Generate a document first to see the preview.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Template Tab */}
        <TabsContent value="template" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Preview</CardTitle>
              <CardDescription>
                View the original template with placeholders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm font-mono">{template.content}</pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Publish Modal */}
      <PublishModal
        policyContent={generatedContent}
        policyTitle={template?.name || ""}
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />
    </div>
  );
} 