import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, StatusBar, RefreshControl, ActivityIndicator, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomTabBar from '@/components/CustomTabBar';

// Services
import videoService from '@/services/videoService';

const { height } = Dimensions.get('window');

const MOCK_POSTS = [
    {
        id: '1',
        userName: 'Jenny Wilson',
        userHandle: '@nida_creator',
        userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        description: 'Hi everyone, in this video I will sing a song',
        tags: ['#song', '#music', '#love', '#beauty'],
        musicName: 'Favorite Girl by Justin Bieber',
        likes: '225.9K',
        comments: '24.8K',
        shares: '20.7K',
        videoUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' // Placeholder image for video
    },
    {
        id: '2',
        userName: 'Alex Rivera',
        userHandle: '@alex_vibe',
        userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        description: 'Check out this sunset! 🌅',
        tags: ['#nature', '#sunset', '#vibes'],
        musicName: 'Summer Breeze - Lofi Mix',
        likes: '120.4K',
        comments: '12.2K',
        shares: '15.1K',
        videoUrl: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
];

const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchVideos = async (refresh = false) => {
        if (refresh) setIsRefreshing(true);
        else setIsLoading(true);

        console.log('[API] [FEED] Fetching videos...');
        const result = await videoService.getAllVideos();
        console.log('[API] [FEED] [RESULT]:', result);

        if (result.success) {
            // Map the API data structure to match PostItem structure
            const mappedVideos = result.data.map(video => ({
                id: video._id,
                userName: video.user?.firstName ? `${video.user.firstName} ${video.user.lastName || ''}`.trim() : 'Anonymous',
                userHandle: video.user?.firstName ? `@${video.user.firstName.toLowerCase()}` : '@user',
                userAvatar: video.user?.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
                description: video.description || video.title || '',
                tags: video.tags || [],
                musicName: 'Original Audio',
                likes: video.likesCount?.toString() || '0',
                comments: video.commentsCount?.toString() || '0',
                shares: '0',
                videoUrl: video.videoUrl || video.rawVideoKey // Use videoUrl from backend
            }));
            setVideos(mappedVideos);
        } else {
            console.error('[FEED] [ERROR]:', result.message);
        }

        setIsLoading(false);
        setIsRefreshing(false);
    };

    React.useEffect(() => {
        fetchVideos();
    }, []);

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#00A8FF" />
                <Text style={styles.loadingText}>Loading Feed...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <FlatList
                data={videos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PostItem item={item} />}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToInterval={height}
                snapToAlignment="start"
                decelerationRate="fast"
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => fetchVideos(true)}
                        tintColor="#00A8FF"
                    />
                }
                getItemLayout={(data, index) => ({
                    length: height,
                    offset: height * index,
                    index,
                })}
                ListEmptyComponent={
                    <View style={[styles.centered, { height: height - 100 }]}>
                        <Text style={styles.emptyText}>No videos found</Text>
                    </View>
                }
            />

            <CustomTabBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#FFF',
        marginTop: 10,
        fontSize: 16,
    },
    emptyText: {
        color: '#A0AAB0',
        fontSize: 16,
    },
});

export default HomeScreen;
