import axios from 'axios';

// Create an Axios instance with default config
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptors if we need to inject tokens later
api.interceptors.request.use((config) => {
    // TODO: Get Firebase Token and add to Authorization header
    return config;
});
