// ⚠️ TEMPORARY DUMMY DATA MODE
// Replace with real fetch() calls once backend is deployed.

// API utilities for Marakbi boat rental platform
// Based on the Postman collection endpoints

// Helper function to simulate API delay
async function simulateApiDelay() {
    await new Promise(res => setTimeout(res, 400));
}

// Authentication API functions
export async function login(username, password) {
    await simulateApiDelay();

    // Simulate login validation
    if (!username || !password) {
        throw new Error('Username and password are required');
    }

    return {
        data: {
            access_token: "dummy-jwt-token-12345",
            refresh_token: "dummy-refresh-token-67890",
            user_id: 1,
            username: username
        },
        status: "success"
    };
}

export async function register(username, password, email) {
    await simulateApiDelay();

    // Simulate registration validation
    if (!username || !password || !email) {
        throw new Error('All fields are required');
    }

    return {
        data: {
            message: "User registered successfully",
            user_id: Math.floor(Math.random() * 1000) + 1
        },
        status: "success"
    };
}

// Client API functions
export async function getHomeData() {
    await simulateApiDelay();

    return {
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
            },
            {
                id: 2,
                name: "Philae Temple Tour",
                description: "Visit the beautiful Philae Temple by boat",
                city_name: "Aswan",
                city_id: 1,
                total_price: 800,
                voyage_hours: 6,
                trip_type: "Voyage",
                images: ["/images/f2.png"],
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
                max_seats_stay: 8,
                images: ["/images/Rectangle 3463853.png"],
                categories: ["Luxury", "Yacht"],
                cities: ["Aswan"],
                owner_username: "captain_ahmed",
                created_at: "2025-01-20T10:00:00Z"
            },
            {
                id: 2,
                name: "Traditional Felucca",
                description: "Authentic Egyptian sailing experience",
                price_per_hour: 150,
                max_seats: 8,
                max_seats_stay: 4,
                images: ["/images/Rectangle 3463853.png"],
                categories: ["Traditional", "Felucca"],
                cities: ["Aswan"],
                owner_username: "sailor_mohamed",
                created_at: "2025-01-20T10:00:00Z"
            },
            {
                id: 4,
                name: "Nile Felucca",
                description: "Classic Egyptian felucca for romantic trips",
                price_per_hour: 120,
                max_seats: 6,
                max_seats_stay: 3,
                images: ["/images/Rectangle 3463853.png"],
                categories: ["Traditional", "Romantic"],
                cities: ["Aswan"],
                owner_username: "romantic_sailor",
                created_at: "2025-01-20T10:00:00Z"
            }
        ],
        nile_cruises: [
            {
                id: 4,
                name: "Luxor to Aswan Cruise",
                description: "Multi-day cruise from Luxor to Aswan",
                city_name: "Aswan",
                city_id: 1,
                total_price: 4000,
                voyage_hours: 96,
                trip_type: "Cruise",
                images: ["/images/Rectangle 3463860.png"],
                guests_on_board: 50,
                pax: null,
                rooms_available: 25,
                created_at: "2025-01-20T10:00:00Z"
            }
        ],
        occasions: [
            {
                id: 5,
                name: "Wedding Celebration",
                description: "Special wedding boat celebration",
                city_name: "Aswan",
                city_id: 1,
                total_price: 2000,
                voyage_hours: 4,
                trip_type: "Occasion",
                images: ["/images/Rectangle 3463861.png"],
                guests_on_board: null,
                pax: null,
                rooms_available: null,
                created_at: "2025-01-20T10:00:00Z"
            }
        ],
        water_games: [
            {
                id: 6,
                name: "Parasailing Adventure",
                description: "Thrilling parasailing over the Nile",
                city_name: "Aswan",
                city_id: 1,
                total_price: 300,
                voyage_hours: 2,
                trip_type: "Water_activities",
                images: ["/images/Rectangle 3463862.png"],
                guests_on_board: null,
                pax: null,
                rooms_available: null,
                created_at: "2025-01-20T10:00:00Z"
            }
        ],
        upcoming_shares: [
            {
                id: 1,
                boat_id: 1,
                boat_name: "Luxury Yacht",
                start_date: "2025-01-25T10:00:00Z",
                end_date: "2025-01-25T16:00:00Z",
                available_seats: 6,
                price_per_hour: 500,
                voyage_type: "Sharing"
            }
        ],
        summary: {
            total_trending_voyages: 2,
            total_fishing_trips: 1,
            total_new_joiners: 2,
            total_nile_cruises: 1,
            total_occasions: 1,
            total_water_games: 1,
            total_upcoming_shares: 1
        }
    };
}

