import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database query
    // This is a placeholder for backend integration
    if (email === 'admin@marakbi.com' && password === 'password') {
      // Mock user data
      const user = {
        id: '1',
        email: email,
        fullName: 'Admin User',
        role: 'admin',
      };

      const tokens = {
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
      };

      const response = NextResponse.json({
        success: true,
        data: { user, tokens },
        message: 'Login successful'
      });

      // Set cookies for authentication
      response.cookies.set('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 // 24 hours
      });

      response.cookies.set('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
