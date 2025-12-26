import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const SocialButton = ({ iconName, iconType = 'FontAwesome', onPress, style, iconSize = 24, iconColor = '#FFFFFF' }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            {iconType === 'Ionicons' ? (
                <Ionicons name={iconName} size={iconSize} color={iconColor} />
            ) : (
                <FontAwesome name={iconName} size={iconSize} color={iconColor} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 75,
        height: 51,
        borderRadius: 13,
        backgroundColor: '#1E2C33',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2A2B39',
        marginHorizontal: 10,
        // Add shadow/elevation
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
});

export default SocialButton;