export async function getHomeSection(section, page = 1, perPage = 15) {
    await simulateApiDelay();

    const homeData = await getHomeData();
    const data = homeData[section] || [];

    return {
        data: data.slice((page - 1) * perPage, page * perPage),
        section: section,
        pagination: {
            page: page,
            pages: Math.ceil(data.length / perPage),
            per_page: perPage,
            total: data.length,
            has_next: page < Math.ceil(data.length / perPage),
            has_prev: page > 1
        }
    };
}

export async function getBoats() {
    await simulateApiDelay();

    return {
        boats: [
            {
                id: 1,
                name: "Luxury Yacht",
                description: "Premium yacht with all modern amenities",
                price_per_hour: 500,
                max_seats: 12,
                max_seats_stay: 8,
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
            },
            {
                id: 3,
                name: "Speed Boat",
                description: "Fast and agile speed boat for adventures",
                price_per_hour: 300,
                max_seats: 6,
                max_seats_stay: 2,
                images: ["/images/Rectangle 3463853.png"],
                categories: ["Speed", "Adventure"],
                total_reviews: 12,
                user_id: 3,
                created_at: "2025-01-20T10:00:00Z"
            },
            {
                id: 4,
                name: "Nile Felucca",
                description: "Classic Egyptian felucca for romantic trips",
                price_per_hour: 120,
                max_seats: 6,
                max_seats_stay: 3,
                images: ["/images/Rectangle 3463853.png"],
                categories: ["Traditional", "Romantic"],
                total_reviews: 25,
                user_id: 4,
                created_at: "2025-01-20T10:00:00Z"
            },
            {
                id: 5,
                name: "Fishing Boat",
                description: "Professional fishing boat with equipment",
                price_per_hour: 180,
                max_seats: 8,
                max_seats_stay: 4,
                images: ["/images/Rectangle 3463853.png"],
                categories: ["Fishing", "Professional"],
                total_reviews: 18,
                user_id: 5,
                created_at: "2025-01-20T10:00:00Z"
            }
        ],
        page: 1,
        pages: 1,
        per_page: 10,
        total: 5
    };
}

export async function getBoatById(id) {
    await simulateApiDelay();

    const boats = [
        {
            id: 1,
            name: "Luxury Yacht",
            description: "Premium yacht with all modern amenities including air conditioning, kitchen, and bathroom facilities",
            price_per_hour: 500,
            max_seats: 12,
            max_seats_stay: 8,
            images: ["/images/Rectangle 3463853.png", "/images/Rectangle 3463860.png"],
            categories: ["Luxury", "Yacht"],
            total_reviews: 15,
            user_id: 1,
            created_at: "2025-01-20T10:00:00Z"
        }
    ];

    const boat = boats.find(b => b.id == id) || boats[0];

    return {
        boat: boat,
        owner: {
            username: "captain_ahmed",
            bio: "Experienced captain with 15 years on the Nile",
            phone: "+20 123 456 7890",
            address: "Aswan Marina",
            avatar_url: null,
            member_since: "2020-01-01T00:00:00Z"
        },
        reviews: [
            {
                id: 1,
                boat_id: id,
                user_id: 1,
                username: "sarah_m",
                rating: 5,
                comment: "Amazing experience! The yacht was beautiful and the captain was very professional.",
                created_at: "2025-01-15T14:30:00Z"
            },
            {
                id: 2,
                boat_id: id,
                user_id: 2,
                username: "john_d",
                rating: 4,
                comment: "Great boat, perfect for our family trip. Highly recommended!",
                created_at: "2025-01-10T09:15:00Z"
            }
        ],
        reviews_summary: {
            average_rating: 4.5,
            total_reviews: 2,
            star_breakdown: {
                "1_stars": 0,
                "2_stars": 0,
                "3_stars": 0,
                "4_stars": 1,
                "5_stars": 1
            }
        },
        reviews_pagination: {
            page: 1,
            pages: 1,
            per_page: 5,
            total: 2
        }
    };
}

