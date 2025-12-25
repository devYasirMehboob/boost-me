import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useStore } from '@/store';
import { theme } from '@/theme';

const HomeScreen = ({ navigation }) => {
    const { user, login, logout, isAuthenticated } = useStore();

    useEffect(() => {
        // Example: Simulate fetching initial data
        console.log('Home Screen Mounted');
    }, []);

    const handleAuthAction = () => {
        if (isAuthenticated) {
            logout();
        } else {
            login({ name: 'User', id: 1 });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Boost Me App</Text>
            <View style={styles.card}>
                <Text style={styles.text}>
                    Status: {isAuthenticated ? `Logged in as ${user?.name}` : 'Guest'}
                </Text>
                <Button
                    title={isAuthenticated ? 'Logout' : 'Login Simulation'}
                    onPress={handleAuthAction}
                    color={theme.colors.primary}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.m,
    },
    title: {
        ...theme.typography.header,
        marginBottom: theme.spacing.xl,
    },
    card: {
        padding: theme.spacing.l,
        backgroundColor: '#F2F2F7',
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        ...theme.typography.body,
        marginBottom: theme.spacing.m,
    },
});

export default HomeScreen;
