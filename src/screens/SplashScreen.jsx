import {View, Text, StyleSheet, Image, Animated, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {version} from '../../package.json';
import {auth} from '../../firebase/firebaseConfig';
import {onAuthStateChanged, reload} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();

useEffect(() => {
  let unsubscribe;

  const checkAppState = async () => {
    const onboardingStatus = await AsyncStorage.getItem('onboardingStatus');

    if (onboardingStatus !== 'done') {
      console.log('🍼 Belum onboarding → OnboardingScreen');
      navigation.replace('OnboardingScreen');
      return;
    }

    console.log('⏳ Menunggu Auth State...');
    console.log('[SplashScreen] useEffect is running');

    unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        console.log('👤 User login terdeteksi:', user.email || '[Anonymous]');

        try {
          await reload(user);
          console.log('🔄 Reload sukses');

          if (user.isAnonymous) {
            console.log('👻 Anonymous user → MainScreen');
            navigation.replace('MainScreen');
            return;
          }

          const isGoogle = user.providerData.some(
            provider => provider.providerId === 'google.com'
          );

          if (isGoogle || user.emailVerified) {
            console.log('✅ Verified user → MainScreen');
            navigation.replace('MainScreen');
          } else {
            console.log('📧 Belum verifikasi email → VerifyEmailScreen');
            navigation.replace('VerifyEmailScreen', { email: user.email });
          }
        } catch (err) {
          console.error('❌ Gagal reload user:', err.message);
          navigation.replace('LoginScreen');
        }
      } else {
        console.log('🚫 Belum login → LoginScreen');
        navigation.replace('LoginScreen');
      }
    });
  };

  const timer = setTimeout(() => {
    checkAppState();
  }, 2000);

  return () => {
    console.log('[SplashScreen] useEffect is cleaned up');
    clearTimeout(timer);
    if (unsubscribe) unsubscribe();
  };
}, []);


  return (
    <LinearGradient
      colors={['#000', 'rgba(81, 8, 10, 1)']}
      style={styles.container}>
      <AnimatedImage />
      <BouncingText />
      <Text
        style={{
          position: 'absolute',
          bottom: 40,
          left: 20,
          right: 20,
          color: '#cdcdcd',
          fontFamily: 'NotoSans_SemiCondensed-Medium',
          fontSize: 12,
          textAlign: 'center',
        }}>
        HiyoriNime dibuat untuk pembelajaran & portofolio. Masih versi beta dan
        akan terus diperbarui. Penggunaan aplikasi sepenuhnya tanggung jawab
        pengguna. Dukung kreator dengan menonton anime di platform resmi seperti
        Netflix, Crunchyroll, atau Bilibili!
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
      <Animated.Text style={[styles.text, {opacity}]}>Hiyorinime</Animated.Text>
      <Animated.Text style={[styles.textVersion, {opacity}]}>
        {version}
      </Animated.Text>
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
    transform: [{translateY}],
    opacity,
    marginBottom: 20,
  };

  return (
    <Animated.View style={animatedStyle}>
      <Image
        style={{height: 120, width: 120, borderRadius: 100}}
        source={require('../assets/Images/play_store_512.png')}
      />
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
