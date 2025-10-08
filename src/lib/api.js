// API utilities for Marakbi boat rental platform
// Based on the Postman collection endpoints

// Base URL for the API
const BASE_URL = 'https://yasershaban.pythonanywhere.com';

// Generic API request function with fallback to dummy data
async function apiRequest(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const token = getToken();

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        ...options
    };

    try {
        const response = await fetch(url, defaultOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('API request failed, using dummy data:', error);
        // Fallback to dummy data when API fails (CORS, network issues, etc.)
        return await getDummyData(endpoint, options);
    }
}

// Helper function to simulate API delay
async function simulateApiDelay() {
    await new Promise(res => setTimeout(res, 400));
}

// Dummy data fallback function
async function getDummyData(endpoint, options = {}) {
    await simulateApiDelay();

    // Authentication endpoints
    if (endpoint.includes('/auth/login')) {
        return {
            success: true,
            data: {
                access_token: "dummy-jwt-token-12345",
                refresh_token: "dummy-refresh-token-67890",
                user_id: 1,
                username: options.body ? JSON.parse(options.body).username : "user"
            }
        };
    }

    if (endpoint.includes('/auth/register')) {
        return {
            success: true,
            data: {
                message: "User registered successfully",
                user_id: Math.floor(Math.random() * 1000) + 1
            }
        };
    }

    // Home data
    if (endpoint.includes('/client/home') && !endpoint.includes('/upcoming_shares')) {
        return {
            success: true,
            data: {
                trending_voyages: [
                    {
                        id: 1,
                        name: "Nile Sunset Cruise",
                        description: "Experience the magic of the Nile at sunset",
                        city_name: "Aswan",
                        city_id: 1,
                        total_price: 600,
                        voyage_hours: 4,
                        trip_type: "Voyage",
                        images: ["/images/f1.png"],
                        guests_on_board: null,
                        pax: null,
                        rooms_available: null,
                        created_at: "2025-01-20T10:00:00Z"
                    }
                ],
                fishing_trips: [
                    {
                        id: 3,
                        name: "Nile Fishing Adventure",
                        description: "Professional fishing experience on the Nile",
                        city_name: "Aswan",
                        city_id: 1,
                        total_price: 400,
                        voyage_hours: 3,
                        trip_type: "Fishing",
                        images: ["/images/f3.png"],
                        guests_on_board: null,
                        pax: 5,
                        rooms_available: null,
                        created_at: "2025-01-20T10:00:00Z"
                    }
                ],
                new_joiners: [
                    {
                        id: 1,
                        name: "Luxury Yacht",
                        description: "Premium yacht with all amenities",
                        price_per_hour: 500,
                        max_seats: 12,
                        max_seats_stay: 6,
                        images: ["/images/Rectangle 3463853.png"],
                        categories: ["Luxury", "Yacht"],
                        cities: ["Aswan"],
                        owner_username: "captain_ahmed",
                        created_at: "2025-01-20T10:00:00Z"
                    }
                ]
            }
        };
    }

    // Boats data
    if (endpoint.includes('/client/boats') && !endpoint.includes('/category') && !endpoint.includes('/trips') && !endpoint.includes('/reviews')) {
        return {
            success: true,
            data: {
                boats: [
                    {
                        id: 1,
                        name: "Luxury Yacht",
                        description: "Premium yacht with all amenities",
                        price_per_hour: 500,
                        max_seats: 12,
                        max_seats_stay: 6,
                        images: ["/images/Rectangle 3463853.png"],
                        categories: ["Luxury", "Yacht"],
                        total_reviews: 15,
                        user_id: 1,
                        created_at: "2025-01-20T10:00:00Z"
                    },
                    {
                        id: 2,
                        name: "Traditional Felucca",
                        description: "Authentic Egyptian sailing boat",
                        price_per_hour: 150,
                        max_seats: 8,
                        max_seats_stay: 4,
                        images: ["/images/Rectangle 3463853.png"],
                        categories: ["Traditional", "Felucca"],
                        total_reviews: 8,
                        user_id: 2,
                        created_at: "2025-01-20T10:00:00Z"
                    }
                ],
                total: 2
            }
        };
    }

    // Cities data
    if (endpoint.includes('/client/cities')) {
        return {
            success: true,
            data: [
                { id: 1, name: "Aswan" },
                { id: 2, name: "Luxor" },
                { id: 3, name: "Cairo" },
            ]
        };
    }

    // Upcoming shares
    if (endpoint.includes('/client/home/upcoming_shares')) {
        return {
            success: true,
            data: {
                upcoming_shares: [
                    {
                        id: 1,
                        name: "Nile Sunset Sharing",
                        description: "Share a beautiful sunset cruise",
                        city_name: "Aswan",
                        total_price: 300,
                        available_seats: 4,
                        max_seats: 8,
                        departure_time: "18:00",
                        created_at: "2025-01-20T10:00:00Z"
                    }
                ]
            }
        };
    }

    // Customer profile
    if (endpoint.includes('/customer/profile')) {
        return {
            success: true,
            data: {
                user_id: 1,
                username: "Ahmad Bastawi",
                email: "ahmad@example.com",
                address: "Cairo, Egypt",
                phone: "+201234567890",
                created_at: "2025-01-20T10:00:00Z"
            }
        };
    }

    // Default fallback
    return {
        success: true,
        data: { message: "Dummy data - API not available" }
    };
}

