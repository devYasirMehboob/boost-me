import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView } from 'react-native';
import WelcomeBackground from '../components/WelcomeBackground';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

// Pexels placeholders for avatars
const AVATARS = [
    { uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', style: { top: height * 0.05, left: width * 0.1, width: 60, height: 60, borderColor: '#1F2E35' } },
    { uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', style: { top: height * 0.08, right: width * 0.05, width: 50, height: 50, borderColor: '#1F2E35' } },
    { uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', style: { top: height * 0.2, left: width * 0.8, width: 70, height: 70, borderColor: '#1F2E35' } },
    { uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', style: { top: height * 0.25, left: width * 0.15, width: 80, height: 80, borderColor: '#FFC107' } }, // Highlighted one
    { uri: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150', style: { top: height * 0.15, left: width * 0.45, width: 60, height: 60, borderColor: '#D32F2F' } },
    { uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', style: { top: height * 0.65, left: width * 0.1, width: 65, height: 65, borderColor: '#D32F2F' } },
    { uri: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150', style: { bottom: height * 0.15, right: width * 0.3, width: 70, height: 70, borderColor: '#1F2E35' } },
    { uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150', style: { bottom: height * 0.1, left: width * 0.05, width: 55, height: 55, borderColor: '#1F2E35' } },
    { uri: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150', style: { bottom: height * 0.05, right: width * 0.1, width: 60, height: 60, borderColor: '#5E35B1' } },
];

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <WelcomeBackground />

            {/* Avatars Layer */}
            {AVATARS.map((avatar, index) => (
                <View key={index} style={[styles.avatarContainer, avatar.style]}>
                    <Image source={{ uri: avatar.uri }} style={styles.avatar} />
                </View>
            ))}

            {/* Content Layer (Clickable to start) */}
            <View style={styles.content} onStartShouldSetResponder={() => true} onResponderRelease={() => navigation.navigate('Onboarding')}>
                <Text style={styles.title}>BoostMe</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101F25',
    },
    avatarContainer: {
        position: 'absolute',
        borderRadius: 50,
        borderWidth: 2,
        overflow: 'hidden',
        // Add shadow for better integration
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#00D1FF', // Cyan color from image
        letterSpacing: 1,
        textShadowColor: 'rgba(0, 209, 255, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
        fontStyle: 'italic',
    },
});

export default WelcomeScreen;
