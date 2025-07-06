# Recently Customized Templates Feature

## Overview

The "Recently Customized Templates" feature allows users to save and manage their customized policy templates directly on the templates page. Instead of saving templates to the dashboard, users now save copies that are displayed in a dedicated section on the templates page.

## Features

### 1. Recently Customized Templates Section
- **Location**: Displayed at the top of the templates page (`/dashboard/templates`)
- **Content**: Shows the 10 most recently customized templates
- **Information Displayed**:
  - Template name and type
  - Store name and URL from form data
  - Creation date and time
  - Download and Edit buttons

### 2. Save Copy Functionality
- **Button Text**: Changed from "Save to Dashboard" to "Save Copy"
- **Behavior**: Saves a copy of the customized template to the user's account
- **Storage**: Templates are stored in the `policy_documents` table in Supabase
- **Authentication**: Uses Clerk authentication for user identification

### 3. Template Management
- **Download**: Users can download their customized templates as text files
- **Edit**: Users can navigate back to the template editor to make modifications
- **Organization**: Templates are sorted by creation date (newest first)

## File Structure

```
app/
├── api/
│   ├── templates/
│   │   ├── save/route.ts          # Save customized templates
│   │   └── customized/route.ts    # Fetch user's customized templates
│   └── ...
├── dashboard/
│   └── templates/
│       ├── page.tsx               # Main templates page with customized section
│       └── [slug]/page.tsx        # Individual template page with save copy
└── ...

lib/
├── templates/
│   └── policies.ts                # Template definitions and utilities
└── ...

database-schema-update.sql         # Database schema for policy_documents table
```

## API Endpoints

### 1. Save Customized Template
- **Endpoint**: `POST /api/templates/save`
- **Authentication**: Clerk authentication required
- **Request Body**:
  ```json
  {
    "template_slug": "privacy_policy",
    "template_name": "Privacy Policy",
    "content": "Generated policy content...",
    "form_data": {
      "store_name": "My Store",
      "store_url": "https://mystore.com",
      "contact_email": "contact@mystore.com",
      // ... other form fields
    }
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "document_id": "uuid",
    "message": "Document saved successfully"
  }
  ```

### 2. Fetch Customized Templates
- **Endpoint**: `GET /api/templates/customized`
- **Authentication**: Clerk authentication required
- **Response**:
  ```json
  {
    "customizedTemplates": [
      {
        "id": "uuid",
        "template_slug": "privacy_policy",
        "template_name": "Privacy Policy",
        "content": "Generated content...",
        "form_data": { /* form data */ },
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T00:00:00Z"
      }
    ]
  }
  ```

## Database Schema

### policy_documents Table
```sql
CREATE TABLE policy_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  template_slug TEXT NOT NULL,
  template_name TEXT NOT NULL,
  content TEXT NOT NULL,
  form_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes**:
- `idx_policy_documents_user_id` - For user-specific queries
- `idx_policy_documents_created_at` - For sorting by creation date
- `idx_policy_documents_template_slug` - For template type filtering

**Security**:
- Row Level Security (RLS) enabled
- Users can only access their own documents
- Automatic timestamp updates via triggers

## User Interface

### Templates Page Layout
1. **Header**: Page title and description
2. **Recently Customized Templates Section**: 
   - Clock icon with "Recently Customized Templates" heading
   - Grid of customized template cards
   - Each card shows template info and action buttons
3. **Search and Filter**: Template search and category filtering
4. **Available Templates Grid**: All available policy templates
5. **Help Section**: Information about template categories

### Customized Template Cards
Each card displays:
- **Badge**: Template type (e.g., "Privacy Policy")
- **Timestamp**: Creation date and time
- **Title**: Store name from form data
- **Description**: Store URL from form data
- **Actions**: Download and Edit buttons

### Individual Template Page
- **Save Copy Button**: Replaces "Save to Dashboard" button
- **Success Message**: "Document copy saved successfully!"
- **Preview Tab**: Shows generated content with action buttons

## Usage Flow

1. **User navigates to templates page**
   - Recently customized templates are displayed at the top
   - Available templates are shown below

2. **User selects a template**
   - Clicks "Use Template" on any template card
   - Navigates to individual template page

3. **User fills out the form**
   - Enters required store information
   - Clicks "Generate Document"

4. **User saves a copy**
   - Clicks "Save Copy" button in preview tab
   - Template is saved to their account
   - Success message is displayed

5. **User returns to templates page**
   - Saved template appears in "Recently Customized Templates" section
   - Can download or edit the saved template

## Security Features

- **Authentication**: All API endpoints require Clerk authentication
- **Authorization**: Users can only access their own customized templates
- **Data Validation**: Required fields are validated before saving
- **SQL Injection Protection**: Uses parameterized queries via Supabase
- **Row Level Security**: Database-level access control

## Environment Variables

Ensure these environment variables are set:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Setup Instructions

1. **Database Setup**:
   ```bash
   # Run the database schema update
   psql -d your_database -f database-schema-update.sql
   ```

2. **Environment Variables**:
   - Ensure Supabase and Clerk environment variables are configured

3. **Testing**:
   - Create a customized template
   - Verify it appears in the "Recently Customized Templates" section
   - Test download and edit functionality

## Customization

### Styling
- Customize the card layout in `app/dashboard/templates/page.tsx`
- Modify the grid layout and spacing
- Update colors and icons as needed

### Functionality
- Add template deletion capability
- Implement template sharing between team members
- Add template versioning
- Include template search within customized templates

### Database
- Add additional fields to track template versions
- Implement soft delete for templates
- Add template categories or tags

## Troubleshooting

### Common Issues

1. **Templates not appearing**:
   - Check authentication is working
   - Verify database connection
   - Ensure RLS policies are correct

2. **Save failures**:
   - Check required fields are filled
   - Verify API endpoint is accessible
   - Check browser console for errors

3. **Download issues**:
   - Ensure content is generated before download
   - Check browser download settings
   - Verify file naming is correct

### Debug Steps

1. **Check API responses**:
   ```javascript
   // In browser console
   fetch('/api/templates/customized').then(r => r.json()).then(console.log)
   ```

2. **Verify database records**:
   ```sql
   SELECT * FROM policy_documents WHERE user_id = 'your_user_id';
   ```

3. **Check authentication**:
   ```javascript
   // Verify Clerk user ID
   console.log('User ID:', await auth().userId);
   ```

## Future Enhancements

- Template versioning and history
- Template sharing and collaboration
- Advanced search and filtering
- Template analytics and usage tracking
- Bulk operations (download all, delete multiple)
- Template export to different formats (PDF, DOCX) 