// Authentication API functions
export async function login(username, password) {
    return await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });
}

export async function register(username, password, email) {
    return await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password, email })
    });
}

// Client API functions
export async function getHomeData() {
    return await apiRequest('/client/home');
}

export async function getHomeSection(section) {
    return await apiRequest(`/client/home/${section}`);
}

export async function getBoats() {
    return await apiRequest('/client/boats');
}

export async function getBoatById(id) {
    return await apiRequest(`/client/boats/${id}`);
}

export async function getBoatsByCategory(category) {
    return await apiRequest(`/client/boats/category/${category}`);
}

export async function getBoatsByCategoryAndCity(category, cityId) {
    return await apiRequest(`/client/boats/category/${category}/city/${cityId}`);
}

export async function getCities() {
    return await apiRequest('/client/cities');
}

export async function getCategoriesByCity(cityId) {
    return await apiRequest(`/client/boats/categories/${cityId}`);
}

export async function getBoatTrips(boatId) {
    return await apiRequest(`/client/boats/${boatId}/trips`);
}

export async function getTripsByCity(cityId) {
    return await apiRequest(`/client/trips/city/${cityId}`);
}

export async function getAllTrips() {
    return await apiRequest('/client/trips');
}

export async function bookTrip(tripId, bookingData) {
    return await apiRequest(`/client/trips/${tripId}/book`, {
        method: 'POST',
        body: JSON.stringify(bookingData)
    });
}

export async function createBoatReview(boatId, reviewData) {
    return await apiRequest(`/client/boats/${boatId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewData)
    });
}

// Customer API functions
export async function getCustomerProfile() {
    return await apiRequest('/customer/profile');
}

export async function createCustomerProfile(profileData) {
    return await apiRequest('/customer/profile', {
        method: 'POST',
        body: JSON.stringify(profileData)
    });
}

export async function updateCustomerProfile(profileData) {
    return await apiRequest('/customer/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData)
    });
}

export async function getCustomerOrders() {
    return await apiRequest('/customer/orders');
}

export async function createOrder(orderData) {
    return await apiRequest('/customer/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
    });
}

export async function createCustomerReview(reviewData) {
    return await apiRequest('/customer/reviews', {
        method: 'POST',
        body: JSON.stringify(reviewData)
    });
}

export async function getCustomerReviews() {
    return await apiRequest('/customer/reviews');
}

// Sharing Voyages API functions
export async function getSharingVoyages() {
    return await apiRequest('/client/home/upcoming_shares');
}

export async function joinSharingVoyage(voyageId, joinData) {
    return await apiRequest(`/sharing-voyages/${voyageId}/join`, {
        method: 'POST',
        body: JSON.stringify(joinData)
    });
}

// Token management functions
export function setToken(token) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token);
    }
}

export function getToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
}

export function clearToken() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
    }
}

// Storage utilities
export const storage = {
    setUser: (user) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('userInfo', JSON.stringify(user));
        }
    },
    getUser: () => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('userInfo');
            return user ? JSON.parse(user) : null;
        }
        return null;
    },
    clearUser: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('userInfo');
        }
    }
};

// Authentication helper
export function isAuthenticated() {
    return !!getToken();
}

// Helper function to handle API errors
export function handleApiError(error) {
    console.error('API Error:', error);

    if (error.message.includes('401')) {
        clearToken();
        window.location.href = '/login';
        return 'Session expired. Please login again.';
    }

    if (error.message.includes('403')) {
        return 'You do not have permission to perform this action.';
    }

    if (error.message.includes('404')) {
        return 'The requested resource was not found.';
    }

    if (error.message.includes('500')) {
        return 'Server error. Please try again later.';
    }

    return error.message || 'An unexpected error occurred.';
}

// Export all functions as default object for easier imports
export default {
    login,
    register,
    getHomeData,
    getHomeSection,
    getBoats,
    getBoatById,
    getBoatsByCategory,
    getBoatsByCategoryAndCity,
    getCities,
    getCategoriesByCity,
    getBoatTrips,
    getTripsByCity,
    getAllTrips,
    bookTrip,
    createBoatReview,
    getCustomerProfile,
    createCustomerProfile,
    updateCustomerProfile,
    getCustomerOrders,
    createOrder,
    createCustomerReview,
    getCustomerReviews,
    getSharingVoyages,
    joinSharingVoyage,
    setToken,
    getToken,
    clearToken,
    storage,
    isAuthenticated,
    handleApiError
};