export async function getBoatsByCategory(categoryId) {
    await simulateApiDelay();

    const boats = await getBoats();
    return {
        boats: boats.boats.filter(boat => boat.categories.includes("Luxury")),
        page: 1,
        pages: 1,
        per_page: 10,
        total: 1
    };
}

export async function getBoatsByCategoryAndCity(categoryId, cityId) {
    await simulateApiDelay();

    const boats = await getBoats();
    return {
        boats: boats.boats,
        page: 1,
        pages: 1,
        per_page: 10,
        total: boats.boats.length
    };
}

export async function getCities() {
    await simulateApiDelay();

    return {
        cities: [
            { id: 1, name: "Aswan" },
            { id: 2, name: "Luxor" },
            { id: 3, name: "Cairo" },
            { id: 4, name: "Alexandria" }
        ]
    };
}

export async function getCategoriesByCity(cityId) {
    await simulateApiDelay();

    return {
        categories: [
            { id: 1, name: "Luxury" },
            { id: 2, name: "Traditional" },
            { id: 3, name: "Speed" },
            { id: 4, name: "Fishing" }
        ]
    };
}

export async function getBoatTrips(boatId) {
    await simulateApiDelay();

    return {
        boat_id: boatId,
        boat_name: "Luxury Yacht",
        trips: [
            {
                id: 1,
                name: "Sunset Cruise",
                description: "Beautiful sunset cruise on the Nile",
                city_id: 1,
                city_name: "Aswan",
                total_price: 600,
                voyage_hours: 4,
                trip_type: "Voyage",
                images: ["/images/f1.png"],
                guests_on_board: null,
                pax: null,
                rooms_available: null,
                created_at: "2025-01-20T10:00:00Z"
            }
        ]
    };
}

export async function getTripsByCity(cityId) {
    await simulateApiDelay();

    return {
        city: { id: cityId, name: "Aswan" },
        trips: [
            {
                id: 1,
                name: "Nile Sunset Cruise",
                description: "Experience the magic of the Nile at sunset",
                city_id: cityId,
                city_name: "Aswan",
                total_price: 600,
                voyage_hours: 4,
                trip_type: "Voyage",
                images: ["/images/f1.png"],
                guests_on_board: null,
                pax: null,
                rooms_available: null,
                created_at: "2025-01-20T10:00:00Z"
            }
        ]
    };
}

export async function getAllTrips(cityId = null) {
    await simulateApiDelay();

    const trips = [
        {
            id: 1,
            name: "Nile Sunset Cruise",
            description: "Experience the magic of the Nile at sunset",
            city_id: 1,
            city_name: "Aswan",
            total_price: 600,
            voyage_hours: 4,
            trip_type: "Voyage",
            images: ["/images/f1.png"],
            guests_on_board: null,
            pax: null,
            rooms_available: null,
            created_at: "2025-01-20T10:00:00Z"
        },
        {
            id: 2,
            name: "Philae Temple Tour",
            description: "Visit the beautiful Philae Temple by boat",
            city_id: 1,
            city_name: "Aswan",
            total_price: 800,
            voyage_hours: 6,
            trip_type: "Voyage",
            images: ["/images/f2.png"],
            guests_on_board: null,
            pax: null,
            rooms_available: null,
            created_at: "2025-01-20T10:00:00Z"
        }
    ];

    return cityId ? trips.filter(trip => trip.city_id == cityId) : trips;
}

export async function bookTrip(tripId, bookingData) {
    await simulateApiDelay();

    return {
        message: "Trip booked successfully.",
        booking: {
            id: Math.floor(Math.random() * 1000) + 1,
            trip_id: tripId,
            boat_id: bookingData.boat_id,
            user_id: 1,
            username: "user123",
            start_date: bookingData.start_date,
            end_date: new Date(new Date(bookingData.start_date).getTime() + 4 * 60 * 60 * 1000).toISOString(),
            guest_count: bookingData.guest_count,
            status: "pending",
            booking_type: "trip",
            created_at: new Date().toISOString(),
            trip_name: "Nile Sunset Cruise",
            boat_name: "Luxury Yacht",
            price_per_hour: 500,
            voyage_id: null
        },
        trip: {
            id: tripId,
            name: "Nile Sunset Cruise",
            description: "Experience the magic of the Nile at sunset",
            city_id: 1,
            city_name: "Aswan",
            total_price: 600,
            voyage_hours: 4,
            trip_type: "Voyage",
            images: ["/images/f1.png"],
            guests_on_board: null,
            pax: null,
            rooms_available: null,
            created_at: "2025-01-20T10:00:00Z"
        },
        total_price: 600,
        duration_hours: 4
    };
}

