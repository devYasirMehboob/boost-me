import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
// Components
import Input from '@/components/Input';
import Button from '@/components/Button';
import SocialButton from '@/components/SocialButton';
import WelcomeBackground from '@/screens/welcome/components/WelcomeBackground';
import SuccessModal from '@/components/SuccessModal';

const { width, height } = Dimensions.get('window');

// Pexels placeholders for avatars (Matching Login Screen layout)
const AVATARS = [
    { uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', style: { top: height * 0.12, left: width * 0.1, width: 60, height: 60, borderColor: '#1F2E35' } },
    { uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', style: { top: height * 0.0, right: width * 0.2, width: 60, height: 60, borderColor: '#1F2E35' } },
    { uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', style: { top: height * 0.15, right: width * -0.08, width: 60, height: 60, borderColor: '#1F2E35' } },
    { uri: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150', style: { top: height * 0.17, right: width * 0.3, width: 60, height: 60, borderColor: '#D32F2F' } },
];

const SignupScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSignup = () => {
        // Implement signup logic here later
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            router.replace('/home');
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <WelcomeBackground />
            <SuccessModal
                visible={showSuccess}
                title="Account Created!"
                message="Your account has been successfully created. Welcome aboard!"
            />

            {/* Avatars Layer */}
            {AVATARS.map((avatar, index) => (
                <View key={index} style={[styles.avatarContainer, avatar.style]}>
                    <Image source={{ uri: avatar.uri }} style={styles.avatar} />
                </View>
            ))}

            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoidingView}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        {/* Back Button */}
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>

                        {/* Header Section */}
                        <View style={styles.header}>
                            <Text style={styles.title}>BoostMe</Text>
                            <Text style={styles.subtitle}>Create Account</Text>
                            <Text style={styles.descriptionText}>Sign up to start your journey</Text>
                        </View>

                        {/* Form Section */}
                        <View style={styles.form}>
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                value={name}
                                onChangeText={setName}
                            />

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

                            <Input
                                label="Confirm Password"
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />

                            <Button
                                title="Sign Up"
                                variant="primary"
                                onPress={handleSignup}
                                style={styles.signupButton}
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
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/login')}>
                                <Text style={styles.loginText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
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
        marginBottom: 30,
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
        marginBottom: 20,
    },
    signupButton: {
        marginTop: 10,
        width: '100%',
    },
    socialSection: {
        marginBottom: 20,
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
        marginTop: 10,
    },
    footerText: {
        color: '#A0AAB0',
        fontSize: 14,
    },
    loginText: {
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
        zIndex: 0,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
});

export default SignupScreen;
