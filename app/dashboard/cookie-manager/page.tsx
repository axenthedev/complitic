"use client"

import { useEffect, useState } from "react"
import { useAuth, useUser } from "@clerk/nextjs"
import supabase from "@/lib/supabase/browser"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Cookie, Eye, Code, Settings, Globe, CheckCircle, AlertTriangle, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

const COLOR_OPTIONS = [
  { name: "Blue", value: "blue", className: "bg-blue-600" },
  { name: "Green", value: "green", className: "bg-green-600" },
  { name: "Orange", value: "orange", className: "bg-orange-600" },
  { name: "Purple", value: "purple", className: "bg-purple-600" },
  { name: "Slate", value: "slate", className: "bg-slate-600" },
]

// Add a color map for button styles
const BUTTON_COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-600' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-600' },
};

export default function CookieManager() {
  const { getToken, isLoaded } = useAuth();
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "", required: false, enabled: true });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState<any>(null);
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>("add");
  const [modalCategory, setModalCategory] = useState<any>({ name: "", description: "", required: false, enabled: true, cookie_count: 0 });
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // Fetch banner and categories
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        if (!isLoaded || !isClerkLoaded || !clerkUser?.id) return;
        const token = await getToken({ template: "supabase" });
        if (token) {
          await supabase.auth.setSession({ access_token: token, refresh_token: "" });
        }
        // Fetch banner (for first store or user-wide)
        const { data: banners, error: bannerError } = await supabase
          .from("cookie_banners")
          .select("*")
          .eq("user_id", clerkUser.id)
          .order("updated_at", { ascending: false })
          .limit(1);
        if (bannerError) throw bannerError;
        setBanner(banners && banners[0] ? banners[0] : null);
        // Fetch categories
        const { data: cats, error: catError } = await supabase
          .from("cookie_categories")
          .select("*")
          .eq("user_id", clerkUser.id);
        if (catError) throw catError;
        setCategories(cats || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [getToken, isLoaded, isClerkLoaded, clerkUser?.id]);

  // Handlers for updating banner and categories
  async function saveBanner(updates: any) {
    if (!clerkUser?.id) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("cookie_banners")
        .upsert([{ ...banner, ...updates, user_id: clerkUser.id }]);
      if (error) throw error;
      setBanner({ ...banner, ...updates });
    } catch (err: any) {
      setError(err.message || "Failed to save banner");
    } finally {
      setSaving(false);
    }
  }
  async function saveCategory(index: number, updates: any) {
    if (!clerkUser || !clerkUser.id) return;
    setSaving(true);
    try {
      // Merge updates with the current category
      const cat = { ...categories[index], ...updates };
      const fullCat = {
        id: cat.id,
        name: cat.name,
        description: cat.description,
        required: cat.required,
        enabled: cat.enabled,
        cookie_count: cat.cookie_count ?? 0,
        user_id: clerkUser.id,
      };
      const { data, error } = await supabase
        .from("cookie_categories")
        .upsert([fullCat])
        .select();
      if (error) {
        console.error("Supabase upsert error:", error, fullCat);
        throw error;
      }
      // Use returned data to update local state
      const newCats = [...categories];
      if (data && data[0]) {
        newCats[index] = data[0];
      } else {
        newCats[index] = fullCat;
      }
      setCategories(newCats);
    } catch (err: any) {
      setError(err.message || "Failed to save category");
      console.error("Save category error:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleModalSave() {
    setSaving(true);
    try {
      if (modalMode === "add") {
        const { data, error } = await supabase
          .from("cookie_categories")
          .insert([{ ...modalCategory, user_id: clerkUser.id }])
          .select();
        if (error) {
          console.error("Supabase insert error:", error, modalCategory);
          throw error;
        }
        setCategories([...categories, ...(data || [])]);
        toast({ title: "Category added" });
      } else {
        const { data, error } = await supabase
          .from("cookie_categories")
          .update({ ...modalCategory, user_id: clerkUser.id })
          .eq("id", modalCategory.id)
          .select();
        if (error) {
          console.error("Supabase update error:", error, modalCategory);
          throw error;
        }
        setCategories(categories.map((cat) => (cat.id === modalCategory.id ? (data && data[0] ? data[0] : modalCategory) : cat)));
        toast({ title: "Category updated" });
      }
      setModalOpen(false);
      setModalCategory({ name: "", description: "", required: false, enabled: true, cookie_count: 0 });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to save category", variant: "destructive" });
      console.error("Modal save category error:", err);
    } finally {
      setSaving(false);
    }
  }
  async function handleDeleteCategory() {
    if (deleteIndex === null) return;
    setSaving(true);
    try {
      const cat = categories[deleteIndex];
      const { error } = await supabase
        .from("cookie_categories")
        .delete()
        .eq("id", cat.id);
      if (error) throw error;
      setCategories(categories.filter((_, i) => i !== deleteIndex));
      toast({ title: "Category deleted" });
      setDeleteIndex(null);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to delete category", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  if (loading || !isClerkLoaded || !clerkUser?.id) {
    return <div className="p-8 text-center text-slate-500">Loading cookie manager...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  // Fallbacks for empty data
  const bannerEnabled = banner?.status === "active";
  const gdprEnabled = banner?.gdpr_enabled ?? true;
  const ccpaEnabled = banner?.ccpa_enabled ?? true;
  const bannerText = banner?.banner_text ?? "We use cookies to enhance your browsing experience and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies.";
  const acceptText = banner?.accept_text ?? "Accept All";
  const rejectText = banner?.reject_text ?? "Reject All";
  const bannerColor = banner?.color ?? "blue";

  // Banner preview style
  const colorClass = COLOR_OPTIONS.find(c => c.value === bannerColor)?.className || "bg-blue-600";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Cookie Manager</h1>
        <p className="text-slate-600">Configure cookie consent banners and manage cookie categories for compliance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Banner Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cookie className="h-5 w-5 text-orange-600" />
                <span>Cookie Banner Settings</span>
              </CardTitle>
              <CardDescription>Configure your cookie consent banner appearance and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Enable Cookie Banner</Label>
                  <p className="text-sm text-slate-600">Show cookie consent banner to visitors</p>
                </div>
                <Switch checked={bannerEnabled} onCheckedChange={v => saveBanner({ status: v ? "active" : "inactive" })} disabled={saving} />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base font-medium">Banner Color</Label>
                <div className="flex space-x-2">
                  {COLOR_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      className={`w-8 h-8 rounded-full border-2 ${opt.className} ${bannerColor === opt.value ? 'border-black' : 'border-transparent'}`}
                      onClick={() => saveBanner({ color: opt.value })}
                      disabled={saving}
                      aria-label={opt.name}
                      type="button"
                    />
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base font-medium">Compliance Regions</Label>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium">GDPR (European Union)</p>
                      <p className="text-sm text-slate-600">Required for EU visitors</p>
                    </div>
                  </div>
                  <Switch checked={gdprEnabled} onCheckedChange={v => saveBanner({ gdpr_enabled: v })} disabled={saving} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="font-medium">CCPA (California)</p>
                      <p className="text-sm text-slate-600">Required for California residents</p>
                    </div>
                  </div>
                  <Switch checked={ccpaEnabled} onCheckedChange={v => saveBanner({ ccpa_enabled: v })} disabled={saving} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base font-medium">Banner Text</Label>
                <Textarea
                  placeholder="We use cookies to enhance your browsing experience and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies."
                  className="min-h-[80px]"
                  value={bannerText}
                  onChange={e => saveBanner({ banner_text: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Accept Button Text</Label>
                  <Input value={acceptText} onChange={e => saveBanner({ accept_text: e.target.value })} disabled={saving} />
                </div>
                <div className="space-y-2">
                  <Label>Reject Button Text</Label>
                  <Input value={rejectText} onChange={e => saveBanner({ reject_text: e.target.value })} disabled={saving} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banner Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <span>Banner Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 ${colorClass} text-white`}>
                <div className="flex-1">
                  <div className="font-medium mb-2">{bannerText}</div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-white text-black hover:bg-slate-100 border" style={{ backgroundColor: '#fff', color: '#000' }}>{acceptText}</Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`border ${BUTTON_COLOR_MAP[bannerColor]?.bg} ${BUTTON_COLOR_MAP[bannerColor]?.text} ${BUTTON_COLOR_MAP[bannerColor]?.border}`}
                      style={{ borderColor: 'currentColor' }}
                    >
                      {rejectText}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Cookie className="h-8 w-8 mb-2 text-white" />
                  <span className="text-xs">{gdprEnabled && 'GDPR'}{gdprEnabled && ccpaEnabled && ', '}{ccpaEnabled && 'CCPA'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Status */}
        <div className="space-y-6">
          {/* Cookie Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-slate-600" />
                <span>Cookie Categories</span>
              </CardTitle>
              <CardDescription>Manage different types of cookies used on your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button size="sm" className="mb-2" onClick={() => { setModalMode("add"); setModalCategory({ name: "", description: "", required: false, enabled: true, cookie_count: 0 }); setModalOpen(true); }}>
                <Plus className="h-4 w-4 mr-1" /> Add Category
              </Button>
              {categories.length === 0 && <div className="text-slate-500 text-sm">No categories found.</div>}
              {categories.map((category, index) => (
                <div key={category.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{category.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {category.cookie_count} cookies
                      </Badge>
                      {category.required && (
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{category.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={category.enabled} disabled={category.required || saving} onCheckedChange={v => saveCategory(index, { enabled: v })} />
                    {!category.required && (
                      <>
                        <Button size="icon" variant="ghost" onClick={() => { setModalMode("edit"); setModalCategory(category); setModalOpen(true); }} disabled={saving}>
                          Edit
                        </Button>
                        <Button size="icon" variant="destructive" onClick={() => setDeleteIndex(index)} disabled={saving}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {/* Add/Edit Modal */}
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{modalMode === "add" ? "Add Category" : "Edit Category"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <Input
                      placeholder="Category name"
                      value={modalCategory.name}
                      onChange={e => setModalCategory({ ...modalCategory, name: e.target.value })}
                      disabled={saving}
                    />
                    <Input
                      placeholder="Description"
                      value={modalCategory.description}
                      onChange={e => setModalCategory({ ...modalCategory, description: e.target.value })}
                      disabled={saving}
                    />
                    <div className="flex items-center gap-2">
                      <Label>Required</Label>
                      <Switch checked={modalCategory.required} onCheckedChange={v => setModalCategory({ ...modalCategory, required: v })} disabled={saving} />
                      <Label>Enabled</Label>
                      <Switch checked={modalCategory.enabled} onCheckedChange={v => setModalCategory({ ...modalCategory, enabled: v })} disabled={saving} />
                    </div>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Cookie count"
                      value={modalCategory.cookie_count}
                      onChange={e => setModalCategory({ ...modalCategory, cookie_count: Number(e.target.value) })}
                      disabled={saving}
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleModalSave} disabled={saving || !modalCategory.name.trim()}>
                      {saving ? "Saving..." : "Save"}
                    </Button>
                    <Button variant="outline" onClick={() => setModalOpen(false)} disabled={saving}>
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* Delete Confirmation */}
              <AlertDialog open={deleteIndex !== null} onOpenChange={v => { if (!v) setDeleteIndex(null); }}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <div>Are you sure you want to delete this category? This action cannot be undone.</div>
                  <AlertDialogFooter>
                    <Button variant="destructive" onClick={handleDeleteCategory} disabled={saving}>
                      {saving ? "Deleting..." : "Delete"}
                    </Button>
                    <Button variant="outline" onClick={() => setDeleteIndex(null)} disabled={saving}>
                      Cancel
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          {/* Embed Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-green-600" />
                <span>Embed Code</span>
              </CardTitle>
              <CardDescription>Copy this code to your website's header section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <code>{`<!-- Complitic Cookie Consent -->
<script src="https://cdn.complitic.com/cookie-banner.js"></script>
<script>
  CompliticCookies.init({
    apiKey: '${clerkUser.id}',
    bannerId: '${banner?.id || ''}',
    color: '${bannerColor}',
    gdpr: ${gdprEnabled},
    ccpa: ${ccpaEnabled},
    categories: [${categories.map(c => `'${c.name.toLowerCase()}'`).join(", ")}]
  });
</script>`}</code>
              </div>
              <Button className="mt-4 bg-transparent" variant="outline" onClick={() => {
                navigator.clipboard.writeText(`<!-- Complitic Cookie Consent -->\n<script src=\"https://cdn.complitic.com/cookie-banner.js\"></script>\n<script>\n  CompliticCookies.init({\n    apiKey: '${clerkUser.id}',\n    bannerId: '${banner?.id || ''}',\n    color: '${bannerColor}',\n    gdpr: ${gdprEnabled},\n    ccpa: ${ccpaEnabled},\n    categories: [${categories.map(c => `'${c.name.toLowerCase()}'`).join(", ")}]\n  });\n</script>`)
              }}>
                <Code className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Banner Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {bannerEnabled ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                )}
                <span className={bannerEnabled ? "text-green-700" : "text-orange-700"}>
                  {bannerEnabled ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Last updated: {banner?.updated_at ? new Date(banner.updated_at).toLocaleString() : "-"}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
