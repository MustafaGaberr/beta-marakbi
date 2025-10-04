import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Session cleared successfully'
  });

  // Clear all possible cookies
  const cookiesToClear = ['accessToken', 'refreshToken', 'sessionId', 'authToken'];
  
  cookiesToClear.forEach(cookieName => {
    // Set empty value with past expiration
    response.cookies.set(cookieName, '', {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    
    // Delete the cookie
    response.cookies.delete({
      name: cookieName,
      path: '/'
    });
  });

  return response;
}
