interface WooCommercePage {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  link: string;
  status: string;
}

interface WooCommercePageResponse {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  link: string;
  status: string;
}

export async function publishToWooCommerce(
  storeUrl: string,
  consumerKey: string,
  consumerSecret: string,
  pageTitle: string,
  pageContent: string,
  pageDestination: string,
  customUrl?: string
): Promise<{ success: boolean; pageId?: number; url?: string; error?: string }> {
  try {
    // Clean the store URL
    const cleanStoreUrl = storeUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const apiUrl = `https://${cleanStoreUrl}/wp-json/wp/v2`;

    // Convert plain text content to HTML
    const htmlContent = convertTextToHtml(pageContent);

    // Create Basic Auth header
    const credentials = btoa(`${consumerKey}:${consumerSecret}`);
    const headers = {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    };

    // Check if a page with the same title already exists
    const existingPagesResponse = await fetch(
      `${apiUrl}/pages?search=${encodeURIComponent(pageTitle)}&per_page=10`,
      { headers }
    );

    if (!existingPagesResponse.ok) {
      throw new Error(`Failed to check existing pages: ${existingPagesResponse.statusText}`);
    }

    const existingPages: WooCommercePage[] = await existingPagesResponse.json();
    const existingPage = existingPages.find(page => 
      page.title.rendered.toLowerCase() === pageTitle.toLowerCase()
    );

    let pageId: number;
    let pageUrl: string;

    if (existingPage) {
      // Update existing page
      const updateResponse = await fetch(`${apiUrl}/pages/${existingPage.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          title: pageTitle,
          content: htmlContent,
          slug: customUrl ? customUrl.replace(/^\//, '') : existingPage.slug,
          status: 'publish',
        }),
      });

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`Failed to update page: ${updateResponse.statusText} - ${errorText}`);
      }

      const updateData: WooCommercePageResponse = await updateResponse.json();
      pageId = updateData.id;
      pageUrl = updateData.link;
    } else {
      // Create new page
      const createResponse = await fetch(`${apiUrl}/pages`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: pageTitle,
          content: htmlContent,
          slug: customUrl ? customUrl.replace(/^\//, '') : generateSlug(pageTitle),
          status: 'publish',
        }),
      });

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        throw new Error(`Failed to create page: ${createResponse.statusText} - ${errorText}`);
      }

      const createData: WooCommercePageResponse = await createResponse.json();
      pageId = createData.id;
      pageUrl = createData.link;
    }

    // Handle different page destinations
    switch (pageDestination) {
      case 'footer':
        // Add to footer navigation (this would require theme customization)
        await addToFooterNavigation(apiUrl, headers, pageTitle, pageUrl);
        break;
      case 'legal_menu':
        // Add to legal menu (this would require theme customization)
        await addToLegalMenu(apiUrl, headers, pageTitle, pageUrl);
        break;
      case 'legal_pages':
        // Add to legal pages section (this would require theme customization)
        await addToLegalPagesSection(apiUrl, headers, pageTitle, pageUrl);
        break;
      case 'pages':
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
    console.error('WooCommerce publish error:', error);
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

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function addToFooterNavigation(apiUrl: string, headers: any, pageTitle: string, pageUrl: string): Promise<void> {
  // This would require theme customization or using WordPress navigation API
  // For now, we'll just log that this would need to be implemented
  console.log(`Would add ${pageTitle} to footer navigation at ${pageUrl}`);
}

async function addToLegalMenu(apiUrl: string, headers: any, pageTitle: string, pageUrl: string): Promise<void> {
  // This would require theme customization or using WordPress navigation API
  // For now, we'll just log that this would need to be implemented
  console.log(`Would add ${pageTitle} to legal menu at ${pageUrl}`);
}

async function addToLegalPagesSection(apiUrl: string, headers: any, pageTitle: string, pageUrl: string): Promise<void> {
  // This would require theme customization or using WordPress navigation API
  // For now, we'll just log that this would need to be implemented
  console.log(`Would add ${pageTitle} to legal pages section at ${pageUrl}`);
} 