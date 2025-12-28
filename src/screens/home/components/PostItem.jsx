import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Fontisto } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const PostItem = ({ item }) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const tabBarHeight = 70 + insets.bottom;

    return (
        <View style={styles.container}>
            {/* Background Image / Placeholder for Video */}
            <ImageBackground
                source={{ uri: item.videoUrl }} // Using imageUrl as placeholder
                style={styles.videoPlaceholder}
                resizeMode="cover"
            >
                {/* Center Play Button Overlay */}
                <View style={styles.centerPlayContainer}>
                    <View style={styles.playButton}>
                        <Ionicons name="play" size={36} color="white" />
                    </View>
                </View>

                {/* Right Side Actions */}
                <View style={[styles.rightActions, { bottom: tabBarHeight + 20 }]}>
                    <TouchableOpacity style={styles.actionItem}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="heart" size={32} color="#00D1FF" />
                        </View>
                        <Text style={styles.actionText}>{item.likes}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionItem}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="chatbubble-ellipses" size={32} color="white" />
                        </View>
                        <Text style={styles.actionText}>{item.comments}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionItem}
                        onPress={() => router.push('/boost')}
                    >
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="airplane" size={32} color="white" style={{ transform: [{ rotate: '-45deg' }] }} />
                        </View>
                        <Text style={styles.actionText}>Boost</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionItem}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="share" size={32} color="white" />
                        </View>
                        <Text style={styles.actionText}>{item.shares}</Text>
                    </TouchableOpacity>
                </View>

                {/* Bottom Content Overlay */}
                <View style={[styles.bottomOverlay, { bottom: tabBarHeight + 10 }]}>
                    <View style={styles.userInfo}>
                        <View style={styles.avatarContainer}>
                            <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
                            <View style={styles.plusBadge}>
                                <Ionicons name="add" size={12} color="black" />
                            </View>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.userName}>{item.userName}</Text>
                            <Text style={styles.userHandle}>{item.userHandle}</Text>
                        </View>
                    </View>

                    <Text style={styles.description} numberOfLines={2}>
                        {item.description}
                    </Text>

                    <Text style={styles.tags}>
                        {item.tags.join(' ')}
                    </Text>

                    <View style={styles.musicRow}>
                        <View style={styles.musicIconCircle}>
                            <Image source={{ uri: item.userAvatar }} style={styles.spinningDisc} />
                        </View>
                        <Fontisto name="music-note" size={16} color="white" style={{ marginLeft: 3 }} />
                        <Text style={styles.musicText} numberOfLines={1}>
                            {item.musicName}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#000',
    },
    videoPlaceholder: {
        flex: 1,
        width: '100%',
        height: '277',
    },
    centerPlayContainer: {
        position: 'absolute',
        top: '35%',
        left: '50%',
        marginLeft: -36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        width: 73,
        height: 73,
        backgroundColor: '#F00F0FCC', // Red play button as in design
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightActions: {
        position: 'absolute',
        right: 15,
        alignItems: 'center',
    },
    actionItem: {
        alignItems: 'center',
        marginBottom: 20,
    },
    iconContainer: {
        marginBottom: 5,
    },
    actionText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    bottomOverlay: {
        position: 'absolute',
        left: 20,
        right: 80,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 10,
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
        width: 12,
        height: 12,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameContainer: {
        justifyContent: 'center',
    },
    userName: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Urbanist',
    },
    userHandle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontFamily: 'Urbanist',
        marginTop: 3,
    },
    description: {
        color: 'white',
        fontSize: 12,
        lineHeight: 20,
        marginBottom: 8,
        fontFamily: 'Urbanist',
    },
    tags: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Urbanist',
        marginBottom: 15,
    },
    musicRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    musicIconCircle: {
        width: 20,
        height: 20,
        borderRadius: 16,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinningDisc: {
        width: 20,
        height: 20,
        borderRadius: 10,

    },
    musicText: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'Urbanist',
        marginLeft: 4,
    },
});

export default PostItem;
