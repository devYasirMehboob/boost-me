import React from 'react';
import { View, Text, StyleSheet, Modal, Image, Dimensions } from 'react-native';
import DotLoader from './DotLoader';

const { width } = Dimensions.get('window');

const SuccessModal = ({ visible, title = "Success!", message = "Your action was completed successfully." }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={styles.overlay}>
                <View style={styles.modalCard}>
                    {/* Header Image/Avatar */}
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require('../assets/success-model-avatar.png')}
                            style={styles.avatar}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Content */}
                    <View style={styles.content}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.message}>{message}</Text>

                        {/* Dynamic Loader */}
                        <View style={styles.loaderContainer}>
                            <DotLoader size={60} color="#00D1FF" speed={900} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCard: {
        width: width * 0.85,
        backgroundColor: '#1E2C33',
        borderRadius: 24,
        paddingTop: 0,
        paddingBottom: 40,
        paddingHorizontal: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2C3E45',
        // Shadow for premium feel
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 20,
    },
    avatarContainer: {
        marginTop: -60, // Pull up to overlap top edge (if desired) or just stay centered
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    content: {
        alignItems: 'center',
        marginTop: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 12,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#A0AAB0',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
    },
    loaderContainer: {
        marginTop: 10,
    },
});

export default SuccessModal;
