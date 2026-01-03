import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Platform, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const EditProfileScreen = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState('Wanda');
    const [lastName, setLastName] = useState('Samantha');
    const [gender, setGender] = useState('female');
    const [email, setEmail] = useState('wanda2878@gmail.com');
    const [dob, setDob] = useState('June 1, 1995');
    const [bio, setBio] = useState('Indonesia');
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [emailError, setEmailError] = useState('');

    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handleUpdate = () => {
        if (emailError) {
            Alert.alert('Error', 'Please fix the errors before updating.');
            return;
        }
        router.back();
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Edit Profile</Text>
                        <View style={{ width: 24 }} />
                    </View>
                    {/* First Name */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>First name</Text>
                        <TextInput
                            style={styles.input}
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholderTextColor="#7A7A7A"
                        />
                    </View>

                    {/* Last Name */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Last name</Text>
                        <TextInput
                            style={styles.input}
                            value={lastName}
                            onChangeText={setLastName}
                            placeholderTextColor="#7A7A7A"
                        />
                    </View>

                    {/* Gender Selection */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Select gender</Text>
                        <View style={styles.genderRow}>
                            <TouchableOpacity
                                style={styles.genderOption}
                                onPress={() => setGender('male')}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.radioButton, gender === 'male' && styles.radioButtonSelected]}>
                                    {gender === 'male' ? (
                                        <Ionicons name="checkmark-circle" size={24} color="#00D1FF" />
                                    ) : (
                                        <View style={styles.radioInnerPlaceholder} />
                                    )}
                                </View>
                                <Text style={styles.genderText}>Male</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.genderOption}
                                onPress={() => setGender('female')}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.radioButton, gender === 'female' && styles.radioButtonSelected]}>
                                    {gender === 'female' ? (
                                        <Ionicons name="checkmark-circle" size={24} color="#00D1FF" />
                                    ) : (
                                        <View style={styles.radioInnerPlaceholder} />
                                    )}
                                </View>
                                <Text style={styles.genderText}>Female</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Email */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, emailError ? { borderBottomColor: '#FF3B30' } : {}]}
                            value={email}
                            onChangeText={validateEmail}
                            keyboardType="email-address"
                            placeholderTextColor="#7A7A7A"
                            autoCapitalize="none"
                        />
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    </View>

                    {/* Date of Birth */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Date of birth</Text>
                        <TouchableOpacity
                            style={styles.dobWrapper}
                            onPress={() => setIsDatePickerVisible(true)}
                            activeOpacity={0.7}
                        >
                            <TextInput
                                style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                                value={dob}
                                editable={false}
                                placeholderTextColor="#7A7A7A"
                            />
                            <Ionicons name="calendar-outline" size={24} color="#7A7A7A" style={styles.calendarIcon} />
                        </TouchableOpacity>
                        <View style={styles.inputDivider} />
                    </View>

                    {/* Bio */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Bio</Text>
                        <TextInput
                            style={styles.input}
                            value={bio}
                            onChangeText={setBio}
                            placeholderTextColor="#7A7A7A"
                        />
                    </View>

                    <View style={{ height: 100 }} />
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.updateButton} activeOpacity={0.8} onPress={handleUpdate}>
                        <Text style={styles.updateButtonText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Date Picker Modal */}
            <Modal
                visible={isDatePickerVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsDatePickerVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsDatePickerVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.datePickerContent}>
                                <Text style={styles.modalTitle}>Select Date</Text>

                                <ScrollView style={styles.dateList}>
                                    {['May 30, 1995', 'May 31, 1995', 'June 1, 1995', 'June 2, 1995', 'June 3, 1995'].map((date) => (
                                        <TouchableOpacity
                                            key={date}
                                            style={styles.dateItem}
                                            onPress={() => {
                                                setDob(date);
                                                setIsDatePickerVisible(false);
                                            }}
                                        >
                                            <Text style={[styles.dateText, dob === date && { color: '#00D1FF' }]}>{date}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>

                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setIsDatePickerVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
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
        backgroundColor: '#07030C',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    scrollContent: {
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    inputContainer: {
        marginBottom: 30,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    input: {
        color: '#FFFFFF',
        fontSize: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    genderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 40,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#7A7A7A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    radioButtonSelected: {
        borderColor: '#00D1FF',
        borderWidth: 0,
    },
    radioInnerPlaceholder: {
        width: 24,
        height: 24,
    },
    genderText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 5,
    },
    dobWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    calendarIcon: {
        paddingBottom: 8,
    },
    inputDivider: {
        height: 1,
        backgroundColor: '#333333',
        width: '100%',
    },
    footer: {
        paddingHorizontal: 25,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    },
    updateButton: {
        backgroundColor: '#00D1FF',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePickerContent: {
        width: '85%',
        backgroundColor: '#1C1C1E',
        borderRadius: 24,
        padding: 25,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    dateList: {
        width: '100%',
        maxHeight: 250,
    },
    dateItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
        alignItems: 'center',
    },
    dateText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#333333',
        borderRadius: 12,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default EditProfileScreen;
