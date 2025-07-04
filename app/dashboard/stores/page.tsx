import React from 'react';
import StoreConnections from '../../../components/dashboard/store-connections';

export default async function StoresPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-red-600">
        <h1 className="text-2xl font-bold mb-6">Store Connections</h1>
        <div>
          <b>Error:</b> NEXT_PUBLIC_BASE_URL is not set. Please add it to your .env file (e.g., http://localhost:3000).
        </div>
      </div>
    );
  }
  const res = await fetch(`${baseUrl}/api/store-connections`, {
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  const connections = data.connections || [];

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Store Connections</h1>
      <StoreConnections connections={connections} />
    </div>
  );
}
