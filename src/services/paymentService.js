import apiClient from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';
import { handleApiError } from '../utils/errorHandler';

const paymentService = {
    /**
     * Create a Stripe Payment Intent
     * @param {number} amount - Amount in EUR
     * @returns {Promise<Object>}
     */
    async createPaymentIntent(amount) {
        try {
            console.log(`[API] [PAYMENT] [INTENT] POST ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENT.CREATE_INTENT}`);
            const response = await apiClient.post(API_CONFIG.ENDPOINTS.PAYMENT.CREATE_INTENT, { amount });
            console.log('[API] [PAYMENT] [INTENT] [SUCCESS]');
            return {
                success: true,
                data: response.data, // clientSecret
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [PAYMENT] [INTENT] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Boost a video after payment
     * @param {Object} boostData - { paymentIntentId, videoId }
     * @returns {Promise<Object>}
     */
    async boostVideo(boostData) {
        try {
            console.log(`[API] [PAYMENT] [BOOST] POST ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENT.BOOST_VIDEO}`);
            const response = await apiClient.post(API_CONFIG.ENDPOINTS.PAYMENT.BOOST_VIDEO, boostData);
            console.log('[API] [PAYMENT] [BOOST] [SUCCESS]');
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [PAYMENT] [BOOST] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Get boosting configuration
     * @returns {Promise<Object>}
     */
    async getBoostConfig() {
        try {
            console.log(`[API] [BOOST] [CONFIG] GET ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BOOST.CONFIG}`);
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.BOOST.CONFIG);
            console.log('[API] [BOOST] [CONFIG] [SUCCESS]');
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [BOOST] [CONFIG] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    }
};

export default paymentService;
