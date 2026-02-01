export const API_BASE_URL = 'http://192.168.1.100:8080';

export const API_ENDPOINTS = {
    sendOTP: '/api/auth/send-otp',
    verifyOTP: '/api/auth/verify-otp',
    getNews: '/api/content/news',
    getAnnouncements: '/api/content/announcements',
    getTimings: '/api/content/timings',
    getSocialLinks: '/api/content/social-links',
    getEvents: '/api/events',
    getEventById: '/api/events/:id',
    registerUser: '/api/users/register',
    updateProfile: '/api/users/profile',
    createBooking: '/api/bookings/rooms',
    getBookings: '/api/bookings/user',
    getGurus: '/api/history/gurus',
    getGuruById: '/api/history/gurus/:id',
};

export const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_KEY_HERE';
