import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Komponen Ikon & Ilustrasi (SVG) ---
const LockIllustration = () => (
  <Svg width="100%" height="100%" viewBox="0 0 200 200">
    <Defs>
      <SvgLinearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#a78bfa" />
        <Stop offset="1" stopColor="#e94560" />
      </SvgLinearGradient>
    </Defs>
    <Path
      d="M160 90H150V70C150 42.38 127.62 20 100 20C72.38 20 50 42.38 50 70V90H40C34.48 90 30 94.48 30 100V170C30 175.52 34.48 180 40 180H160C165.52 180 170 175.52 170 170V100C170 94.48 165.52 90 160 90ZM100 145C94.48 145 90 140.52 90 135C90 129.48 94.48 125 100 125C105.52 125 110 129.48 110 135C110 140.52 105.52 145 100 145ZM130 90H70V70C70 53.43 83.43 40 100 40C116.57 40 130 53.43 130 70V90Z"
      fill="url(#grad1)"
    />
  </Svg>
);

// --- Komponen Utama ---
const GuestInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    description = "Anda harus masuk ke akun untuk dapat menyimpan anime ke daftar favorit, melanjutkan tontonan, dan menikmati fitur personalisasi lainnya.",
    targetFeature = "Fitur Pilihan"
  } = route.params || {};

  return (
    <LinearGradient colors={['#111827', '#1a1a2e']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.card}>
            {/* Ilustrasi */}
            <View style={styles.illustrationContainer}>
              <LockIllustration />
            </View>

            {/* Judul Gradien tanpa MaskedView */}
            <LinearGradient
              colors={['#a78bfa', '#e94560']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientTitleContainer}
            >
              <Text style={styles.gradientTitleText}>Fitur Terkunci</Text>
            </LinearGradient>

            {/* Deskripsi */}
            <Text style={styles.description}>{description}</Text>

            {/* Fitur yang dituju */}
            <View style={styles.featureBox}>
              <Text style={styles.featureLabel}>Fitur yang ingin Anda akses:</Text>
              <Text style={styles.featureValue}>{targetFeature}</Text>
            </View>

            {/* Tombol Aksi (Login) */}
            <TouchableOpacity onPress={async() => {
                await AsyncStorage.setItem('isGuest', 'false');
                navigation.navigate('LoginScreen');
            }}>
              <LinearGradient
                colors={['#8B5CF6', '#6D28D9']}
                style={styles.loginButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.loginButtonText}>Login untuk Melanjutkan</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Tombol Kembali */}
          <TouchableOpacity onPress={() => navigation.replace('MainScreen')} style={styles.backButton}>
            <Text style={styles.backButtonText}>Kembali</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  illustrationContainer: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  gradientTitleContainer: {
    marginBottom: 16,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  gradientTitleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  featureBox: {
    backgroundColor: 'rgba(17, 24, 39, 0.9)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 32,
    width: '100%',
  },
  featureLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  featureValue: {
    fontSize: 18,
    color: '#C4B5FD',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
  loginButton: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold'
  },
  backButton: {
    marginTop: 24,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default GuestInfoScreen;
