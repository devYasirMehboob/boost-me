import { create } from 'zustand';

// Example Slice: Auth Store
const createAuthSlice = (set) => ({
    user: null,
    isAuthenticated: false,
    login: (userData) => set({ user: userData, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
});

// Example Slice: UI Store
const createUISlice = (set) => ({
    theme: 'light',
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
});

// Combine slices
export const useStore = create((...a) => ({
    ...createAuthSlice(...a),
    ...createUISlice(...a),
}));
