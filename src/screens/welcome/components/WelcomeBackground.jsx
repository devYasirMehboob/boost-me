import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeBackground = () => {
    return (
        <View style={StyleSheet.absoluteFill}>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
                {/* Dark Background */}
                <Path
                    d={`M0 0 H${width} V${height} H0 Z`}
                    fill="#101F25" // Dark greenish/black background from image
                />

                {/* Curved connecting lines - mimicking the network graph */}
                <Path
                    d={`M${width * 0.1} 0 Q${width * 0.2} ${height * 0.3} 0 ${height * 0.4}`}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1"
                    fill="none"
                />
                <Path
                    d={`M${width} ${height * 0.1} Q${width * 0.5} ${height * 0.3} ${width * 0.8} ${height * 0.6}`}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1"
                    fill="none"
                />
                <Path
                    d={`M0 ${height} Q${width * 0.3} ${height * 0.7} ${width * 0.2} ${height * 0.5}`}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1"
                    fill="none"
                />
                <Path
                    d={`M${width * 0.5} ${height} Q${width * 0.7} ${height * 0.8} ${width} ${height * 0.7}`}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1"
                    fill="none"
                />
            </Svg>
        </View>
    );
};

export default WelcomeBackground;
