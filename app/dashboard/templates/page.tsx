"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FileText, Shield, Truck, CreditCard, Cookie, Clock, Edit, Download } from "lucide-react";
import Link from "next/link";
import { getAllTemplates } from "@/lib/templates/policies";

const categoryIcons = {
  legal: Shield,
  operational: Truck,
};

const templateIcons = {
  privacy_policy: Shield,
  terms_conditions: FileText,
  cookie_policy: Cookie,
  refund_policy: CreditCard,
  shipping_policy: Truck,
};

interface CustomizedTemplate {
  id: string;
  template_slug: string;
  template_name: string;
  content: string;
  form_data: any;
  created_at: string;
  updated_at: string;
}

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [customizedTemplates, setCustomizedTemplates] = useState<CustomizedTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  
  const templates = getAllTemplates();
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    fetchCustomizedTemplates();
  }, []);

  const fetchCustomizedTemplates = async () => {
    try {
      const response = await fetch('/api/templates/customized');
      if (response.ok) {
        const data = await response.json();
        setCustomizedTemplates(data.customizedTemplates || []);
      }
    } catch (error) {
      console.error('Error fetching customized templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCustomizedTemplate = (template: CustomizedTemplate) => {
    const blob = new Blob([template.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.template_name.toLowerCase().replace(/\s+/g, "_")}_${template.form_data?.store_name || 'customized'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Policy Templates</h1>
        <p className="text-gray-600">
          Choose from our professionally crafted policy templates to ensure your store complies with legal requirements and provides clear information to customers.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={selectedCategory === "legal" ? "default" : "outline"}
            onClick={() => setSelectedCategory("legal")}
            size="sm"
          >
            Legal
          </Button>
          <Button
            variant={selectedCategory === "operational" ? "default" : "outline"}
            onClick={() => setSelectedCategory("operational")}
            size="sm"
          >
            Operational
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <div id="templates" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const CategoryIcon = categoryIcons[template.category];
          const TemplateIcon = templateIcons[template.slug as keyof typeof templateIcons] || FileText;
          
          return (
            <Card key={template.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TemplateIcon className="w-5 h-5 text-blue-600" />
                    <Badge variant={template.category === "legal" ? "default" : "secondary"}>
                      {template.category}
                    </Badge>
                  </div>
                  <CategoryIcon className="w-4 h-4 text-gray-400" />
                </div>
                <CardTitle className="text-xl">{template.name}</CardTitle>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Required Fields:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.requiredFields.map((field) => (
                        <Badge key={field} variant="outline" className="text-xs">
                          {field.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button asChild className="flex-1">
                      <Link href={`/dashboard/templates/${template.slug}`}>
                        Use Template
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}

      {/* Recently Customized Templates Section */}
      <div className="mt-12 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Recently Customized Templates</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading your customized templates...</p>
          </div>
        ) : customizedTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customizedTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
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
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customized templates yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first customized template by selecting a template above and filling out the form.
            </p>
            <Button asChild variant="outline">
              <Link href="#templates">
                Browse Templates
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Legal Templates</h3>
            <p className="text-sm text-gray-600">
              Privacy Policy, Terms & Conditions, and Cookie Policy templates help ensure legal compliance and protect your business.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Operational Templates</h3>
            <p className="text-sm text-gray-600">
              Refund Policy and Shipping Policy templates provide clear guidelines for customer interactions and expectations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 