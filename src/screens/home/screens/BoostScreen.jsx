import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const BOOST_OPTIONS = [
    { id: 1, range: '£1 -> £100', price: '£5', views: '+200 views' },
    { id: 2, range: '£1 -> £100', price: '£10', views: '+500 views' },
    { id: 3, range: '£1 -> £100', price: '£25', views: '+1,500 views' },
    { id: 4, range: '£1 -> £100', price: '£50', views: '+3,200 views' },
];

const BoostScreen = () => {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState(1);

    return (
        <LinearGradient
            colors={['#0e1a1a', '#020404']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="chevron-back" size={32} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Video Thumbnail Card */}
                    <View style={styles.thumbnailContainer}>
                        <Image
                            source={{ uri: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                            style={styles.thumbnail}
                        />
                        <View style={styles.playButtonContainer}>
                            <View style={styles.playButton}>
                                <Ionicons name="play" size={36} color="white" />
                            </View>
                        </View>
                    </View>

                    {/* Profile Section */}
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' }}
                                style={styles.avatar}
                            />
                            <View style={styles.plusBadge}>
                                <Ionicons name="add" size={10} color="black" />
                            </View>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.userName}>Motivation Day 12</Text>
                            <Text style={styles.userHandle}>@nida_creator</Text>
                        </View>
                    </View>

                    {/* Boost Options Grid */}
                    <View style={styles.grid}>
                        {BOOST_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.card,
                                    selectedId === option.id && styles.cardSelected
                                ]}
                                onPress={() => setSelectedId(option.id)}
                                activeOpacity={0.8}
                            >
                                <View style={[styles.rangeBadge, selectedId === option.id ? styles.rangeBadgeSelected : styles.rangeBadgeUnselected]}>
                                    <Text style={[styles.rangeText, selectedId === option.id ? styles.rangeTextSelected : styles.rangeTextUnselected]}>{option.range}</Text>
                                </View>

                                <View style={styles.cardHeader}>
                                    <Text style={styles.priceText}>{option.price}</Text>
                                    <View style={[styles.checkbox, selectedId === option.id && styles.checkboxSelected]}>
                                        {selectedId === option.id && <Ionicons name="checkmark" size={12} color="white" />}
                                    </View>
                                </View>

                                <Text style={styles.benefitsTitle}>Benefits :</Text>
                                <View style={styles.benefitRow}>
                                    <MaterialCommunityIcons name="check" size={18} color="white" />
                                    <Text style={styles.benefitText}>{option.views}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Bottom Button */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.confirmButton} activeOpacity={0.8}>
                            <Text style={styles.confirmButtonText}>Confirm Boost</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        height: 40,
        marginBottom: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    thumbnailContainer: {
        width: '100%',
        height: 250,
        borderRadius: 24,
        overflow: 'hidden',
        marginTop: 10,
        position: 'relative',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    playButtonContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -36.5,
        marginLeft: -36.5,
    },
    playButton: {
        width: 73,
        height: 73,
        backgroundColor: '#F00F0FCC',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 30,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15,
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
    },
    plusBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        backgroundColor: '#00D1FF',
        width: 14,
        height: 14,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        justifyContent: 'center',
    },
    userName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Urbanist',
    },
    userHandle: {
        color: '#A0AAB0',
        fontSize: 14,
        fontFamily: 'Urbanist',
        marginTop: 4,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: (width - 55) / 2,
        backgroundColor: '#262626',
        borderRadius: 24,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    cardSelected: {
        borderColor: '#00D1FF',
        backgroundColor: '#1A2A30',
    },
    rangeBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginBottom: 15,
    },
    rangeBadgeSelected: {
        backgroundColor: '#00D1FF',
    },
    rangeBadgeUnselected: {
        backgroundColor: '#4B4B4B',
    },
    rangeText: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Urbanist',
    },
    rangeTextSelected: {
        color: '#FFFFFF',
    },
    rangeTextUnselected: {
        color: '#B0B0B0',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    priceText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Urbanist',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#4B4B4B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: '#00D1FF',
        borderColor: '#00D1FF',
    },
    benefitsTitle: {
        color: 'white',
        fontSize: 14,
        marginBottom: 10,
        fontFamily: 'Urbanist',
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    benefitText: {
        color: 'white',
        fontSize: 14,
        marginLeft: 8,
        fontFamily: 'Urbanist',
    },
    footer: {
        width: '100%',
        marginTop: 10,
        marginBottom: 30,
    },
    confirmButton: {
        backgroundColor: '#00D1FF',
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Urbanist',
    },
});

export default BoostScreen;
