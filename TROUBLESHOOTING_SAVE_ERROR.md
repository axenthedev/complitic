# Troubleshooting: "Failed to save document" Error

## Quick Diagnosis

The error "Failed to save document" can occur for several reasons. Here's how to diagnose and fix it:

## 1. Check Environment Variables

First, verify your environment variables are set correctly:

```bash
# Check if these are set in your .env.local file
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 2. Test Database Connection

Run the test script to verify database connectivity:

```bash
# Install dependencies if needed
npm install @supabase/supabase-js

# Run the test script
node test-database.js
```

This will check:
- Environment variables
- Database connection
- Table existence
- Insert operations

## 3. Common Issues and Solutions

### Issue: "relation 'policy_documents' does not exist"

**Solution**: Run the database schema
```bash
psql -d your_database -f database-schema-update.sql
```

### Issue: "Unauthorized" error

**Solution**: Check Clerk authentication
- Ensure you're logged in
- Verify Clerk environment variables are set
- Check browser console for auth errors

### Issue: "Missing required fields"

**Solution**: Verify form data
- Ensure all required fields are filled
- Check that `template_slug`, `template_name`, and `content` are present

### Issue: "Server configuration error"

**Solution**: Check environment variables
- Verify Supabase URL and service role key
- Restart your development server after changing .env files

## 4. Debug Steps

### Step 1: Check Browser Console
Open browser developer tools and look for:
- Network tab: Check the API request/response
- Console tab: Look for error messages

### Step 2: Check Server Logs
Look at your terminal where Next.js is running for:
- API route logs
- Database error messages
- Authentication errors

### Step 3: Test API Directly
Use curl or Postman to test the API:

```bash
curl -X POST http://localhost:3000/api/templates/save \
  -H "Content-Type: application/json" \
  -d '{
    "template_slug": "privacy_policy",
    "template_name": "Privacy Policy",
    "content": "Test content",
    "form_data": {"store_name": "Test Store"}
  }'
```

## 5. Database Schema Verification

Ensure the `policy_documents` table exists with correct structure:

```sql
-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'policy_documents'
);

-- Check table structure
\d policy_documents

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'policy_documents';
```

## 6. Environment Variables Checklist

Make sure these are set in your `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Clerk (if using)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

## 7. Development Server Restart

After making changes:
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## 8. Common Error Messages

| Error Message | Likely Cause | Solution |
|---------------|--------------|----------|
| "Unauthorized" | Not logged in or auth issue | Check Clerk authentication |
| "relation does not exist" | Missing database table | Run database schema |
| "Missing required fields" | Form validation failed | Fill all required fields |
| "Server configuration error" | Missing env vars | Check environment variables |
| "Database error: ..." | Supabase connection issue | Verify Supabase credentials |

## 9. Still Having Issues?

If the problem persists:

1. **Check the detailed error message** in the browser console
2. **Run the test script** to isolate the issue
3. **Verify database permissions** for your service role key
4. **Check Supabase dashboard** for any service issues
5. **Review the API logs** for specific error details

## 10. Quick Fix Checklist

- [ ] Environment variables set correctly
- [ ] Database schema applied
- [ ] User is authenticated
- [ ] All required form fields filled
- [ ] Development server restarted
- [ ] Browser console checked for errors
- [ ] Network tab shows API request/response 