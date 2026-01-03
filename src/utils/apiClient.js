import axios from 'axios';
import { API_CONFIG } from '../config/api.config';
import storageService from '../services/storageService';

const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    async (config) => {
        const token = await storageService.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors like 401 Unauthorized
        if (error.response && error.response.status === 401) {
            // Potentially trigger logout or token refresh
            console.log('Unauthorized - handle logout if necessary');
        }
        return Promise.reject(error);
    }
);

export default apiClient;
