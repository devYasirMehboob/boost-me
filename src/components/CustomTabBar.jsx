import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons, MaterialCommunityIcons, } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const CustomTabBar = () => {
    const insets = useSafeAreaInsets();

    // Smooth curve path (Refined for circular dip)
    const barHeight = 30;
    const centerX = width / 2;
    const radius = 45; // Slightly larger for better fit

    // Path creates a smooth circular-like dip using cubic beziers
    const path = `
        M 0 0
        H ${centerX - 60}
        C ${centerX - 42} 0, ${centerX - 42} ${radius}, ${centerX} ${radius}
        C ${centerX + 42} ${radius}, ${centerX + 42} 0, ${centerX + 60} 0
        H ${width}
        V ${barHeight + insets.bottom + 25}
        H 0
        Z
    `;

    return (
        <View style={[styles.container, { height: barHeight + insets.bottom + 25 }]}>
            <View style={styles.svgContainer}>
                <Svg width={width} height={barHeight + insets.bottom + 25} viewBox={`0 0 ${width} ${barHeight + insets.bottom + 25}`}>
                    <Path d={path} fill="#07030C" />
                </Svg>
            </View>

            <View style={[styles.content, { paddingBottom: insets.bottom }]}>
                <TouchableOpacity style={styles.tabItem}>
                    <MaterialCommunityIcons name="home-variant-outline" size={28} color="#00D1FF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="search-outline" size={26} color="#7A7A7A" />
                </TouchableOpacity>

                <View style={styles.centerSpace} />

                <TouchableOpacity style={styles.tabItem}>
                    <MaterialCommunityIcons name="wallet-outline" size={26} color="#7A7A7A" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="person-circle-outline" size={28} color="#7A7A7A" />
                </TouchableOpacity>
            </View>

            {/* Raised Center Button */}
            <TouchableOpacity
                style={[styles.centerButton, { bottom: insets.bottom + 15 }]}
                activeOpacity={0.8}
            >
                <View style={styles.centerButtonInner}>
                    <MaterialCommunityIcons name="file-upload" size={28} color="#FFFFFF" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: width,
        backgroundColor: 'transparent',
    },
    svgContainer: {
        position: 'absolute',
        bottom: 0,
    },
    content: {
        flexDirection: 'row',
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerSpace: {
        width: 80,
    },
    centerButton: {
        position: 'absolute',
        left: width / 2 - 28,
        width: 57,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#00D1FF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#00D1FF",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
    },
    centerButtonInner: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CustomTabBar;
