import axios from 'axios';
import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com'; // Default or ENV

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
});

// Request Interceptor
apiClient.interceptors.request.use(
    async (config) => {
        // TODO: Add auth token logic here
        // const token = await getToken();
        // if (token) {
        //   config.headers.Authorization = \`Bearer \${token}\`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle global errors (e.g., 401 Unauthorized)
        if (error.response && error.response.status === 401) {
            // Navigate to login or clear auth
            console.warn('Unauthorized access - Redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default apiClient;
