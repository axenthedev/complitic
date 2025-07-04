import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are public
const isPublicRoute = createRouteMatcher([
  '/',
  '/auth/signin(.*)',
  '/auth/signup(.*)',
  '/auth-callback(.*)',
  '/api/auth(.*)',
  '/api/auth-callback(.*)',
]);

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req) && !isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)', // Exclude static files and Next.js internals
    '/dashboard(.*)',         // Explicitly include dashboard
    '/auth(.*)',              // Include auth routes
    '/api(.*)',               // Optional: protect API routes if needed
  ],
};
