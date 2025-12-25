export const colors = {
    primary: '#007AFF', // Example primary color
    secondary: '#5856D6',
    background: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
    error: '#FF3B30',
    success: '#34C759',
    border: '#C6C6C8',
};

export const spacing = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
};

export const typography = {
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
    },
    subheader: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
    },
    body: {
        fontSize: 16,
        color: colors.text,
    },
    caption: {
        fontSize: 12,
        color: colors.textSecondary,
    },
};

export const theme = {
    colors,
    spacing,
    typography,
};
