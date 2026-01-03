import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomTabBar from '@/components/CustomTabBar';

const { width } = Dimensions.get('window');

const TRANSACTIONS = [
    { id: '1', title: 'Last transaction', time: 'Today • 02.35 pm', amount: '-$12', type: 'negative' },
    { id: '2', title: 'Last transaction', time: 'Today • 04.10 pm', amount: '+$500', type: 'positive' },
    { id: '3', title: 'Last transaction', time: 'Today • 02.35 pm', amount: '-$29', type: 'negative' },
    { id: '4', title: 'Last transaction', time: 'Yesterday • 11.20 am', amount: '-$50', type: 'negative' },
    { id: '5', title: 'Last transaction', time: 'Yesterday • 09.45 am', amount: '+$100', type: 'positive' },
];

const WalletScreen = () => {
    const router = useRouter();
    const [showBalance, setShowBalance] = useState(true);
    const [showAllTransactions, setShowAllTransactions] = useState(false);

    const displayedTransactions = showAllTransactions ? TRANSACTIONS : TRANSACTIONS.slice(0, 3);

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
                        <Text style={styles.headerTitle}>Wallet</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    {/* Balance Card */}
                    <View style={styles.balanceCard}>
                        <View style={styles.balanceHead}>
                            <View>
                                <View style={styles.balanceLabelContainer}>
                                    <Text style={styles.balanceLabel}>Your Balance</Text>
                                    <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                                        <Ionicons
                                            name={showBalance ? "eye-outline" : "eye-off-outline"}
                                            size={18}
                                            color="#FFFFFF"
                                            style={{ marginLeft: 8 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.balanceAmount}>
                                    {showBalance ? "£124.50" : "••••••"}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.pointsBadge}>
                                <Ionicons name="settings" size={14} color="#00D1FF" />
                                <Text style={styles.pointsText}>200.756</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.actionRow}>
                            <TouchableOpacity style={styles.actionItem}>
                                <View style={styles.actionIconCircle}>
                                    <MaterialCommunityIcons name="swap-vertical" size={18} color="#00D1FF" />
                                </View>
                                <Text style={styles.actionLabel}>Transfer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionItem}>
                                <View style={styles.actionIconCircle}>
                                    <MaterialCommunityIcons name="arrow-down-circle-outline" size={18} color="#00D1FF" />
                                </View>
                                <Text style={styles.actionLabel}>Request</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionItem}>
                                <View style={styles.actionIconCircle}>
                                    <MaterialCommunityIcons name="wallet-plus" size={18} color="#00D1FF" />
                                </View>
                                <Text style={styles.actionLabel}>Top Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionItem}>
                                <View style={styles.actionIconCircle}>
                                    <MaterialCommunityIcons name="tray-arrow-up" size={18} color="#00D1FF" />
                                </View>
                                <Text style={styles.actionLabel}>Withdraw</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Earnings Summary Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Earnings summary</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.summaryRow}>
                        <View style={styles.summaryCard}>
                            <View style={styles.cardHeader}>
                                <View style={[styles.summaryIconContainer, { backgroundColor: '#7B1FA2' }]}>
                                    <MaterialCommunityIcons name="currency-usd" size={20} color="#FFFFFF" />
                                </View>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name="dots-horizontal" size={20} color="#7A7A7A" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.summaryLabel}>This week</Text>
                            <Text style={styles.summaryValue}>£27.10</Text>
                        </View>

                        <View style={styles.summaryCard}>
                            <View style={styles.cardHeader}>
                                <View style={[styles.summaryIconContainer, { backgroundColor: '#E91E63' }]}>
                                    <MaterialCommunityIcons name="currency-usd" size={20} color="#FFFFFF" />
                                </View>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name="dots-horizontal" size={20} color="#7A7A7A" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.summaryLabel}>Total</Text>
                            <Text style={styles.summaryValue}>£312.78</Text>
                        </View>
                    </View>

                    {/* Latest Transactions Section */}
                    <View style={[styles.sectionHeader, { marginTop: 30 }]}>
                        <Text style={styles.sectionTitle}>Latest Transaction</Text>
                        <TouchableOpacity onPress={() => setShowAllTransactions(!showAllTransactions)}>
                            <Text style={styles.seeAllText}>
                                {showAllTransactions ? "Show Less" : "See All"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.transactionsContainer}>
                        {displayedTransactions.map((item) => (
                            <View key={item.id} style={styles.transactionItem}>
                                <View style={styles.transactionIconContainer}>
                                    <View style={styles.avatarPlaceholder} />
                                </View>
                                <View style={styles.transactionInfo}>
                                    <Text style={styles.transactionTitle}>{item.title}</Text>
                                    <Text style={styles.transactionTime}>{item.time}</Text>
                                </View>
                                <Text style={[styles.transactionAmount, item.type === 'positive' ? styles.positiveAmount : styles.negativeAmount]}>
                                    {item.amount}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={{ height: 120 }} />
                </ScrollView>
            </SafeAreaView>
            <CustomTabBar />
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
        marginBottom: 25,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    balanceCard: {
        backgroundColor: '#00D1FF',
        borderRadius: 24,
        padding: 24,
        marginBottom: 40,
    },
    balanceHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    balanceLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    balanceLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        opacity: 0.9,
    },
    balanceAmount: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: 'bold',
    },
    pointsBadge: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    pointsText: {
        color: '#1F2E35',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionItem: {
        alignItems: 'center',
    },
    actionIconCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionLabel: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    seeAllText: {
        fontSize: 14,
        color: '#7A7A7A',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryCard: {
        backgroundColor: '#13191C',
        width: (width - 55) / 2,
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#1F2E35',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryLabel: {
        color: '#A0AAB0',
        fontSize: 13,
        marginBottom: 4,
    },
    summaryValue: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    transactionsContainer: {
        gap: 12,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#13191C',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1F2E35',
    },
    transactionIconContainer: {
        marginRight: 15,
    },
    avatarPlaceholder: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
    },
    transactionInfo: {
        flex: 1,
    },
    transactionTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    transactionTime: {
        color: '#7A7A7A',
        fontSize: 12,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '700',
    },
    positiveAmount: {
        color: '#4ADE80',
    },
    negativeAmount: {
        color: '#F87171',
    },
});

export default WalletScreen;
