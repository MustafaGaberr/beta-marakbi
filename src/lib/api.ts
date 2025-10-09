// ===== MARAKBI API SERVICE =====
// Comprehensive API integration for Marakbi boat rental platform
// Base URL: https://yasershaban.pythonanywhere.com

// ===== BASE CONFIGURATION =====
// Try with /api prefix - if 404, backend might need configuration
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

// Boat Types
export interface Boat {
  id: number;
  name: string;
  description: string;
  categories: string[];
  images: string[];
  price_per_hour: number;
  max_seats: number;
  max_seats_stay: number;
  total_reviews: number;
  user_id: number;
  created_at: string;
}

export interface BoatOwner {
  username: string;
  bio: string;
  phone: string;
  address: string;
  avatar_url: string | null;
  member_since: string;
}

export interface BoatReview {
  id: number;
  boat_id: number;
  user_id: number;
  username: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface BoatDetails {
  boat: Boat;
  owner: BoatOwner;
  reviews: BoatReview[];
  reviews_summary: {
    average_rating: number;
    total_reviews: number;
    star_breakdown: {
      '1_stars': number;
      '2_stars': number;
      '3_stars': number;
      '4_stars': number;
      '5_stars': number;
    };
  };
  reviews_pagination: {
    page: number;
    pages: number;
    per_page: number;
    total: number;
  };
}

// City Types
export interface City {
  id: number;
  name: string;
}

// Trip Types
export interface Trip {
  id: number;
  name: string;
  description: string;
  city_id: number;
  city_name: string;
  total_price: number;
  trip_type: string;
  voyage_hours: number;
  images: string[];
  guests_on_board: number | null;
  pax: number | null;
  rooms_available: number | null;
  created_at: string;
}

export interface TripBooking {
  boat_id: number;
  start_date: string;
  guest_count: number;
}

export interface BookingResponse {
  booking: {
    id: number;
    user_id: number;
    username: string;
    boat_id: number;
    boat_name: string;
    trip_id: number;
    trip_name: string;
    voyage_id: number | null;
    booking_type: string;
    start_date: string;
    end_date: string;
    guest_count: number;
    price_per_hour: number;
    status: string;
    created_at: string;
  };
  trip: Trip;
  total_price: number;
  duration_hours: number;
  message: string;
}

// Home Data Types
export interface HomeData {
  new_joiners: any[];
  fishing_trips: Trip[];
  water_games: Trip[];
  nile_cruises: Trip[];
  occasions: Trip[];
  trending_voyages: Trip[];
  upcoming_shares: any[];
  summary: {
    total_new_joiners: number;
    total_fishing_trips: number;
    total_water_games: number;
    total_nile_cruises: number;
    total_occasions: number;
    total_trending_voyages: number;
    total_upcoming_shares: number;
  };
}

// Profile Types
export interface CustomerProfile {
  bio: string;
  phone: string;
  address: string;
}

export interface ProfileResponse {
  user_id: number;
  username: string;
  email: string;
  bio?: string;
  phone?: string;
  address?: string;
}

// Voyage Types
export interface SharingVoyage {
  id: number;
  boat_id: number;
  boat: Boat;
  start_date: string;
  end_date: string;
  max_seats: number;
  current_seats_taken: number;
  available_seats: number;
  price_per_hour: number;
  voyage_type: string;
  status: string;
  users_in_voyage: Array<{
    user_id: number;
    username: string;
    guest_count: number;
  }>;
  created_at: string;
}

export interface VoyageJoinData {
  guest_count: number;
}

// Review Types
export interface ReviewData {
  rating: number;
  comment: string;
}

export interface ReviewResponse {
  message: string;
  review: BoatReview;
}

// Order Types
export interface OrderData {
  boat_id: number;
  start_date: string;
  end_date: string;
  guest_count: number;
  voyage_type: string;
}

// ===== TOKEN MANAGEMENT =====
export const storage = {
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  },

  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  },

  setRefreshToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refresh_token', token);
    }
  },

  setTokens: (tokens: { access_token: string; refresh_token: string }): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
    }
  },

  clearTokens: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  getUser: (): AuthUser | null => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  setUser: (user: AuthUser): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  clearUser: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },

  clearAll: (): void => {
    storage.clearTokens();
    storage.clearUser();
  }
};

