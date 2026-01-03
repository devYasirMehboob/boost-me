import apiClient from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';
import { handleApiError } from '../utils/errorHandler';

const rewardService = {
    /**
     * Record a video watch event
     * @param {string} videoId - The ID of the video being watched
     * @param {number} watchDuration - Time watched in seconds
     * @returns {Promise<Object>}
     */
    async recordWatch(videoId, watchDuration) {
        try {
            console.log(`[API] [REWARDS] [WATCH] POST ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REWARDS.WATCH}`);
            const response = await apiClient.post(API_CONFIG.ENDPOINTS.REWARDS.WATCH, {
                videoId,
                watchDuration,
            });
            console.log('[API] [REWARDS] [WATCH] [SUCCESS] Reward earned:', response.data.rewardEarned);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [REWARDS] [WATCH] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Get user balance
     * @returns {Promise<Object>}
     */
    async getMyBalance() {
        try {
            console.log(`[API] [REWARDS] [BALANCE] GET ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REWARDS.BALANCE}`);
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.REWARDS.BALANCE);
            console.log('[API] [REWARDS] [BALANCE] [SUCCESS] Balance:', response.data.totalBalance);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [REWARDS] [BALANCE] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Get reward info for a specific video
     * @param {string} videoId 
     * @returns {Promise<Object>}
     */
    async getVideoRewardInfo(videoId) {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.REWARDS.VIDEO_INFO(videoId);
            console.log(`[API] [REWARDS] [VIDEO_INFO] GET ${API_CONFIG.BASE_URL}${endpoint}`);
            const response = await apiClient.get(endpoint);
            console.log('[API] [REWARDS] [VIDEO_INFO] [SUCCESS]');
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [REWARDS] [VIDEO_INFO] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    }
};

export default rewardService;
