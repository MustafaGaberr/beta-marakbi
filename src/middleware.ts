import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Auth pages that don't require authentication
const authPages = ['/login', '/signup', '/verify-code', '/forgot-password', '/set-password', '/quick-logout', '/test-auth'];

// Always allow access to these debugging pages
const debugPages = ['/test-auth', '/quick-logout', '/test-clicks', '/test-middleware'];

// For dummy data mode, allow access to profile without authentication
const dummyDataPages = ['/profile'];

// Pages that require authentication
const protectedPages = ['/dashboard', '/bookings', '/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get authentication token from cookies or headers
  const token = request.cookies.get('accessToken')?.value || 
                request.headers.get('Authorization')?.replace('Bearer ', '');
  
  // const isAuthPage = authPages.some(page => pathname.startsWith(page));
  const isProtectedPage = protectedPages.some(page => pathname.startsWith(page));

  // Special handling for debug pages - always allow access regardless of auth status
  if (debugPages.some(page => pathname.startsWith(page))) {
    return NextResponse.next();
  }

  // Special handling for dummy data pages - allow access without authentication
  if (dummyDataPages.some(page => pathname.startsWith(page))) {
    return NextResponse.next();
  }

  // If user is on auth page (login/signup) and logged in, redirect based on role
  if ((pathname.startsWith('/login') || pathname.startsWith('/signup')) && token) {
    // Try to get user info from localStorage via cookie or default to dashboard for admins
    const userCookie = request.cookies.get('userInfo')?.value;
    let redirectPath = '/dashboard'; // Default for admins/boat_owners
    
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        if (user.role === 'user') {
          redirectPath = '/'; // Regular users go to home
        }
      } catch (e) {
        // Default to dashboard if parsing fails
      }
    }
    
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // If logged in: block access to forgot/set-password/verify-code pages
  if ((pathname.startsWith('/forgot-password') || 
       pathname.startsWith('/set-password') || 
       pathname.startsWith('/verify-code')) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user tries to access protected page without auth, redirect to login
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
