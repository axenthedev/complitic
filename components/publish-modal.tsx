"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, Store, Globe, FileText } from "lucide-react";
import { toast } from "sonner";

interface Store {
  id: string;
  store_url: string;
  store_type: 'shopify' | 'woocommerce';
  connected_at: string;
}

interface PublishModalProps {
  policyContent: string;
  policyTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PublishModal({ policyContent, policyTitle, isOpen, onClose }: PublishModalProps) {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>("");
  const [pageDestination, setPageDestination] = useState<string>("");
  const [customUrl, setCustomUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStores, setIsLoadingStores] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchConnectedStores();
    }
  }, [isOpen]);

  const fetchConnectedStores = async () => {
    try {
      setIsLoadingStores(true);
      const response = await fetch("/api/stores/connected");
      if (!response.ok) {
        throw new Error("Failed to fetch stores");
      }
      const data = await response.json();
      setStores(data.stores);
    } catch (error) {
      console.error("Error fetching stores:", error);
      toast.error("Failed to load connected stores");
    } finally {
      setIsLoadingStores(false);
    }
  };

  const handlePublish = async () => {
    if (!selectedStore || !pageDestination) {
      toast.error("Please select a store and destination");
      return;
    }

    setIsLoading(true);
    try {
      const store = stores.find(s => s.id === selectedStore);
      if (!store) {
        throw new Error("Selected store not found");
      }

      const response = await fetch("/api/publish/policy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          store_id: selectedStore,
          store_type: store.store_type,
          page_destination: pageDestination,
          custom_url: customUrl,
          policy_title: policyTitle,
          policy_content: policyContent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to publish policy");
      }

      const data = await response.json();
      toast.success(`Policy published successfully to ${store.store_url}`);
      onClose();
    } catch (error) {
      console.error("Error publishing policy:", error);
      toast.error(error instanceof Error ? error.message : "Failed to publish policy");
    } finally {
      setIsLoading(false);
    }
  };

  const getDestinationOptions = (storeType: 'shopify' | 'woocommerce') => {
    const commonOptions = [
      { value: "footer", label: "Footer Link" },
      { value: "legal_menu", label: "Legal Menu" },
      { value: "custom", label: "Custom Page" },
    ];

    if (storeType === 'shopify') {
      return [
        { value: "online_store", label: "Online Store Page" },
        { value: "help_center", label: "Help Center" },
        ...commonOptions,
      ];
    }

    if (storeType === 'woocommerce') {
      return [
        { value: "pages", label: "WordPress Pages" },
        { value: "legal_pages", label: "Legal Pages Section" },
        ...commonOptions,
      ];
    }

    return commonOptions;
  };

  const selectedStoreData = stores.find(s => s.id === selectedStore);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Publish to Store
          </DialogTitle>
          <DialogDescription>
            Select a connected store and destination to publish your {policyTitle.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Store Selection */}
          <div className="space-y-2">
            <Label htmlFor="store">Connected Store</Label>
            {isLoadingStores ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading connected stores...
              </div>
            ) : stores.length === 0 ? (
              <div className="text-center py-4 border rounded-lg">
                <Store className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">No stores connected</p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/dashboard/stores">Connect Store</a>
                </Button>
              </div>
            ) : (
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a store" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      <div className="flex items-center gap-2">
                        <Badge variant={store.store_type === 'shopify' ? 'default' : 'secondary'}>
                          {store.store_type}
                        </Badge>
                        <span>{store.store_url}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Page Destination */}
          {selectedStore && selectedStoreData && (
            <div className="space-y-2">
              <Label htmlFor="destination">Page Destination</Label>
              <Select value={pageDestination} onValueChange={setPageDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {getDestinationOptions(selectedStoreData.store_type).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Custom URL Input */}
          {pageDestination === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="custom_url">Custom URL Path</Label>
              <Input
                id="custom_url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="/privacy-policy"
                className="font-mono"
              />
              <p className="text-xs text-gray-500">
                Enter the URL path where you want to publish this policy (e.g., /privacy-policy)
              </p>
            </div>
          )}

          {/* Preview */}
          {selectedStore && selectedStoreData && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">{selectedStoreData.store_url}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {pageDestination === "custom" && customUrl
                      ? customUrl
                      : `${policyTitle} page`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handlePublish}
              disabled={!selectedStore || !pageDestination || isLoading || (pageDestination === "custom" && !customUrl)}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Publish
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 