"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Animation utility class
const cardAnim =
  "transition-all duration-500 ease-out opacity-0 translate-y-4 animate-fadein";

export default function StoreConnections({ connections: initialConnections }: { connections: any[] }) {
  const [connections, setConnections] = useState(initialConnections);
  const [shopifyShop, setShopifyShop] = useState("");
  const [wooUrl, setWooUrl] = useState("");
  const [wooKey, setWooKey] = useState("");
  const [wooSecret, setWooSecret] = useState("");
  const [wooLoading, setWooLoading] = useState(false);
  const [wooError, setWooError] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Remove connection
  async function removeConnection(id: string) {
    setRemovingId(id);
    await fetch("/api/store-connections", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setConnections(connections.filter((c) => c.id !== id));
    setRemovingId(null);
  }

  // Shopify connect
  function connectShopify() {
    if (!shopifyShop) return;
    // Redirect to Shopify OAuth start
    window.location.href = `/api/shopify/start?shop=${encodeURIComponent(shopifyShop)}`;
  }

  // WooCommerce connect
  async function connectWoo(e: React.FormEvent) {
    e.preventDefault();
    setWooLoading(true);
    setWooError("");
    const res = await fetch("/api/woocommerce/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ store_url: wooUrl, api_key: wooKey, api_secret: wooSecret }),
    });
    const data = await res.json();
    if (res.ok) {
      // Refetch connections
      const connRes = await fetch("/api/store-connections");
      const connData = await connRes.json();
      setConnections(connData.connections || []);
      setWooUrl("");
      setWooKey("");
      setWooSecret("");
    } else {
      setWooError(data.error || "Failed to connect WooCommerce");
    }
    setWooLoading(false);
  }

  return (
    <div className="space-y-8">
      {/* Connections List */}
      <Card className="animate-fadein shadow-md">
        <CardHeader>
          <CardTitle>Connected Stores</CardTitle>
        </CardHeader>
        <CardContent>
          {connections.length === 0 && <div className="text-gray-500">No stores connected.</div>}
          <div className="space-y-4">
            {connections.map((conn, idx) => (
              <div
                key={conn.id}
                className={`flex items-center justify-between border rounded px-4 py-3 bg-white/80 shadow-sm transition-all duration-500 ease-out opacity-0 translate-y-4 animate-fadein`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div>
                  <div className="font-medium text-base">{conn.store_name || conn.store_url}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{conn.store_type}</Badge>
                    <Badge variant={conn.status === 'connected' ? 'default' : 'destructive'}>{conn.status}</Badge>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{conn.store_url}</div>
                </div>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                  disabled={removingId === conn.id}
                  onClick={() => removeConnection(conn.id)}
                >
                  {removingId === conn.id ? "Removing..." : "Remove"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connect Shopify */}
      <Card className="animate-fadein shadow-md">
        <CardHeader>
          <CardTitle>Connect Shopify Store</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              connectShopify();
            }}
            className="flex flex-col gap-3"
          >
            <label className="text-sm font-medium">Shopify Store Domain</label>
            <Input
              placeholder="your-store.myshopify.com"
              value={shopifyShop}
              onChange={(e) => setShopifyShop(
                e.target.value
                  .replace(/^(https?:\/\/)?(www\.)?/, '')
                  .replace(/\/$/, '')
              )}
              className="w-full max-w-md"
              required
            />
            <Button
              type="submit"
              disabled={!shopifyShop}
              className="w-fit mt-2 bg-green-600 hover:bg-green-700 text-white"
            >
              Connect Shopify
            </Button>
            <div className="text-xs text-gray-500 mt-1">
              Enter only your Shopify store domain, e.g. <b>aquariumcoop.com</b> or <b>mystore.myshopify.com</b>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Connect WooCommerce */}
      <Card className="animate-fadein shadow-md">
        <CardHeader>
          <CardTitle>Connect WooCommerce Store</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3" onSubmit={connectWoo}>
            <label className="text-sm font-medium">Store URL</label>
            <Input
              placeholder="https://example.com"
              value={wooUrl}
              onChange={(e) => setWooUrl(e.target.value)}
              className="w-full max-w-md"
              required
            />
            <label className="text-sm font-medium">API Key</label>
            <Input
              placeholder="API Key"
              value={wooKey}
              onChange={(e) => setWooKey(e.target.value)}
              className="w-full max-w-md"
              required
            />
            <label className="text-sm font-medium">API Secret</label>
            <Input
              placeholder="API Secret"
              value={wooSecret}
              onChange={(e) => setWooSecret(e.target.value)}
              className="w-full max-w-md"
              required
            />
            <Button
              type="submit"
              disabled={wooLoading}
              className="w-fit mt-2 bg-purple-600 hover:bg-purple-700 text-white"
            >
              {wooLoading ? "Connecting..." : "Connect WooCommerce"}
            </Button>
            {wooError && <div className="text-red-500 text-xs mt-1">{wooError}</div>}
            <div className="text-xs text-gray-500 mt-1">Enter your WooCommerce store URL, API key, and secret.</div>
          </form>
        </CardContent>
      </Card>

      {/* Coming Soon Section */}
      <Card className="animate-fadein shadow-md">
        <CardHeader>
          <CardTitle>More Stores Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-gray-200 text-gray-700">Wix</Badge>
              <span className="text-gray-500">Integration coming soon</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gray-200 text-gray-700">BigCommerce</Badge>
              <span className="text-gray-500">Integration coming soon</span>
            </div>
            {/* Add more as needed */}
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein {
          opacity: 1 !important;
          transform: none !important;
          animation: fadein 0.7s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </div>
  );
} 