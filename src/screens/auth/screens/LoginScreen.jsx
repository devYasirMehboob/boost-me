import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'

// Components
import Input from '@/components/Input';
import Button from '@/components/Button';
import SocialButton from '@/components/SocialButton';
import WelcomeBackground from '@/screens/welcome/components/WelcomeBackground';
import SuccessModal from '@/components/SuccessModal';

// Services
import authService from '@/services/authService';

const { width, height } = Dimensions.get('window');

// Pexels placeholders for avatars (Subset for Login Screen - Top/Sides only)
const AVATARS = [
    {
        uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        style: { top: height * 0.12, left: width * 0.1, width: 60, height: 60, borderColor: '#1F2E35' }
    },
    {
        uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        style: { top: height * 0.0, right: width * 0.2, width: 60, height: 60, borderColor: '#1F2E35' }
    },
    {
        uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        style: { top: height * 0.15, right: width * -0.08, width: 60, height: 60, borderColor: '#1F2E35' }
    },
    {
        uri: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
        style: { top: height * 0.17, right: width * 0.3, width: 60, height: 60, borderColor: '#D32F2F' }
    },
];

const LoginScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState('fozia@gmail.com');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        // Basic Form Validation
        if (!email.trim() || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        console.log('[LOGIN] Attempting login for:', email);

        const result = await authService.login({
            email,
            password
        });

        console.log('[LOGIN] [RESULT]:', result);

        setIsLoading(false);

        if (result.success) {
            console.log('[LOGIN] [SUCCESS] Redirecting to home...');
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                router.replace('/home');
            }, 2000);
        } else {
            console.error('[LOGIN] [ERROR] Message:', result.message);
            Alert.alert('Login Failed', result.message);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidingView}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <View style={StyleSheet.absoluteFill}>
                            <WelcomeBackground />
                            {/* Avatars Layer */}
                            {AVATARS.map((avatar, index) => (
                                <View key={index} style={[styles.avatarContainer, avatar.style]}>
                                    <Image source={{ uri: avatar.uri }} style={styles.avatar} />
                                </View>
                            ))}
                        </View>
                        {/* Back Button */}
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>

                        {/* Header Section */}
                        <View style={styles.header}>
                            <Text style={styles.title}>BoostMe</Text>
                            <Text style={styles.subtitle}>Welcome back!</Text>
                            <Text style={styles.descriptionText}>Login to your account to continue</Text>
                        </View>

                        {/* Form Section */}
                        <View style={styles.form}>
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />

                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            {/* Options Row: Remember Me & Forgot Password */}
                            <View style={styles.optionsRow}>
                                <TouchableOpacity
                                    style={styles.rememberMeContainer}
                                    onPress={() => setRememberMe(!rememberMe)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                        {rememberMe && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                                    </View>
                                    <Text style={styles.rememberMeText}>Remember me</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => console.log('Forgot Password')}>
                                    <Text style={styles.forgotPasswordText}>Forgot?</Text>
                                </TouchableOpacity>
                            </View>

                            <Button
                                title={isLoading ? "Logging in..." : "Login"}
                                variant="primary"
                                onPress={handleLogin}
                                disabled={isLoading}
                                style={styles.loginButton}
                            />
                        </View>

                        {/* Social Login Section */}
                        <View style={styles.socialSection}>
                            <View style={styles.dividerContainer}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>Or continue with</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            <View style={styles.socialButtonsContainer}>
                                <SocialButton iconName="google" iconType="FontAwesome" onPress={() => console.log('Google')} />
                                <SocialButton iconName="apple" iconType="FontAwesome" onPress={() => console.log('Apple')} />
                                <SocialButton iconName="facebook" iconType="FontAwesome" onPress={() => console.log('Facebook')} />
                            </View>
                        </View>

                        {/* Footer Section */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/signup')}>
                                <Text style={styles.signUpText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView >
            <SuccessModal
                visible={showSuccess}
                title="Welcome Back!"
                message="You have successfully logged in to your account."
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F1C22',
    },
    safeArea: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    backButton: {
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'flex-start',
        padding: 5,
    },
    header: {
        marginTop: 80,
        marginBottom: 40,
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00A8FF',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 15,
    },
    descriptionText: {
        fontSize: 14,
        color: '#A0AAB0',
        marginTop: 8,
    },
    form: {
        width: '100%',
        marginBottom: 30,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#5A6A75',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: '#00D1FF',
        borderColor: '#00D1FF',
    },
    rememberMeText: {
        color: '#A0AAB0',
        fontSize: 14,
    },
    forgotPasswordText: {
        color: '#00D1FF',
        fontSize: 14,
        fontWeight: '600',
    },
    loginButton: {
        marginTop: 10,
        width: '100%',
    },
    socialSection: {
        marginBottom: 30,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#2C3E45',
    },
    dividerText: {
        color: '#A0AAB0',
        paddingHorizontal: 10,
        fontSize: 14,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: '#A0AAB0',
        fontSize: 14,
    },
    signUpText: {
        color: '#00D1FF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    avatarContainer: {
        position: 'absolute',
        borderRadius: 50,
        borderWidth: 2,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 0, // Ensure behind SafeAreaView content but above background
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
});

export default LoginScreen;
