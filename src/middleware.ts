import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Auth pages that don't require authentication
const authPages = ['/login', '/signup', '/verify-code', '/forgot-password', '/set-password', '/quick-logout', '/test-auth'];

// Always allow access to these debugging pages
const debugPages = ['/test-auth', '/quick-logout'];

// Pages that require authentication
const protectedPages = ['/dashboard', '/profile', '/bookings', '/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get authentication token from cookies or headers
  const token = request.cookies.get('accessToken')?.value || 
                request.headers.get('Authorization')?.replace('Bearer ', '');
  
  const isAuthPage = authPages.some(page => pathname.startsWith(page));
  const isProtectedPage = protectedPages.some(page => pathname.startsWith(page));

  // Special handling for debug pages - always allow access regardless of auth status
  if (debugPages.some(page => pathname.startsWith(page))) {
    return NextResponse.next();
  }

  // For forgot-password, set-password, verify-code - allow access even if logged in
  // (users might want to reset password or verify email)
  if (pathname.startsWith('/forgot-password') || 
      pathname.startsWith('/set-password') || 
      pathname.startsWith('/verify-code')) {
    return NextResponse.next();
  }

  // If user is on auth page (login/signup) and logged in, redirect to dashboard
  if ((pathname.startsWith('/login') || pathname.startsWith('/signup')) && token) {
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
