import apiClient from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';
import { handleApiError } from '../utils/errorHandler';

const videoService = {
    /**
     * Get all videos (Feed)
     * @param {Object} params - Query parameters (page, limit, isBoosted, etc.)
     * @returns {Promise<Object>}
     */
    async getAllVideos(params = {}) {
        try {
            console.log(`[API] [VIDEOS] [FEED] GET ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VIDEOS.ROOT}`, params);
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.VIDEOS.ROOT, { params });
            console.log('[API] [VIDEOS] [FEED] [SUCCESS] Count:', response.data.length);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [VIDEOS] [FEED] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Get video by ID
     * @param {string} id - Video ID
     * @returns {Promise<Object>}
     */
    async getVideoById(id) {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.VIDEOS.BY_ID(id);
            console.log(`[API] [VIDEOS] [DETAILS] GET ${API_CONFIG.BASE_URL}${endpoint}`);
            const response = await apiClient.get(endpoint);
            console.log('[API] [VIDEOS] [DETAILS] [SUCCESS]');
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [VIDEOS] [DETAILS] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Create a new video entry
     * @param {Object} videoData - Video attributes
     * @returns {Promise<Object>}
     */
    async createVideo(videoData) {
        try {
            console.log(`[API] [VIDEOS] [CREATE] POST ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VIDEOS.ROOT}`);
            const response = await apiClient.post(API_CONFIG.ENDPOINTS.VIDEOS.ROOT, videoData);
            console.log('[API] [VIDEOS] [CREATE] [SUCCESS] ID:', response.data._id);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [VIDEOS] [CREATE] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Update an existing video
     * @param {string} id - Video ID
     * @param {Object} videoData - Updated attributes
     * @returns {Promise<Object>}
     */
    async updateVideo(id, videoData) {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.VIDEOS.BY_ID(id);
            console.log(`[API] [VIDEOS] [UPDATE] PATCH ${API_CONFIG.BASE_URL}${endpoint}`);
            const response = await apiClient.patch(endpoint, videoData);
            console.log('[API] [VIDEOS] [UPDATE] [SUCCESS]');
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [VIDEOS] [UPDATE] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Delete a video
     * @param {string} id - Video ID
     * @returns {Promise<Object>}
     */
    async deleteVideo(id) {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.VIDEOS.BY_ID(id);
            console.log(`[API] [VIDEOS] [DELETE] DELETE ${API_CONFIG.BASE_URL}${endpoint}`);
            const response = await apiClient.delete(endpoint);
            console.log('[API] [VIDEOS] [DELETE] [SUCCESS]');
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [VIDEOS] [DELETE] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Get current user's videos
     * @returns {Promise<Object>}
     */
    async getMyVideos() {
        try {
            console.log(`[API] [VIDEOS] [ME] GET ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VIDEOS.USER_ME}`);
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.VIDEOS.USER_ME);
            console.log('[API] [VIDEOS] [ME] [SUCCESS] Count:', response.data.length);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [VIDEOS] [ME] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    }
};

export default videoService;
