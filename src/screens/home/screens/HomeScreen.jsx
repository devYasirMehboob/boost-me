import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostItem from '../components/PostItem';
import CustomTabBar from '@/components/CustomTabBar';

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

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <FlatList
                data={MOCK_POSTS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PostItem item={item} />}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToInterval={height}
                snapToAlignment="start"
                decelerationRate="fast"
                getItemLayout={(data, index) => ({
                    length: height,
                    offset: height * index,
                    index,
                })}
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
});

export default HomeScreen;
