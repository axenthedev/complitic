interface ShopifyPage {
  id: number;
  title: string;
  body_html: string;
  handle: string;
}

interface ShopifyPageResponse {
  page: ShopifyPage;
}

interface ShopifyPagesResponse {
  pages: ShopifyPage[];
}

export async function publishToShopify(
  storeUrl: string,
  accessToken: string,
  pageTitle: string,
  pageContent: string,
  pageDestination: string,
  customUrl?: string
): Promise<{ success: boolean; pageId?: number; url?: string; error?: string }> {
  try {
    // Clean the store URL
    const cleanStoreUrl = storeUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const apiUrl = `https://${cleanStoreUrl}/admin/api/2023-01`;

    // Convert plain text content to HTML
    const htmlContent = convertTextToHtml(pageContent);

    // Check if a page with the same title already exists
    const existingPagesResponse = await fetch(`${apiUrl}/pages.json?title=${encodeURIComponent(pageTitle)}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!existingPagesResponse.ok) {
      throw new Error(`Failed to check existing pages: ${existingPagesResponse.statusText}`);
    }

    const existingPagesData: ShopifyPagesResponse = await existingPagesResponse.json();
    const existingPage = existingPagesData.pages.find(page => 
      page.title.toLowerCase() === pageTitle.toLowerCase()
    );

    let pageId: number;
    let pageUrl: string;

    if (existingPage) {
      // Update existing page
      const updateResponse = await fetch(`${apiUrl}/pages/${existingPage.id}.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: {
            title: pageTitle,
            body_html: htmlContent,
            handle: customUrl ? customUrl.replace(/^\//, '') : existingPage.handle,
          }
        }),
      });

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`Failed to update page: ${updateResponse.statusText} - ${errorText}`);
      }

      const updateData: ShopifyPageResponse = await updateResponse.json();
      pageId = updateData.page.id;
      pageUrl = `https://${cleanStoreUrl}/pages/${updateData.page.handle}`;
    } else {
      // Create new page
      const createResponse = await fetch(`${apiUrl}/pages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: {
            title: pageTitle,
            body_html: htmlContent,
            handle: customUrl ? customUrl.replace(/^\//, '') : generateHandle(pageTitle),
            published: true,
          }
        }),
      });

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        throw new Error(`Failed to create page: ${createResponse.statusText} - ${errorText}`);
      }

      const createData: ShopifyPageResponse = await createResponse.json();
      pageId = createData.page.id;
      pageUrl = `https://${cleanStoreUrl}/pages/${createData.page.handle}`;
    }

    // Handle different page destinations
    switch (pageDestination) {
      case 'footer':
        // Add to footer navigation (this would require theme customization)
        await addToFooterNavigation(apiUrl, accessToken, pageTitle, pageUrl);
        break;
      case 'legal_menu':
        // Add to legal menu (this would require theme customization)
        await addToLegalMenu(apiUrl, accessToken, pageTitle, pageUrl);
        break;
      case 'help_center':
        // Add to help center (if using Shopify's help center feature)
        await addToHelpCenter(apiUrl, accessToken, pageTitle, pageUrl);
        break;
      case 'online_store':
      case 'custom':
      default:
        // Page is already created and accessible via URL
        break;
    }

    return {
      success: true,
      pageId,
      url: pageUrl,
    };

  } catch (error) {
    console.error('Shopify publish error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

function convertTextToHtml(text: string): string {
  // Convert plain text to basic HTML
  return text
    .split('\n\n')
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('\n');
}

function generateHandle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function addToFooterNavigation(apiUrl: string, accessToken: string, pageTitle: string, pageUrl: string): Promise<void> {
  // This would require theme customization or using Shopify's navigation API
  // For now, we'll just log that this would need to be implemented
  console.log(`Would add ${pageTitle} to footer navigation at ${pageUrl}`);
}

async function addToLegalMenu(apiUrl: string, accessToken: string, pageTitle: string, pageUrl: string): Promise<void> {
  // This would require theme customization or using Shopify's navigation API
  // For now, we'll just log that this would need to be implemented
  console.log(`Would add ${pageTitle} to legal menu at ${pageUrl}`);
}

async function addToHelpCenter(apiUrl: string, accessToken: string, pageTitle: string, pageUrl: string): Promise<void> {
  // This would require Shopify's help center API if available
  // For now, we'll just log that this would need to be implemented
  console.log(`Would add ${pageTitle} to help center at ${pageUrl}`);
} 