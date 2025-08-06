import FastImage from '@d11/react-native-fast-image';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image, Easing, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedDot = ({ delay }) => {

    const bounceValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const bounce = () => {
            return Animated.sequence([

                Animated.timing(bounceValue, {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),

                Animated.timing(bounceValue, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.in(Easing.quad),
                    useNativeDriver: true,
                }),
            ]);
        };

        const loop = Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                bounce(),
            ])
        );

        loop.start();

        return () => {
            loop.stop();
        };
    }, [bounceValue, delay]);

    const translateY = bounceValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20], // Jarak lompatan titik
    });
    return <Animated.View style={[styles.dot, { transform: [{ translateY }] }]} />;
};

const LoadingScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>

                {/* Kontainer untuk animasi titik */}
                <View style={styles.dotsContainer}>
                    <AnimatedDot delay={0} />
                    <AnimatedDot delay={200} />
                    <AnimatedDot delay={400} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#121212', // Warna latar belakang dark mode
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#A78BFA', // Warna ungu yang modern
        marginHorizontal: 8,
    },

});



export default LoadingScreen;