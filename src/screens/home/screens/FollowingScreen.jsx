import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const MOCK_FOLLOWING = [
    { id: '1', username: 'wade_w80', fullName: 'Wade Warren', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', isFollowing: true },
    { id: '2', username: 'leslie_alex', fullName: 'Leslie Alexander', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', isFollowing: true },
    { id: '3', username: 'robert_fox', fullName: 'Robert Fox', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150', isFollowing: true },
    { id: '4', username: 'dianne_r', fullName: 'Dianne Russell', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150', isFollowing: false },
    { id: '5', username: 'guy_hawkings1', fullName: 'Guy Hawkins', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', isFollowing: true },
    { id: '6', username: 'albert_flores89', fullName: 'Albert Flores', avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150', isFollowing: true },
    { id: '7', username: 'jenny_wilson', fullName: 'Jenny Wilson', avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150', isFollowing: true },
    { id: '8', username: 'jerome_bell', fullName: 'Jerome Bell', avatar: 'https://images.pexels.com/photos/842567/pexels-photo-842567.jpeg?auto=compress&cs=tinysrgb&w=150', isFollowing: true },
];

const MOCK_FOLLOWERS = [
    { id: 'f1', username: 'dianne_r', fullName: 'Dianne Russell', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'f2', username: 'albert_flores89', fullName: 'Albert Flores', avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'f3', username: 'jenny_wilson', fullName: 'Jenny Wilson', avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'f4', username: 'guy_hawkings1', fullName: 'Guy Hawkins', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'f5', username: 'wade_w80', fullName: 'Wade Warren', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'f6', username: 'leslie_alex', fullName: 'Leslie Alexander', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'f7', username: 'robert_fox', fullName: 'Robert Fox', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'f8', username: 'jerome_bell', fullName: 'Jerome Bell', avatar: 'https://images.pexels.com/photos/842567/pexels-photo-842567.jpeg?auto=compress&cs=tinysrgb&w=150' },
];

const FollowingScreen = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Following');
    const [searchQuery, setSearchQuery] = useState('');
    const [followingList, setFollowingList] = useState(MOCK_FOLLOWING);
    const [followersList, setFollowersList] = useState(MOCK_FOLLOWERS);

    const data = activeTab === 'Following' ? followingList : followersList;

    const filteredList = data.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleFollow = (id) => {
        setFollowingList(prev => prev.map(user =>
            user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
        ));
    };

    const handleRemove = (id) => {
        setFollowersList(prev => prev.filter(user => user.id !== id));
    };

    const renderItem = ({ item }) => (
        <View style={styles.userItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.fullName}>{item.fullName}</Text>
            </View>
            {activeTab === 'Following' ? (
                <TouchableOpacity
                    style={[
                        styles.followButton,
                        item.isFollowing ? styles.followingButton : styles.followButtonActive
                    ]}
                    onPress={() => toggleFollow(item.id)}
                >
                    <Text style={[
                        styles.followButtonText,
                        item.isFollowing ? styles.followingButtonText : styles.followButtonActiveText
                    ]}>
                        {item.isFollowing ? 'Following' : 'Follow'}
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={[styles.followButton, styles.followingButton]}
                    onPress={() => handleRemove(item.id)}
                >
                    <Text style={[styles.followButtonText, styles.followingButtonText]}>
                        Remove
                    </Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.moreButton}>
                <Feather name="more-horizontal" size={20} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Following</Text>
                    <View style={{ width: 44 }} />
                </View>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Following' && styles.activeTab]}
                        onPress={() => setActiveTab('Following')}
                    >
                        <Text style={[styles.tabText, activeTab === 'Following' && styles.activeTabText]}>Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Followers' && styles.activeTab]}
                        onPress={() => setActiveTab('Followers')}
                    >
                        <Text style={[styles.tabText, activeTab === 'Followers' && styles.activeTabText]}>Followers</Text>
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Feather name="search" size={20} color="#7A7A7A" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor="#7A7A7A"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                <FlatList
                    data={filteredList}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07030C', // Matching the unified background
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 60,
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    tabsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#1F1F1F',
        marginTop: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#00D1FF',
    },
    tabText: {
        color: '#7A7A7A',
        fontSize: 16,
        fontWeight: '600',
    },
    activeTabText: {
        color: '#00D1FF',
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 48,
        borderWidth: 1,
        borderColor: '#333333',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#1F1F1F',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    fullName: {
        color: '#7A7A7A',
        fontSize: 14,
        marginTop: 2,
    },
    followButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10,
        marginRight: 10,
        minWidth: 100,
        alignItems: 'center',
    },
    followingButton: {
        backgroundColor: '#1C1C1E',
        borderWidth: 1,
        borderColor: '#333333',
    },
    followButtonActive: {
        backgroundColor: '#00D1FF',
    },
    followButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    followingButtonText: {
        color: '#FFFFFF',
    },
    followButtonActiveText: {
        color: '#FFFFFF',
    },
    moreButton: {
        padding: 5,
    },
});

export default FollowingScreen;
