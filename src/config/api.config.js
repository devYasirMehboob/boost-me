export const API_CONFIG = {
    // Base URL for the API
    // Using localhost:3000 as default from Postman collection
    // When testing on physical device, use your computer's local IP (e.g., http://192.168.1.XX:3000)
    BASE_URL: 'http://localhost:3000/api/v1',
    TIMEOUT: 10000,
    ENDPOINTS: {
        AUTH: {
            REGISTER: '/auth/register',
            LOGIN: '/auth/login',
            PROFILE: '/auth/profile',
        },
        VIDEOS: {
            ROOT: '/videos',
            USER_ME: '/videos/user/me',
            BY_ID: (id) => `/videos/${id}`,
        },
        UPLOAD: {
            REQUEST: '/upload/request',
            SIGNED_URL: (path) => `/upload/signed-url/${path}`,
            DELETE: (path) => `/upload/${path}`,
        },
        PAYMENT: {
            CREATE_INTENT: '/payment/create-intent',
            BOOST_VIDEO: '/payment/boost-video',
        },
        BOOST: {
            MY_BOOSTS: '/boost/my-boosts',
            VIDEO_BY_ID: (videoId) => `/boost/video/${videoId}`,
            CANCEL: (boostId) => `/boost/${boostId}/cancel`,
            CONFIG: '/boost/config',
        },
        REWARDS: {
            WATCH: '/rewards/watch',
            BALANCE: '/rewards/balance',
            EARNINGS: '/rewards/earnings',
            VIDEO_INFO: (videoId) => `/rewards/video/${videoId}`,
        },
        STRIPE_CONNECT: {
            ACCOUNT: '/stripe-connect/account',
            ONBOARDING_LINK: '/stripe-connect/onboarding-link',
            DASHBOARD_LINK: '/stripe-connect/dashboard-link',
            STATUS: '/stripe-connect/account/status',
            BALANCE: '/stripe-connect/balance',
        },
        TRANSACTIONS: {
            MY: '/transactions',
        },
        ADMIN: {
            USERS: '/admin/users',
            USER_BY_ID: (userId) => `/admin/users/${userId}`,
            TOGGLE_BAN: (userId) => `/admin/users/${userId}/toggle-ban`,
            TRANSACTIONS: '/admin/transactions',
            BOOSTS: '/admin/boosts',
            REWARD_BALANCES: '/admin/rewards/balances',
        }
    },
};
