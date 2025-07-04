"use client"

import { useUser } from "@clerk/nextjs";

export default function ApiTrackingScriptPage() {
  const { user, isLoaded } = useUser();
  const userId = user?.id || "YOUR_USER_ID";

  const script = `
<script>
  window.__ANALYTICS_USER_ID = "${userId}";
  (function() {
    fetch("https://your-api.com/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page_path: window.location.pathname,
        referrer: document.referrer,
        country: "", // Optionally set server-side
        session_id: localStorage.getItem("session_id") || (function() {
          const id = Math.random().toString(36).substr(2, 9);
          localStorage.setItem("session_id", id);
          return id;
        })(),
        event_type: "page_view",
        occurred_at: new Date().toISOString(),
        user_id: "${userId}"
      })
    });
  })();
</script>
  `.trim();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Analytics Tracking Script</h1>
      <p className="mb-2">Copy and paste this script into the <code>&lt;head&gt;</code> or just before <code>&lt;/body&gt;</code> of your website's HTML:</p>
      <textarea
        value={script}
        readOnly
        rows={14}
        className="w-full font-mono p-2 border rounded bg-slate-50 text-slate-800 mb-4"
      />
      <p className="text-sm text-slate-600">This script will send page view events to your analytics dashboard in real time.</p>
    </div>
  );
} 