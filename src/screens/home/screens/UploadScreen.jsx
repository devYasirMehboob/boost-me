import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar, TextInput, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Alert, ActivityIndicator } from 'react-native';

// Services
import uploadService from '@/services/uploadService';
import videoService from '@/services/videoService';

const { width } = Dimensions.get('window');

const INITIAL_THUMBNAILS = [
    { id: '1', uri: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: '2', uri: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=150' },
];

const INITIAL_TAGS = ['Tag 1', 'Tag 1', 'Tag 1'];

const UploadScreen = () => {
    const router = useRouter();
    const [caption, setCaption] = useState('');
    const [thumbnails, setThumbnails] = useState(INITIAL_THUMBNAILS);
    const [tags, setTags] = useState(INITIAL_TAGS);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const pickVideo = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['videos'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedVideo(result.assets[0].uri);
            // In a real app, we might generate a thumbnail here
            // For now, we'll just indicate a video was selected
        }
    };

    const removeThumbnail = (id) => {
        setThumbnails(thumbnails.filter(item => item.id !== id));
    };

    const removeTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const handlePublish = async () => {
        if (!selectedVideo) {
            Alert.alert('Error', 'Please select a video to upload');
            return;
        }

        if (!caption.trim()) {
            Alert.alert('Error', 'Please add a caption');
            return;
        }

        setIsUploading(true);
        console.log('[UPLOAD] Starting upload process for:', selectedVideo);

        try {
            // 1. Request Presigned URL
            const fileName = selectedVideo.split('/').pop();
            const fileType = 'video/mp4'; // Defaulting to mp4 for now

            console.log('[API] [UPLOAD] Requesting presigned URL...');
            const urlResult = await uploadService.requestUploadUrl({
                fileName,
                contentType: fileType,
            });

            if (!urlResult.success) {
                throw new Error(urlResult.message || 'Failed to get upload URL');
            }

            const { uploadUrl, key } = urlResult.data;
            console.log('[API] [UPLOAD] [SUCCESS] Received key:', key);

            // 2. Upload to S3
            console.log('[API] [UPLOAD] Uploading file to S3...');
            const s3Result = await uploadService.uploadToS3(uploadUrl, selectedVideo, fileType);

            if (!s3Result.success) {
                throw new Error('Failed to upload video to storage');
            }
            console.log('[API] [UPLOAD] [SUCCESS] File uploaded to S3');

            // 3. Create Video Record in Database
            console.log('[API] [UPLOAD] Creating video record in database...');
            const videoResult = await videoService.createVideo({
                title: caption.substring(0, 50),
                description: caption,
                videoUrl: `https://boost-me-bucket.s3.amazonaws.com/${key}`, // Placeholder S3 URL logic
                rawVideoKey: key,
                tags: tags,
            });

            if (!videoResult.success) {
                throw new Error(videoResult.message || 'Failed to create video record');
            }

            console.log('[UPLOAD] [COMPLETE] Video published successfully ID:', videoResult.data._id);
            Alert.alert('Success', 'Your video has been published!', [
                { text: 'OK', onPress: () => router.replace('/home') }
            ]);

        } catch (error) {
            console.error('[UPLOAD] [ERROR]:', error.message);
            Alert.alert('Upload Failed', error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Upload Screen</Text>
                        <View style={{ width: 44 }} />
                    </View>

                    {/* Upload Cloud Section */}
                    <TouchableOpacity
                        style={[styles.uploadContainer, selectedVideo && styles.uploadContainerActive]}
                        activeOpacity={0.7}
                        onPress={pickVideo}
                    >
                        <View style={[styles.cloudCircle, selectedVideo && styles.cloudCircleActive]}>
                            <MaterialCommunityIcons
                                name={selectedVideo ? "check-circle" : "cloud-upload"}
                                size={32}
                                color="#FFFFFF"
                            />
                        </View>
                        <Text style={styles.uploadText}>
                            {selectedVideo ? "Video Selected" : "Upload Video from device"}
                        </Text>
                        {selectedVideo && (
                            <Text style={styles.videoUriText} numberOfLines={1}>
                                {selectedVideo.split('/').pop()}
                            </Text>
                        )}
                    </TouchableOpacity>

                    {/* Thumbnails Section */}
                    <View style={styles.thumbnailsWrapper}>
                        {thumbnails.map((item) => (
                            <View key={item.id} style={styles.thumbnailContainer}>
                                <Image source={{ uri: item.uri }} style={styles.thumbnail} />
                                <View style={styles.playIconOverlay}>
                                    <Ionicons name="play" size={16} color="#00D1FF" />
                                </View>
                                <TouchableOpacity
                                    style={styles.removeIconBadge}
                                    onPress={() => removeThumbnail(item.id)}
                                >
                                    <Ionicons name="close" size={12} color="#000000" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    {/* Caption Section */}
                    <View style={styles.inputSection}>
                        <TextInput
                            style={styles.captionInput}
                            placeholder="Add Caption here"
                            placeholderTextColor="#7A7A7A"
                            value={caption}
                            onChangeText={setCaption}
                            multiline
                        />
                    </View>

                    {/* Tags Section */}
                    <View style={styles.tagsContainer}>
                        {tags.map((tag, index) => (
                            <View key={index} style={styles.tagItem}>
                                <Text style={styles.tagText}>{tag}</Text>
                                <TouchableOpacity
                                    style={styles.tagRemoveBadge}
                                    onPress={() => removeTag(index)}
                                >
                                    <Ionicons name="close" size={10} color="#000000" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    {/* Spacer for Bottom Button or Keyboard avoidance if needed */}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </SafeAreaView>

            {/* Bottom Button Fixed at bottom of screen (not scroll) to match standard UI patterns or layout depending on scroll intent */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.publishButton, isUploading && { opacity: 0.7 }]}
                    activeOpacity={0.8}
                    onPress={handlePublish}
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.publishButtonText}>Publish</Text>
                    )}
                </TouchableOpacity>
            </View>
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
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1F1F1F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    uploadContainer: {
        width: '100%',
        height: 220,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        marginBottom: 25,
    },
    cloudCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#00D1FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    uploadText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    thumbnailsWrapper: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    thumbnailContainer: {
        width: 100,
        height: 80,
        borderRadius: 16,
        marginRight: 15,
        position: 'relative',
        overflow: 'visible',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    playIconOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -10,
        marginTop: -10,
    },
    removeIconBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0A0A0A',
    },
    inputSection: {
        marginBottom: 20,
    },
    captionInput: {
        width: '100%',
        minHeight: 60,
        backgroundColor: '#121212',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#333333',
        padding: 20,
        color: '#FFFFFF',
        textAlignVertical: 'top',
        fontSize: 14,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#121212',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333333',
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 12,
        marginBottom: 12,
        position: 'relative',
    },
    tagText: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    tagRemoveBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0A0A0A',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 25,
        backgroundColor: 'transparent',
    },
    publishButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#00D1FF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    publishButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    uploadContainerActive: {
        borderColor: '#00D1FF',
        backgroundColor: '#0E1D21',
    },
    cloudCircleActive: {
        backgroundColor: '#4ADE80',
    },
    videoUriText: {
        color: '#7A7A7A',
        fontSize: 12,
        marginTop: 5,
        paddingHorizontal: 20,
    },
});

export default UploadScreen;