// ===== HTTP CLIENT =====
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  
  // Add authorization header if token exists
  const token = storage.getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log(`📡 API Response: ${response.status} ${response.statusText}`);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Non-JSON response:', text);
      return {
        success: false,
        error: 'Server returned non-JSON response'
      };
    }

    const data = await response.json();
    console.log('📦 API Data:', data);

    if (!response.ok) {
      // Handle different error types
      if (response.status === 401) {
        // Token expired or invalid
        storage.clearAll();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return {
          success: false,
          error: 'Session expired. Please login again.'
        };
      }

      if (response.status === 403) {
    return {
          success: false,
          error: 'You do not have permission to perform this action.'
        };
      }

      if (response.status === 404) {
    return {
          success: false,
          error: 'The requested resource was not found.'
        };
      }

      if (response.status >= 500) {
      return {
        success: false,
          error: 'Server error. Please try again later.'
        };
      }

      return {
        success: false,
        error: data.message || data.error || `HTTP ${response.status}: ${response.statusText}`
      };
    }

    // Handle successful responses
    if (data.status === 'success' && data.data) {
    return {
      success: true,
        data: data.data
      };
    }

    // Handle direct data responses
    if (data) {
    return {
      success: true,
        data: data
      };
    }

    return {
      success: true,
      data: data
    };

  } catch (error) {
    console.error('🚨 API Error:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Network error. Please check your connection.'
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred.'
    };
  }
}

// ===== AUTHENTICATION API =====
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  register: async (data: RegisterData): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<{ message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  forgotPassword: async (email: string): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  resetPassword: async (token: string, password: string): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password })
    });
  },

  verifyCode: async (code: string): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<{ message: string }>('/auth/verify-code', {
      method: 'POST',
      body: JSON.stringify({ code })
    });
  },

  resendCode: async (): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<{ message: string }>('/auth/resend-code', {
      method: 'POST'
    });
  }
};

