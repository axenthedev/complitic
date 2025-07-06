# 📤 Publish to Store Feature

This feature allows users to publish generated policy templates directly to their connected Shopify or WooCommerce stores.

## 🚀 Features

- **Modal UI**: Clean, intuitive interface for selecting store and destination
- **Multi-Platform Support**: Shopify and WooCommerce integration
- **Smart Page Management**: Updates existing pages or creates new ones
- **Destination Options**: Multiple page placement options per platform
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Toast Notifications**: Success/failure feedback via toast notifications

## 📁 File Structure

```
├── components/
│   └── publish-modal.tsx          # Main publish modal component
├── lib/
│   ├── publishToShopify.ts        # Shopify API integration
│   └── publishToWoo.ts            # WooCommerce API integration
├── app/api/
│   ├── stores/connected/route.ts  # Fetch connected stores
│   └── publish/policy/route.ts    # Main publish endpoint
├── app/dashboard/templates/[slug]/
│   └── page.tsx                   # Updated template page with publish button
└── database-schema.sql            # Required database tables
```

## 🗄️ Database Schema

### Required Tables

1. **generated_policies** - Stores published policies
2. **shopify_stores** - Connected Shopify store credentials
3. **woocommerce_stores** - Connected WooCommerce store credentials

Run the SQL in `database-schema.sql` to create all required tables with RLS policies.

## 🔧 API Endpoints

### GET `/api/stores/connected`
Fetches all connected stores for the authenticated user.

**Response:**
```json
{
  "stores": [
    {
      "id": "uuid",
      "store_url": "https://store.myshopify.com",
      "store_type": "shopify",
      "connected_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1
}
```

### POST `/api/publish/policy`
Publishes a policy to a connected store.

**Request Body:**
```json
{
  "store_id": "uuid",
  "store_type": "shopify",
  "page_destination": "online_store",
  "custom_url": "/privacy-policy",
  "policy_title": "Privacy Policy",
  "policy_content": "Policy content..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Policy published successfully",
  "data": {
    "pageId": 123,
    "url": "https://store.myshopify.com/pages/privacy-policy",
    "storeUrl": "https://store.myshopify.com",
    "storeType": "shopify"
  }
}
```

## 🛍️ Shopify Integration

### API Endpoints Used
- `GET /admin/api/2023-01/pages.json` - Check existing pages
- `POST /admin/api/2023-01/pages.json` - Create new page
- `PUT /admin/api/2023-01/pages/{id}.json` - Update existing page

### Page Destinations
- `online_store` - Online store page
- `help_center` - Help center page
- `footer` - Footer navigation (requires theme customization)
- `legal_menu` - Legal menu (requires theme customization)
- `custom` - Custom URL path

## 🛒 WooCommerce Integration

### API Endpoints Used
- `GET /wp-json/wp/v2/pages` - Check existing pages
- `POST /wp-json/wp/v2/pages` - Create new page
- `PUT /wp-json/wp/v2/pages/{id}` - Update existing page

### Authentication
Uses Basic Auth with consumer key and secret.

### Page Destinations
- `pages` - WordPress pages
- `legal_pages` - Legal pages section
- `footer` - Footer navigation (requires theme customization)
- `legal_menu` - Legal menu (requires theme customization)
- `custom` - Custom URL path

## 🎨 UI Components

### PublishModal Component
- **Store Selection**: Dropdown with connected stores
- **Destination Selection**: Platform-specific destination options
- **Custom URL Input**: For custom page destinations
- **Preview**: Shows selected store and destination
- **Loading States**: Spinner during API calls
- **Error Handling**: Displays errors with retry options

### Integration Points
- Added to template preview page
- Triggered by "📤 Publish to Store" button
- Modal opens with policy content and title
- Success/failure feedback via toast notifications

## 🔐 Security Features

- **Clerk Authentication**: All endpoints require valid user session
- **Row Level Security**: Database tables protected with RLS policies
- **User Isolation**: Users can only access their own stores and policies
- **Credential Protection**: Store credentials stored securely in Supabase

## 🚀 Usage Flow

1. **Generate Policy**: User fills form and generates policy content
2. **Preview**: User reviews generated content in preview tab
3. **Publish**: User clicks "📤 Publish to Store" button
4. **Select Store**: Modal opens, user selects connected store
5. **Choose Destination**: User selects page destination
6. **Confirm**: User confirms and policy is published
7. **Feedback**: Success/failure message displayed

## 🛠️ Environment Variables

Ensure these environment variables are set:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_BASE_URL=your_app_url
```

## 🔧 Customization

### Adding New Platforms
1. Create new utility file (e.g., `publishToMagento.ts`)
2. Add platform to store types in database schema
3. Update publish API route to handle new platform
4. Add platform-specific destination options

### Theme Customization
For footer/legal menu integration:
- Shopify: Use theme customization or navigation API
- WooCommerce: Use WordPress navigation API or theme hooks

## 🐛 Troubleshooting

### Common Issues

1. **"No stores connected"**
   - User needs to connect a store first
   - Check store connection flow

2. **"Failed to publish policy"**
   - Check store credentials validity
   - Verify API permissions
   - Check network connectivity

3. **"Store not found"**
   - Verify store exists in database
   - Check user ownership

### Debug Steps
1. Check browser console for errors
2. Verify API responses in Network tab
3. Check Supabase logs for database errors
4. Validate store credentials manually

## 📝 Future Enhancements

- [ ] Bulk publish multiple policies
- [ ] Scheduled publishing
- [ ] Policy versioning
- [ ] Draft/publish workflow
- [ ] Policy templates per store
- [ ] Analytics and tracking
- [ ] Email notifications
- [ ] Policy compliance checking 