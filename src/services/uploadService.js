import apiClient from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';
import { handleApiError } from '../utils/errorHandler';
import axios from 'axios';

const uploadService = {
    /**
     * Request a presigned URL for upload
     * @param {Object} fileData - { type, fileName, contentType, fileSize }
     * @returns {Promise<Object>}
     */
    async requestUploadUrl(fileData) {
        try {
            console.log(`[API] [UPLOAD] [REQUEST] POST ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPLOAD.REQUEST}`);
            const response = await apiClient.post(API_CONFIG.ENDPOINTS.UPLOAD.REQUEST, fileData);
            console.log('[API] [UPLOAD] [REQUEST] [SUCCESS] URL Received');
            return {
                success: true,
                data: response.data, // Should include uploadUrl and key
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [UPLOAD] [REQUEST] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    },

    /**
     * Upload file directly to S3 using presigned URL
     * @param {string} uploadUrl - Presigned URL from S3
     * @param {string} fileUri - Local file path/URI
     * @param {string} contentType - Mime type
     * @returns {Promise<Object>}
     */
    async uploadToS3(uploadUrl, fileUri, contentType) {
        try {
            console.log(`[API] [S3] [UPLOAD] PUT to presigned URL`);

            // We use standard axios here because we are hitting S3 directly, 
            // not our API (no auth headers needed or allowed in many cases)
            const response = await axios.put(uploadUrl, { uri: fileUri }, {
                headers: {
                    'Content-Type': contentType,
                },
                // For React Native, we might need a more complex upload logic with Blob or FormData
                // depending on the platform. This is a baseline implementation.
            });

            console.log('[API] [S3] [UPLOAD] [SUCCESS]');
            return {
                success: true,
            };
        } catch (error) {
            console.error('[API] [S3] [UPLOAD] [ERROR]:', error);
            return {
                success: false,
                message: 'Failed to upload to S3',
            };
        }
    },

    /**
     * Get a signed URL for private content
     * @param {string} path - Storage path
     * @returns {Promise<Object>}
     */
    async getSignedUrl(path) {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.UPLOAD.SIGNED_URL(path);
            console.log(`[API] [UPLOAD] [SIGNED_URL] GET ${API_CONFIG.BASE_URL}${endpoint}`);
            const response = await apiClient.get(endpoint);
            console.log('[API] [UPLOAD] [SIGNED_URL] [SUCCESS]');
            return {
                success: true,
                data: response.data, // Should include signedUrl
            };
        } catch (error) {
            const apiError = handleApiError(error);
            console.error('[API] [UPLOAD] [SIGNED_URL] [ERROR]:', apiError);
            return {
                success: false,
                ...apiError,
            };
        }
    }
};

export default uploadService;
