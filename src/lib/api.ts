// ===== MARAKBI API SERVICE =====
// API integration for Marakbi boat rental platform
// Only Login and Register APIs

// ===== BASE CONFIGURATION =====
const BASE_URL = 'https://yasershaban.pythonanywhere.com';

// ===== TYPE DEFINITIONS =====

// Base API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Authentication Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user_id: number;
  username: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email?: string;
  role?: string;
}

// ===== API REQUEST HELPER =====
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.detail || data.message || `HTTP ${response.status}`,
        data: data,
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// ===== AUTHENTICATION APIs =====

// Login API
export const login = async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

// Register API
export const register = async (userData: RegisterData): Promise<ApiResponse<AuthResponse>> => {
  return apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// ===== CLIENT API (DUMMY DATA) =====
export const clientApi = {
  // Dummy data for cities
  getCities: async (): Promise<ApiResponse<{ cities: { id: number; name: string }[] }>> => {
    return Promise.resolve({
      success: true,
      data: {
        cities: [
          { id: 1, name: 'Aswan' },
          { id: 2, name: 'Luxor' },
          { id: 3, name: 'Cairo' },
          { id: 4, name: 'Alexandria' },
          { id: 5, name: 'Hurghada' },
          { id: 6, name: 'Sharm El Sheikh' }
        ]
      }
    });
  },

  // Dummy data for boats
  getBoats: async (): Promise<ApiResponse<{ boats: unknown[] }>> => {
    return Promise.resolve({
      success: true,
      data: {
        boats: [
          { id: 1, name: 'Traditional Felucca' },
          { id: 2, name: 'Luxury Yacht' },
          { id: 3, name: 'Speed Boat' },
          { id: 4, name: 'Fishing Boat' },
          { id: 5, name: 'Party Boat' },
          { id: 6, name: 'Family Boat' }
        ]
      }
    });
  },

  // Dummy data for home section
  getHomeSection: async (section: string, _page = 1, _perPage = 15): Promise<ApiResponse<{ message: string; data: unknown }>> => {
    return Promise.resolve({
      success: true,
      data: {
        message: 'Dummy data loaded',
        data: []
      }
    });
  }
};

// ===== AUTHENTICATION API =====
export const authApi = {
  login,
  register
};

// ===== STORAGE UTILITIES =====
export const storage = {
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
};

// ===== AUTHENTICATION UTILITIES =====
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('access_token');
  return !!token;
};

// ===== DIAGNOSTIC FUNCTIONS =====
export async function diagnoseConnection(): Promise<ApiResponse<{ status: string; message: string; details: unknown }>> {
  return Promise.resolve({
    success: true,
    data: {
      status: 'healthy',
      message: 'Dummy connection - no backend required',
      details: { mode: 'dummy_data' }
    }
  });
}

export async function testConnection(): Promise<ApiResponse<{ status: string; message: string; details: unknown }>> {
  return Promise.resolve({
    success: true,
    data: {
      status: 'connected',
      message: 'Dummy connection test successful',
      details: { mode: 'dummy_data' }
    }
  });
}