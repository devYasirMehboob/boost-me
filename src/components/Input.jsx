import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType = 'default',
    autoCapitalize = 'none'
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputContainer,
                isFocused && styles.focusedInputContainer
            ]}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#5A6A75"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        color: '#FFFFFF',
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    inputContainer: {
        borderBottomColor: '#2C3E45',
        borderBottomWidth: 1,
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
    },
    focusedInputContainer: {
        borderColor: '#00D1FF',
        backgroundColor: 'transparent',
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        paddingHorizontal: 15,
        fontSize: 16,
        marginLeft: 0,
        backgroundColor: 'transparent',
    },
});

export default Input;
