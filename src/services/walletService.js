import apiClient from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';
import { handleApiError } from '../utils/errorHandler';

const walletService = {
    /**
     * Get transaction history
     * @param {Object} params - { limit, skip }
     * @returns {Promise<Object>}
     */
    async getMyTransactions(params = { limit: 50 }) {
        try {
            console.log(`[API] [TRANSACTIONS] GET ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRANSACTIONS.MY}`, params);
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.TRANSACTIONS.MY, { params });
            console.log('[API] [TRANSACTIONS] [SUCCESS] Count:', response.data.length);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [TRANSACTIONS] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Get earnings report
     * @returns {Promise<Object>}
     */
    async getMyEarnings() {
        try {
            console.log(`[API] [REWARDS] [EARNINGS] GET ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REWARDS.EARNINGS}`);
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.REWARDS.EARNINGS);
            console.log('[API] [REWARDS] [EARNINGS] [SUCCESS]');
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [REWARDS] [EARNINGS] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    }
};

export default walletService;
