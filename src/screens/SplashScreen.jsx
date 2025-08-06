import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { version } from '../../package.json';
import { auth } from '../../firebase/firebaseConfig';
import { onAuthStateChanged, reload } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Komponen utama SplashScreen
const SplashScreen = () => {
  const navigation = useNavigation();

  // Logika navigasi (sama seperti sebelumnya, tidak diubah)
  useEffect(() => {
    let unsubscribe;
    const checkAppState = async () => {
      const onboardingStatus = await AsyncStorage.getItem('onboardingStatus');
      const isGuest = await AsyncStorage.getItem('isGuest');

      if (onboardingStatus !== 'done') {
        navigation.replace('OnboardingScreen');
        return;
      }
      if (isGuest === 'true') {
        navigation.replace('MainScreen');
        return;
      }

      unsubscribe = onAuthStateChanged(auth, async user => {
        if (user) {
          try {
            await reload(user);
            if (user.isAnonymous) {
              navigation.replace('MainScreen');
              return;
            }
            const isGoogle = user.providerData.some(p => p.providerId === 'google.com');
            if (isGoogle || user.emailVerified) {
              navigation.replace('MainScreen');
            } else {
              navigation.replace('VerifyEmailScreen', { email: user.email });
            }
          } catch (err) {
            console.error('❌ Gagal reload user:', err.message);
            navigation.replace('LoginScreen');
          }
        } else {
          navigation.replace('LoginScreen');
        }
      });
    };

    const timer = setTimeout(checkAppState, 3500); // Beri waktu lebih untuk animasi

    return () => {
      clearTimeout(timer);
      if (unsubscribe) unsubscribe();
    };
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#000000', 'rgba(81, 8, 10, 1)']}
      style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1D1D27" />
      <AnimatedLogo />
      {/* Efek partikel */}
      {[...Array(10)].map((_, i) => (
        <Particle key={i} index={i} />
      ))}
      <AnimatedText />
      <Text style={styles.disclaimer}>
         HiyoriNime adalah proyek pembelajaran & portofolio, bersifat non-komersial. Dukung anime lewat platform resmi!<Text style={{color: '#fff'}}> Aplikasi akan diupdate kalau rajin 😹.</Text>
      </Text>
    </LinearGradient>
  );
};

// Komponen untuk animasi Logo dan Partikel
const AnimatedLogo = () => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          damping: 12,
          stiffness: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [scale, opacity]);

  const animatedStyle = {
    transform: [{ scale }],
    opacity,
  };

  return (
    <Animated.View style={animatedStyle}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/Images/play_store_512.png')}
        />
      </View>
    </Animated.View>
  );
};

// Komponen untuk animasi teks
const AnimatedText = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(1200),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          damping: 15,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [opacity, translateY]);

  const animatedStyle = {
    opacity,
    transform: [{ translateY }],
  };

  return (
    <Animated.View style={[styles.textContainer, animatedStyle]}>
      <Text style={styles.text}>Hiyorinime<Text style={{color: '#f10909ff'}}>.</Text></Text>
      <Text style={styles.textVersion}>v{version}</Text>
    </Animated.View>
  );
};

// Komponen untuk partikel individual
const Particle = ({ index }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(600 + index * 50),
      Animated.timing(progress, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [progress, index]);

  const angle = (index / 10) * 2 * Math.PI;
  const radius = 80;

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, radius * Math.cos(angle)],
    extrapolate: 'clamp',
  });

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, radius * Math.sin(angle)],
    extrapolate: 'clamp',
  });

  const scale = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.2, 0],
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0, 1, 0],
  });

  const animatedStyle = {
    transform: [{ translateX }, { translateY }, { scale }],
    opacity,
  };

  return <Animated.View style={[styles.particle, animatedStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  text: {
    fontSize: 36,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    letterSpacing: 1,
  },
  textVersion: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Poppins-Regular',
  },
  disclaimer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  particle: {
    position: 'absolute',
    left: '50%',
    top: '60%',
    marginLeft: -5,
    marginTop: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#A78BFA',
  },
});

export default SplashScreen;
