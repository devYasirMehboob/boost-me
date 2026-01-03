import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Platform, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const SETTINGS_OPTIONS = [
    {
        id: 'account',
        label: 'Account',
        icon: <Feather name="user" size={24} color="#FFFFFF" />,
    },
    {
        id: 'notification',
        label: 'Notification',
        icon: <Feather name="bell" size={24} color="#FFFFFF" />,
    },
    {
        id: 'privacy',
        label: 'Privacy',
        icon: <Feather name="settings" size={24} color="#FFFFFF" />,
    },
    {
        id: 'payment',
        label: 'Payment',
        icon: <MaterialCommunityIcons name="wallet-outline" size={24} color="#FFFFFF" />,
    },
    {
        id: 'support',
        label: 'Support',
        icon: <Feather name="help-circle" size={24} color="#FFFFFF" />,
    },
    {
        id: 'about',
        label: 'About App',
        icon: <Feather name="info" size={24} color="#FFFFFF" />,
    },
    {
        id: 'logout',
        label: 'Logout',
        icon: <Feather name="log-out" size={24} color="#FFFFFF" />,
    },
];

const SettingsScreen = () => {
    const router = useRouter();
    const [isChangePhotoVisible, setIsChangePhotoVisible] = useState(false);
    const [profileImage, setProfileImage] = useState('https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150');

    const handleTakeImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
            setIsChangePhotoVisible(false);
        }
    };

    const handleUploadImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
            setIsChangePhotoVisible(false);
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        setIsChangePhotoVisible(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Profile Header Section */}
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            {profileImage ? (
                                <Image
                                    source={{ uri: profileImage }}
                                    style={styles.avatar}
                                />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Feather name="user" size={50} color="#7A7A7A" />
                                </View>
                            )}
                        </View>
                        <View style={styles.profileInfo}>
                            <View style={styles.nameRow}>
                                <Text style={styles.profileName}>Wanda Samantha</Text>
                                <MaterialCommunityIcons name="check-decagram" size={20} color="#00D1FF" style={styles.verifiedBadge} />
                            </View>
                            <Text style={styles.profileSubtext}>Universitas Brawijaya</Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.editButton}
                            activeOpacity={0.8}
                            onPress={() => router.push('/edit-profile')}
                        >
                            <Text style={styles.editButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.changePhotoButton}
                            onPress={() => setIsChangePhotoVisible(true)}
                        >
                            <Text style={styles.changePhotoText}>Change Photo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Settings List */}
                    <View style={styles.settingsList}>
                        {SETTINGS_OPTIONS.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.settingItem} activeOpacity={0.6}>
                                <View style={styles.iconContainer}>
                                    {item.icon}
                                </View>
                                <Text style={styles.settingLabel}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Spacer for bottom bar padding */}
                    <View style={{ height: 120 }} />
                </ScrollView>
            </SafeAreaView>

            {/* Change Photo Modal */}
            <Modal
                visible={isChangePhotoVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsChangePhotoVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsChangePhotoVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Change Photo</Text>

                                <TouchableOpacity style={styles.modalItem} onPress={handleTakeImage}>
                                    <Feather name="camera" size={24} color="#FFFFFF" style={styles.modalIcon} />
                                    <Text style={styles.modalItemText}>Take a photo</Text>
                                </TouchableOpacity>

                                <View style={styles.modalDivider} />

                                <TouchableOpacity style={styles.modalItem} onPress={handleUploadImage}>
                                    <Feather name="image" size={24} color="#FFFFFF" style={styles.modalIcon} />
                                    <Text style={styles.modalItemText}>Upload from gallery</Text>
                                </TouchableOpacity>

                                <View style={styles.modalDivider} />

                                <TouchableOpacity style={styles.modalItem} onPress={handleRemoveImage}>
                                    <Feather name="trash-2" size={24} color="#FF3B30" style={styles.modalIcon} />
                                    <Text style={[styles.modalItemText, { color: '#FF3B30' }]}>Remove Photo</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07030C', // Matching the dark theme from Wallet and Home
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 25,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: '#1A1A1A',
        marginRight: 20,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
    },
    profileInfo: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    verifiedBadge: {
        marginLeft: 8,
    },
    profileSubtext: {
        fontSize: 16,
        color: '#A0AAB0',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 35,
    },
    editButton: {
        backgroundColor: '#00D1FF',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 12,
        marginRight: 20,
    },
    editButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    changePhotoButton: {
        paddingVertical: 10,
    },
    changePhotoText: {
        color: '#00D1FF',
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#1F1F1F',
        marginBottom: 30,
        width: '100%',
    },
    settingsList: {
        width: '100%',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        paddingVertical: 5,
    },
    iconContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    settingLabel: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#1C1C1E',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 25,
        paddingTop: 30,
        paddingBottom: Platform.OS === 'ios' ? 45 : 30,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 30,
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
    },
    modalIcon: {
        marginRight: 20,
    },
    modalItemText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    modalDivider: {
        height: 1,
        backgroundColor: '#333333',
        width: '100%',
    },
});

export default SettingsScreen;