export async function createBoatReview(boatId, rating, comment) {
    await simulateApiDelay();

    return {
        message: "Review created successfully.",
        review: {
            id: Math.floor(Math.random() * 1000) + 1,
            boat_id: boatId,
            user_id: 1,
            username: "user123",
            rating: rating,
            comment: comment,
            created_at: new Date().toISOString()
        }
    };
}

// Customer API functions
export async function getCustomerProfile() {
    await simulateApiDelay();

    return {
        user_id: 1,
        username: "user123",
        email: "user@example.com",
        bio: "Boat enthusiast and adventure seeker",
        phone: "+20 123 456 7890",
        address: "Cairo, Egypt",
        avatar_url: null,
        member_since: "2024-01-01T00:00:00Z"
    };
}

export async function createCustomerProfile(profileData) {
    await simulateApiDelay();

    return {
        message: "Profile created successfully",
        profile: {
            user_id: 1,
            bio: profileData.bio,
            phone: profileData.phone,
            address: profileData.address,
            created_at: new Date().toISOString()
        }
    };
}

export async function updateCustomerProfile(profileData) {
    await simulateApiDelay();

    return {
        message: "Profile updated successfully",
        profile: {
            user_id: 1,
            bio: profileData.bio,
            phone: profileData.phone,
            address: profileData.address,
            updated_at: new Date().toISOString()
        }
    };
}

export async function getCustomerOrders() {
    await simulateApiDelay();

    return [
        {
            id: 1,
            user_id: 1,
            boat_id: 1,
            trip_id: 1,
            voyage_id: null,
            start_date: "2025-01-25T10:00:00Z",
            end_date: "2025-01-25T16:00:00Z",
            guest_count: 4,
            status: "confirmed",
            booking_type: "trip",
            created_at: "2025-01-20T10:00:00Z",
            trip_name: "Nile Sunset Cruise",
            boat_name: "Luxury Yacht",
            price_per_hour: 500
        },
        {
            id: 2,
            user_id: 1,
            boat_id: 2,
            trip_id: null,
            voyage_id: 1,
            start_date: "2025-01-30T14:00:00Z",
            end_date: "2025-01-30T18:00:00Z",
            guest_count: 2,
            status: "pending",
            booking_type: "voyage",
            created_at: "2025-01-21T09:00:00Z",
            trip_name: null,
            boat_name: "Traditional Felucca",
            price_per_hour: 200
        }
    ];
}

export async function createOrder(orderData) {
    await simulateApiDelay();

    return {
        message: "Order created successfully",
        order_id: Math.floor(Math.random() * 1000) + 1,
        voyage: {
            id: Math.floor(Math.random() * 100) + 1,
            boat_id: orderData.boat_id,
            start_date: orderData.start_date,
            end_date: orderData.end_date,
            max_seats: 10,
            current_seats_taken: orderData.guest_count,
            available_seats: 10 - orderData.guest_count,
            price_per_hour: 500,
            status: "active",
            voyage_type: orderData.voyage_type,
            created_at: new Date().toISOString(),
            users_in_voyage: [1]
        },
        voyage_id: Math.floor(Math.random() * 100) + 1
    };
}

export async function createCustomerReview(reviewData) {
    await simulateApiDelay();

    return {
        message: "Review created successfully",
        review: {
            id: Math.floor(Math.random() * 1000) + 1,
            client_id: reviewData.client_id,
            user_id: 1,
            username: "user123",
            review_text: reviewData.review_text,
            rating: reviewData.rating,
            created_at: new Date().toISOString()
        }
    };
}

