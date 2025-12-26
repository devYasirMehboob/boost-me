import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Button = ({ title, onPress, variant = 'primary', style, textStyle }) => {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isPrimary ? styles.primaryButton : styles.textButton,
                style
            ]}
            onPress={onPress}
        >
            <Text style={[
                styles.text,
                isPrimary ? styles.primaryText : styles.textVariantText,
                textStyle
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#00D1FF',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 12,
        shadowColor: "#00D1FF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    textButton: {
        backgroundColor: 'transparent',
        paddingHorizontal: 0, // Text buttons usually don't need horizontal padding like primary ones
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    primaryText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    textVariantText: {
        color: '#00D1FF',
    }
})

export default Button;

