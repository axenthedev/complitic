# API Debug Guide: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON

## Problem Description

The error "Unexpected token '<', "<!DOCTYPE "... is not valid JSON" indicates that the API is returning an HTML page instead of JSON. This typically happens when:

1. **API route not found** - 404 error page
2. **Server error** - 500 error page  
3. **Authentication issue** - Login page redirect
4. **Development server issue** - Next.js error page

## Step-by-Step Debugging

### Step 1: Test API Connectivity

First, test if the API routes are accessible:

```bash
# Test the basic API endpoint
curl http://localhost:3000/api/templates/test

# Test the save endpoint with minimal data
curl -X POST http://localhost:3000/api/templates/save \
  -H "Content-Type: application/json" \
  -d '{"template_slug":"test","template_name":"Test","content":"test"}'
```

### Step 2: Check Browser Network Tab

1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Try to save a document
4. Look for the `/api/templates/save` request
5. Check:
   - **Status Code** (200, 404, 500, etc.)
   - **Response Headers** (Content-Type should be application/json)
   - **Response Body** (should be JSON, not HTML)

### Step 3: Check Server Logs

Look at your terminal where Next.js is running for:
- API route logs
- Error messages
- Authentication errors

### Step 4: Verify File Structure

Ensure the API route exists:
```
app/
├── api/
│   └── templates/
│       ├── save/
│       │   └── route.ts  ✅ Should exist
│       └── test/
│           └── route.ts  ✅ Should exist
```

### Step 5: Test Authentication

The API requires Clerk authentication. Check if you're logged in:

```javascript
// In browser console
fetch('/api/templates/test')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

## Common Solutions

### Solution 1: Restart Development Server

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### Solution 2: Check Environment Variables

Ensure these are set in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

### Solution 3: Verify Database Schema

Run the database schema if not done:
```bash
psql -d your_database -f database-schema-update.sql
```

### Solution 4: Check Clerk Authentication

Ensure Clerk is properly configured in your app:
1. Check if you're logged in
2. Verify Clerk environment variables
3. Check browser console for auth errors

## Debug Information

The updated code now provides detailed debugging information:

### Console Logs to Check:

1. **Request Data**: What's being sent to the API
2. **Response Status**: HTTP status code
3. **Response Headers**: Content-Type and other headers
4. **Response Body**: Actual response content
5. **API Test Result**: Connectivity test results

### Expected Console Output:

```javascript
// Successful request
Attempting to save document...
Request data: { template_slug: "privacy_policy", ... }
Response status: 200
Response headers: { "content-type": "application/json", ... }
Response data: { success: true, document_id: "...", ... }

// Failed request
Response status: 404
Non-JSON response received: <!DOCTYPE html>...
```

## Quick Fix Checklist

- [ ] Restart development server
- [ ] Check if logged in to Clerk
- [ ] Verify environment variables
- [ ] Check browser network tab
- [ ] Look at server console logs
- [ ] Test API connectivity with curl
- [ ] Verify database schema is applied

## Still Having Issues?

If the problem persists:

1. **Check the exact error message** in browser console
2. **Look at the Network tab** for the actual response
3. **Check server logs** for detailed error information
4. **Test with the test API** first: `/api/templates/test`
5. **Verify all environment variables** are set correctly

## Test Commands

```bash
# Test basic API
curl http://localhost:3000/api/templates/test

# Test with authentication (if logged in)
curl -X POST http://localhost:3000/api/templates/save \
  -H "Content-Type: application/json" \
  -d '{"template_slug":"test","template_name":"Test","content":"test"}'

# Check if server is running
curl http://localhost:3000/api/health
```

The enhanced error handling will now show you exactly what's happening with the API request! 