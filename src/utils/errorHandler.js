export const handleApiError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const message = error.response.data?.message || 'Something went wrong';
        const errors = error.response.data?.errors || null;

        return {
            message,
            errors,
            status: error.response.status,
        };
    } else if (error.request) {
        // The request was made but no response was received
        return {
            message: 'Network error. Please check your internet connection.',
            errors: null,
            status: 0,
        };
    } else {
        // Something happened in setting up the request that triggered an Error
        return {
            message: error.message || 'An unexpected error occurred',
            errors: null,
            status: -1,
        };
    }
};
