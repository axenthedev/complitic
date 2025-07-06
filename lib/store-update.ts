export async function updateShopifyPolicy(
  store: { store_url: string; access_token: string },
  page_id: string,
  newText: string
) {
  const url = `https://${store.store_url}/admin/api/2023-01/pages/${page_id}.json`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "X-Shopify-Access-Token": store.access_token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: {
        id: page_id,
        body_html: newText,
      },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error("Shopify update error: " + err);
  }
  return await res.json();
}

export async function updateWooPolicy(
  store: { store_url: string; api_key: string; api_secret: string },
  page_id: string,
  newText: string
) {
  const url = `${store.store_url.replace(/\/$/, '')}/wp-json/wp/v2/pages/${page_id}`;
  const auth = Buffer.from(`${store.api_key}:${store.api_secret}`).toString("base64");
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: newText,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error("WooCommerce update error: " + err);
  }
  return await res.json();
} 