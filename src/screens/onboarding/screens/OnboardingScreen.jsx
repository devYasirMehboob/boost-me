import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import IllustrationImg from '../../../assets/Illustration.png';
import Button from '../../../components/Button';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <SafeAreaView style={styles.safeArea}>
                {/* Skip Button */}
                <View style={styles.skipButtonContainer}>
                    <Button
                        title="Skip"
                        variant="text"
                        onPress={() => router.replace('/home')}
                    />
                </View>

                {/* Illustration with specific styles */}
                <View style={styles.illustrationContainer}>
                    <Image source={IllustrationImg} height={220} width={275} />
                </View>

                {/* Content Area */}
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Discover Your Power</Text>
                    <Text style={styles.description}>
                        Boost your videos, grow faster, and earn while you create. Join thousands of creators leveling up with meaningful views and real engagement.
                    </Text>

                    {/* Pagination Dots */}
                    <View style={styles.paginationContainer}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>

                {/* Footer Navigation */}
                <View style={styles.footer}>
                    <Button
                        title="Back"
                        variant="text"
                        onPress={() => router.replace('/')}
                    />

                    <Button
                        title="Next"
                        variant="primary"
                        onPress={() => router.replace('/login')}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F1C22', // Deep dark green/black from image
        paddingHorizontal: 20,
    },
    safeArea: {
        flex: 1,
    },
    skipButtonContainer: {
        alignItems: 'flex-end',
        padding: 10,
    },
    illustrationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: 0.5,
        marginBottom: 30,
        marginTop: 0,
    },
    description: {
        fontSize: 16,
        color: '#A0AAB0', // Muted text color
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 10,
        marginBottom: 30,
    },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#2C3E45',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#5E60CE', // Purple active dot from image
        width: 12,
        height: 12,
        borderWidth: 2,
        borderColor: '#0F1C22', // Simulate ring effect if needed, simplistic for now
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default OnboardingScreen;
