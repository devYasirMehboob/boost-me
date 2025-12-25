import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
// Screens
import IllustrationImg from '../../../../assets/Illustration.png';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <SafeAreaView style={styles.safeArea}>
                {/* Skip Button */}
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>

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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.footerText}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
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
    skipButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    skipText: {
        color: '#00D1FF',
        fontSize: 16,
        fontWeight: '600',
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
    footerText: {
        color: '#00D1FF',
        fontSize: 16,
        fontWeight: '600',
    },
    nextButton: {
        backgroundColor: '#00D1FF',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 12,
        shadowColor: "#00D1FF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OnboardingScreen;
