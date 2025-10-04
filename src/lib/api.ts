// API utilities for Marakbi authentication

const API_BASE_URL = typeof window !== 'undefined' ? '/api' : 'http://localhost:3000/api';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'boat_owner' | 'admin';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Something went wrong',
      };
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// Authentication API functions
export const authApi = {
  // Login user
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: AuthUser; tokens: AuthTokens }>> {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Register new user
  async signup(userData: SignUpData): Promise<ApiResponse<{ message: string }>> {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Verify email code
  async verifyCode(code: string): Promise<ApiResponse<{ message: string }>> {
    return apiRequest('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },

  // Resend verification code
  async resendCode(): Promise<ApiResponse<{ message: string }>> {
    return apiRequest('/auth/resend-code', {
      method: 'POST',
    });
  },

  // Forgot password
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Reset password
  async resetPassword(password: string, confirmPassword: string): Promise<ApiResponse<{ message: string }>> {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ password, confirmPassword }),
    });
  },

  // Refresh tokens
  async refreshTokens(): Promise<ApiResponse<AuthTokens>> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    return apiRequest('/auth/refresh', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  },

  // Logout
  async logout(): Promise<ApiResponse<{ message: string }>> {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },
};

// Storage utilities
export const storage = {
  setTokens(tokens: AuthTokens) {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  },

  getTokens(): AuthTokens | null {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!accessToken || !refreshToken) {
      return null;
    }

    return { accessToken, refreshToken };
  },

  clearTokens() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  setUser(user: AuthUser) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  getUser(): AuthUser | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  clearUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },

  clearAll() {
    this.clearTokens();
    this.clearUser();
  }
};

// Debug mode - simulate API responses when backend is not ready
export const SIMULATION_MODE = false;

// Mock API responses for development
export const mockApi = {
  ...authApi,
  
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: AuthUser; tokens: AuthTokens }>> {
    if (!SIMULATION_MODE) return authApi.login(credentials);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: {
        user: {
          id: '1',
          email: credentials.email,
          fullName: 'User Name',
          role: 'user' as const,
        },
        tokens: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        }
      },
      message: 'Login successful'
    };
  },

  async signup(userData: SignUpData): Promise<ApiResponse<{ message: string }>> {
    if (!SIMULATION_MODE) return authApi.signup(userData);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Registration successful. Please verify your email.'
    };
  },

  async verifyCode(code: string): Promise<ApiResponse<{ message: string }>> {
    if (!SIMULATION_MODE) return authApi.verifyCode(code);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (code.length < 4) {
      return {
        success: false,
        error: 'Invalid verification code'
      };
    }
    
    return {
      success: true,
      message: 'Email verified successfully'
    };
  },

  async resendCode(): Promise<ApiResponse<{ message: string }>> {
    if (!SIMULATION_MODE) return authApi.resendCode();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Verification code sent successfully'
    };
  },

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    if (!SIMULATION_MODE) return authApi.forgotPassword(email);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Password reset code has been sent to your email'
    };
  },

  async resetPassword(password: string, confirmPassword: string): Promise<ApiResponse<{ message: string }>> {
    if (!SIMULATION_MODE) return authApi.resetPassword(password, confirmPassword);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password !== confirmPassword) {
      return {
        success: false,
        error: 'Passwords do not match'
      };
    }
    
    return {
      success: true,
      message: 'Password reset successfully'
    };
  }
};
