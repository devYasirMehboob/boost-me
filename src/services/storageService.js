import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
    ACCESS_TOKEN: 'boostme_access_token',
    USER_DATA: 'boostme_user_data',
};

const storageService = {
    async setAccessToken(token) {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
        } catch (error) {
            console.error('Error saving access token:', error);
        }
    },

    async getAccessToken() {
        try {
            return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        } catch (error) {
            console.error('Error getting access token:', error);
            return null;
        }
    },

    async setUserData(userData) {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    },

    async getUserData() {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error getting user data:', error);
            return null;
        }
    },

    async clearAuth() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
        } catch (error) {
            console.error('Error clearing auth data:', error);
        }
    },
};

export default storageService;