export async function getCustomerReviews(clientId) {
    await simulateApiDelay();

    return [
        {
            id: 1,
            client_id: clientId,
            user_id: 1,
            username: "sarah_m",
            review_text: "Excellent service! Very professional and friendly.",
            rating: 5,
            created_at: "2025-01-15T14:30:00Z"
        },
        {
            id: 2,
            client_id: clientId,
            user_id: 2,
            username: "john_d",
            review_text: "Great experience, highly recommended!",
            rating: 4,
            created_at: "2025-01-10T09:15:00Z"
        }
    ];
}

// Voyages API functions
export async function getSharingVoyages() {
    await simulateApiDelay();

    return {
        sharing_voyages: [
            {
                id: 1,
                boat_id: 1,
                boat: {
                    id: 1,
                    name: "Luxury Yacht",
                    description: "Premium yacht with all amenities",
                    max_seats: 12,
                    max_seats_stay: 8,
                    price_per_hour: 500,
                    total_reviews: 15,
                    created_at: "2025-01-20T10:00:00Z"
                },
                start_date: "2025-01-25T10:00:00Z",
                end_date: "2025-01-25T16:00:00Z",
                max_seats: 12,
                current_seats_taken: 6,
                available_seats: 6,
                price_per_hour: 500,
                status: "active",
                voyage_type: "Sharing",
                created_at: "2025-01-20T10:00:00Z",
                users_in_voyage: [
                    {
                        user_id: 1,
                        username: "sarah_m",
                        guest_count: 2
                    },
                    {
                        user_id: 2,
                        username: "john_d",
                        guest_count: 4
                    }
                ]
            },
            {
                id: 2,
                boat_id: 2,
                boat: {
                    id: 2,
                    name: "Traditional Felucca",
                    description: "Authentic Egyptian sailing experience",
                    max_seats: 8,
                    max_seats_stay: 4,
                    price_per_hour: 150,
                    total_reviews: 8,
                    created_at: "2025-01-20T10:00:00Z"
                },
                start_date: "2025-01-30T14:00:00Z",
                end_date: "2025-01-30T18:00:00Z",
                max_seats: 8,
                current_seats_taken: 3,
                available_seats: 5,
                price_per_hour: 150,
                status: "active",
                voyage_type: "Sharing",
                created_at: "2025-01-21T09:00:00Z",
                users_in_voyage: [
                    {
                        user_id: 3,
                        username: "mike_w",
                        guest_count: 3
                    }
                ]
            }
        ],
        page: 1,
        pages: 1,
        per_page: 10,
        total: 2
    };
}

export async function joinSharingVoyage(voyageId, guestCount) {
    await simulateApiDelay();

    return {
        message: "Successfully joined sharing voyage",
        voyage_id: voyageId,
        booking_id: Math.floor(Math.random() * 1000) + 1,
        voyage: {
            id: voyageId,
            boat_id: 1,
            boat: {
                id: 1,
                name: "Luxury Yacht",
                description: "Premium yacht with all amenities",
                max_seats: 12,
                max_seats_stay: 8,
                price_per_hour: 500,
                total_reviews: 15,
                created_at: "2025-01-20T10:00:00Z"
            },
            start_date: "2025-01-25T10:00:00Z",
            end_date: "2025-01-25T16:00:00Z",
            max_seats: 12,
            current_seats_taken: 6 + guestCount,
            available_seats: 6 - guestCount,
            price_per_hour: 500,
            status: "active",
            voyage_type: "Sharing",
            created_at: "2025-01-20T10:00:00Z",
            users_in_voyage: [
                {
                    user_id: 1,
                    username: "sarah_m",
                    guest_count: 2
                },
                {
                    user_id: 2,
                    username: "john_d",
                    guest_count: 4
                },
                {
                    user_id: 4,
                    username: "user123",
                    guest_count: guestCount
                }
            ]
        }
    };
}

// Token management
export function setToken(token) {
    localStorage.setItem("token", token);
}

export function getToken() {
    return localStorage.getItem("token");
}

export function clearToken() {
    localStorage.removeItem("token");
}

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
    // Auth
    login,
    register,

    // Client
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

    // Customer
    getCustomerProfile,
    createCustomerProfile,
    updateCustomerProfile,
    getCustomerOrders,
    createOrder,
    createCustomerReview,
    getCustomerReviews,

    // Voyages
    getSharingVoyages,
    joinSharingVoyage,

    // Token management
    setToken,
    getToken,
    clearToken,
    isAuthenticated,
    handleApiError,
};
