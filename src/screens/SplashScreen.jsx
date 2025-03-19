import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { version } from '../../package.json'

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
        navigation.navigate("MainScreen");
    }, 4000);
  }, [])

  return (
    <LinearGradient colors={['#1a001f', '#000']} style={styles.container}>
      <AnimatedImage />
      <BouncingText />
      <Text 
        style={{
            position: "absolute",
            bottom: 40,
            left: 20,
            right: 20,
            color: "#cdcdcd",
            fontFamily: "NotoSans_SemiCondensed-Medium",
            fontSize: 12,
            textAlign: "center"
        }}
        >
            HiyoriNime dibuat untuk pembelajaran & portofolio. Masih versi beta dan akan terus diperbarui. Penggunaan aplikasi sepenuhnya tanggung jawab pengguna. Dukung kreator dengan menonton anime di platform resmi seperti Netflix, Crunchyroll, atau Bilibili!
        </Text>
    </LinearGradient>
  );
};

const BouncingText = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <>
        <Animated.Text style={[styles.text, { opacity }]}>Hiyorinime</Animated.Text>
        <Animated.Text style={[styles.textVersion, { opacity }]}>{version}</Animated.Text>
    </>
  );
};

const AnimatedImage = () => {
  const translateY = useRef(new Animated.Value(600)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        damping: 8,
        stiffness: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 2000,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatedStyle = {
    transform: [
      { translateY },
    ],
    opacity,
    marginBottom: 20,
  };

  return (
    <Animated.View style={animatedStyle}>
      <Image style={{ height: 120, width: 120, borderRadius: 100 }} source={require('../assets/Images/play_store_512.png')} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 34,
    color: '#fff',
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },

  textVersion: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },
});

export default SplashScreen;