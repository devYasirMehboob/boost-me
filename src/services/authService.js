import apiClient from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';
import storageService from './storageService';
import { handleApiError } from '../utils/errorHandler';

const authService = {
    /**
     * Register a new user
     * @param {Object} userData - User data (email, password, firstName, lastName)
     * @returns {Promise<Object>} - Registration result
     */
    async register(userData) {
        try {
            console.log(`[API] [SIGNUP] POST ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`);
            const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
            console.log('[API] [SIGNUP] [SUCCESS] Response:', response.data);

            const { accessToken, user } = response.data;

            // Store auth data locally
            await storageService.setAccessToken(accessToken);
            await storageService.setUserData(user);

            return {
                success: true,
                user,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [SIGNUP] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Log in a user
     * @param {Object} credentials - User credentials (email, password)
     * @returns {Promise<Object>} - Login result
     */
    async login(credentials) {
        try {
            console.log(`[API] [LOGIN] POST ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`);
            const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
            console.log('[API] [LOGIN] [SUCCESS] Response:', response.data);

            const { accessToken, user } = response.data;

            // Store auth data locally
            await storageService.setAccessToken(accessToken);
            await storageService.setUserData(user);

            return {
                success: true,
                user,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [LOGIN] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Get user profile
     * @returns {Promise<Object>} - Profile result
     */
    async getProfile() {
        try {
            console.log(`[API] [PROFILE] GET ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.PROFILE}`);
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
            console.log('[API] [PROFILE] [SUCCESS] Data:', response.data);

            // Update stored user data
            await storageService.setUserData(response.data);

            return {
                success: true,
                user: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [PROFILE] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Log out the current user
     */
    async logout() {
        console.log('[AUTH] [LOGOUT] Clearing session data');
        await storageService.clearAuth();
    },

    /**
     * Check if user is authenticated
     * @returns {Promise<boolean>}
     */
    async isAuthenticated() {
        const token = await storageService.getAccessToken();
        return !!token;
    }
};

export default authService;
