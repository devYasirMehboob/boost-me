import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const Dot = ({ index, color, size, speed }) => {
    const scale = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        const delay = (speed * 1.111) * (index * -0.125); // Corresponds to CSS delays
        
        const animation = Animated.parallel([
            Animated.sequence([
                Animated.delay(Math.max(0, delay)),
                Animated.loop(
                    Animated.sequence([
                        Animated.parallel([
                            Animated.timing(scale, {
                                toValue: 1,
                                duration: (speed * 1.111) / 2,
                                useNativeDriver: true,
                                easing: Easing.inOut(Easing.ease),
                            }),
                            Animated.timing(opacity, {
                                toValue: 1,
                                duration: (speed * 1.111) / 2,
                                useNativeDriver: true,
                                easing: Easing.inOut(Easing.ease),
                            }),
                        ]),
                        Animated.parallel([
                            Animated.timing(scale, {
                                toValue: 0,
                                duration: (speed * 1.111) / 2,
                                useNativeDriver: true,
                                easing: Easing.inOut(Easing.ease),
                            }),
                            Animated.timing(opacity, {
                                toValue: 0.5,
                                duration: (speed * 1.111) / 2,
                                useNativeDriver: true,
                                easing: Easing.inOut(Easing.ease),
                            }),
                        ]),
                    ])
                )
            ])
        ]);

        animation.start();
        return () => animation.stop();
    }, [speed, index]);

    const rotation = `${index * 45}deg`;

    return (
        <View style={[styles.dotContainer, { transform: [{ rotate: rotation }] }]}>
            <Animated.View 
                style={[
                    styles.dot, 
                    { 
                        backgroundColor: color,
                        width: size * 0.2,
                        height: size * 0.2,
                        transform: [{ scale }],
                        opacity,
                    }
                ]} 
            />
        </View>
    );
};

const DotLoader = ({ size = 50, color = '#00D1FF', speed = 900 }) => {
    return (
        <View style={[styles.container, { width: size, height: size }]}>
            {[...Array(8)].map((_, i) => (
                <Dot key={i} index={i} color={color} size={size} speed={speed} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dot: {
        borderRadius: 100,
        marginTop: '0%', // This positions the dot at the top of the container
        shadowColor: "#121F35",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
});

export default DotLoader;
