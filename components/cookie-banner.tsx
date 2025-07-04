"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import supabase from "@/lib/supabase/browser";

export default function CookieBanner({ userId, storeId }: { userId: string; storeId?: string }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [choices, setChoices] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Check if consent already given
  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setOpen(true);
  }, []);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const { data, error } = await supabase
        .from("cookie_categories")
        .select("name, required, enabled")
        .eq("user_id", userId)
        .eq("enabled", true);
      if (!error && data) {
        setCategories(data);
        // Set initial choices: required always true, others default to true
        const initial: Record<string, boolean> = {};
        data.forEach((cat: any) => {
          initial[cat.name] = cat.required ? true : true;
        });
        setChoices(initial);
      }
      setLoading(false);
    }
    if (userId) fetchCategories();
  }, [userId]);

  if (!open || loading) return null;

  function handleToggle(name: string, value: boolean) {
    setChoices((prev) => ({ ...prev, [name]: value }));
  }

  function handleAcceptAll() {
    const all: Record<string, boolean> = {};
    categories.forEach((cat) => {
      all[cat.name] = true;
    });
    setChoices(all);
    handleSave(all);
  }

  function handleRejectAll() {
    const all: Record<string, boolean> = {};
    categories.forEach((cat) => {
      all[cat.name] = cat.required ? true : false;
    });
    setChoices(all);
    handleSave(all);
  }

  async function handleSave(customChoices?: Record<string, boolean>) {
    setSaving(true);
    const toSave = customChoices || choices;
    // Save to localStorage
    localStorage.setItem("cookie_consent", JSON.stringify(toSave));
    // Save to Supabase if userId exists
    if (userId) {
      await fetch("/api/cookie-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          store_id: storeId,
          categories: toSave,
        }),
      });
    }
    setSaving(false);
    setOpen(false);
  }

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-slate-200 shadow-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1">
        <div className="font-medium mb-2">We use cookies to enhance your experience. Manage your preferences below.</div>
        <div className="flex flex-col gap-2 mb-2">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2">
              <Switch
                checked={choices[cat.name]}
                onCheckedChange={(v) => handleToggle(cat.name, v)}
                disabled={cat.required || saving}
              />
              <span className="font-medium">{cat.name}</span>
              {cat.required && <span className="text-xs text-slate-500">(Required)</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 min-w-[180px]">
        <Button onClick={handleAcceptAll} disabled={saving} className="w-full">Accept All</Button>
        <Button onClick={handleRejectAll} disabled={saving} variant="outline" className="w-full">Reject All</Button>
        <Button onClick={() => handleSave()} disabled={saving} variant="secondary" className="w-full">Save Preferences</Button>
      </div>
    </div>
  );
} 