// ===== CLIENT API (Public Endpoints) =====
export const clientApi = {
  getHomeData: async (): Promise<ApiResponse<HomeData>> => {
    return apiRequest<HomeData>('/client/home');
  },

  getHomeSection: async (section: string, page = 1, perPage = 15): Promise<ApiResponse<{ message: string; data: any }>> => {
    return apiRequest<{ message: string; data: any }>(`/client/home/${section}?page=${page}&per_page=${perPage}`);
  },

  getBoats: async (page = 1, perPage = 10): Promise<ApiResponse<{ boats: Boat[]; page: number; pages: number; per_page: number; total: number }>> => {
    return apiRequest<{ boats: Boat[]; page: number; pages: number; per_page: number; total: number }>(`/client/boats?page=${page}&per_page=${perPage}`);
  },

  getBoatById: async (id: number): Promise<ApiResponse<BoatDetails>> => {
    return apiRequest<BoatDetails>(`/client/boats/${id}`);
  },

  getBoatsByCategory: async (categoryId: number): Promise<ApiResponse<{ boats: Boat[]; page: number; pages: number; per_page: number; total: number }>> => {
    return apiRequest<{ boats: Boat[]; page: number; pages: number; per_page: number; total: number }>(`/client/boats/category/${categoryId}`);
  },

  getBoatsByCategoryAndCity: async (categoryId: number, cityId: number): Promise<ApiResponse<{ boats: Boat[]; page: number; pages: number; per_page: number; total: number }>> => {
    return apiRequest<{ boats: Boat[]; page: number; pages: number; per_page: number; total: number }>(`/client/boats/category/${categoryId}/city/${cityId}`);
  },

  getCities: async (): Promise<ApiResponse<{ cities: City[] }>> => {
    return apiRequest<{ cities: City[] }>('/client/cities');
  },

  getCategoriesByCity: async (cityId: number): Promise<ApiResponse<{ id: number; name: string; description: string }[]>> => {
    return apiRequest<{ id: number; name: string; description: string }[]>(`/client/boats/categories/${cityId}`);
  },

  getBoatTrips: async (boatId: number): Promise<ApiResponse<{ boat_id: number; boat_name: string; trips: Trip[] }>> => {
    return apiRequest<{ boat_id: number; boat_name: string; trips: Trip[] }>(`/client/boats/${boatId}/trips`);
  },

  getTripsByCity: async (cityId: number): Promise<ApiResponse<{ city: City; trips: Trip[] }>> => {
    return apiRequest<{ city: City; trips: Trip[] }>(`/client/trips/city/${cityId}`);
  },

  getAllTrips: async (cityId?: number): Promise<ApiResponse<Trip[]>> => {
    const query = cityId ? `?city_id=${cityId}` : '';
    return apiRequest<Trip[]>(`/client/trips${query}`);
  },

  bookTrip: async (tripId: number, bookingData: TripBooking): Promise<ApiResponse<BookingResponse>> => {
    return apiRequest<BookingResponse>(`/client/trips/${tripId}/book`, {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  },

  createBoatReview: async (boatId: number, reviewData: ReviewData): Promise<ApiResponse<ReviewResponse>> => {
    return apiRequest<ReviewResponse>(`/client/boats/${boatId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  }
};

// ===== CUSTOMER API (Protected Endpoints) =====
export const customerApi = {
  getProfile: async (): Promise<ApiResponse<ProfileResponse>> => {
    return apiRequest<ProfileResponse>('/customer/profile');
  },

  createProfile: async (profileData: CustomerProfile): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<{ message: string }>('/customer/profile', {
      method: 'POST',
      body: JSON.stringify(profileData)
    });
  },

  updateProfile: async (profileData: CustomerProfile): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<{ message: string }>('/customer/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  getOrders: async (): Promise<ApiResponse<{ id: number; order_date: string; total_amount: number; status: string }[]>> => {
    return apiRequest<{ id: number; order_date: string; total_amount: number; status: string }[]>('/customer/orders');
  },

  createOrder: async (orderData: OrderData): Promise<ApiResponse<{ id: number; message: string }>> => {
    return apiRequest<{ id: number; message: string }>('/customer/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  createReview: async (reviewData: { client_id: number; review_text: string; rating: number }): Promise<ApiResponse<{ id: number; message: string }>> => {
    return apiRequest<{ id: number; message: string }>('/customer/review', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  },

  getReviews: async (clientId: number): Promise<ApiResponse<{ id: number; review_text: string; rating: number; created_at: string }[]>> => {
    return apiRequest<{ id: number; review_text: string; rating: number; created_at: string }[]>(`/customer/review/${clientId}`);
  }
};

// ===== VOYAGES API (Protected Endpoints) =====
export const voyagesApi = {
  getSharingVoyages: async (): Promise<ApiResponse<{ sharing_voyages: SharingVoyage[]; page: number; pages: number; per_page: number; total: number }>> => {
    return apiRequest<{ sharing_voyages: SharingVoyage[]; page: number; pages: number; per_page: number; total: number }>('/voyages/sharing');
  },

  joinVoyage: async (voyageId: number, joinData: VoyageJoinData): Promise<ApiResponse<{ message: string; voyage_id: number; booking_id: number; voyage: SharingVoyage }>> => {
    return apiRequest<{ message: string; voyage_id: number; booking_id: number; voyage: SharingVoyage }>(`/voyages/${voyageId}/join`, {
      method: 'POST',
      body: JSON.stringify(joinData)
    });
  }
};

// ===== DIAGNOSTIC FUNCTIONS =====
export async function diagnoseConnection(): Promise<ApiResponse<{ status: string; message: string; details: any }>> {
  return apiRequest<{ status: string; message: string; details: any }>('/diagnostics/connection');
}

export async function testConnection(): Promise<ApiResponse<{ status: string; message: string; details: any }>> {
  return apiRequest<{ status: string; message: string; details: any }>('/diagnostics/test');
}

// ===== UTILITY FUNCTIONS =====
export function isAuthenticated(): boolean {
  return !!storage.getToken();
}

export function handleApiError(error: unknown): string {
  console.error('API Error:', error);

  if (error instanceof Error && error.message && error.message.includes('401')) {
    storage.clearAll();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return 'Session expired. Please login again.';
  }

  if (error instanceof Error && error.message && error.message.includes('403')) {
    return 'You do not have permission to perform this action.';
  }

  if (error instanceof Error && error.message && error.message.includes('404')) {
    return 'The requested resource was not found.';
  }

  if (error instanceof Error && error.message && error.message.includes('500')) {
    return 'Server error. Please try again later.';
  }

  return error instanceof Error ? error.message : 'An unexpected error occurred.';
}

// ===== LEGACY COMPATIBILITY =====
// Keep old function names for backward compatibility
export const login = authApi.login;
export const register = authApi.register;
export const getHomeData = clientApi.getHomeData;
export const getCities = clientApi.getCities;
export const getBoats = clientApi.getBoats;
export const getCustomerProfile = customerApi.getProfile;
export const updateCustomerProfile = customerApi.updateProfile;
export const createCustomerProfile = customerApi.createProfile;

// Default export
export default authApi;
