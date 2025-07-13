import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Path } from 'react-native-svg';
import { onAuthStateChanged, reload, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';

const { width } = Dimensions.get('window');

const VerifyEmailScreen = ({ navigation }) => {
  const intervalRef = useRef(null);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [userEmail, setUserEmail] = useState(null);

  // ⏱️ Timer countdown reusable
  const startCountdown = () => {
    setCanResend(false);
    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    console.log('📨 [VerifyEmailScreen] Memulai observasi user...');
    startCountdown(); // mulai timer saat screen muncul

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('🕵️‍♂️ [Auth State Changed] User login terdeteksi:', user.email);
        setUserEmail(user.email);

        intervalRef.current = setInterval(async () => {
          try {
            await reload(user);
            console.log('🔄 [Reload Loop] Email verified?', user.emailVerified);

            if (user.emailVerified) {
              clearInterval(intervalRef.current);
              console.log('🎉 Email berhasil diverifikasi!');
              await auth.signOut();
              ToastAndroid.show('Email Terverifikasi. Silakan login kembali', ToastAndroid.SHORT);
              navigation.replace('LoginScreen');
            } else {
              console.log('📧 Masih belum verif... nungguin...');
            }
          } catch (err) {
            console.error('❌ Error saat reload:', err.message);
          }
        }, 3000);
      } else {
        console.warn('⚠️ Belum login, sabar yaa...');
      }
    });

    return () => {
      console.log('🧹 [Cleanup] Hapus observer & timer!');
      unsubscribe();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleResendVerification = async () => {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user);
        startCountdown();
      } catch (err) {
        console.error('❌ Gagal kirim ulang email:', err.message);
        Alert.alert('❌ Gagal Kirim Ulang', err.message || 'Coba lagi nanti ya');
      }
    }
  };

  return (
    <LinearGradient colors={['#0f0f0f', '#1e1e1e']} style={styles.container}>
      <View style={styles.brandContainer}>
        <Text style={styles.brand}>
          HiyoriNime<Text style={{ color: '#f33421' }}>.</Text>
        </Text>
      </View>

      <View style={styles.card}>
        <Svg width={72} height={72} viewBox="0 0 24 24" fill="none">
          <Path
            d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
            stroke="#f33421"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M22 6L12 13L2 6"
            stroke="#f33421"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>

        <Text style={styles.title}>Verifikasi Email</Text>
        <Text style={styles.subtitle}>
          Kami telah mengirim link verifikasi ke email kamu:{"\n"}
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{userEmail || '...'}</Text>
        </Text>

        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ Email verifikasi terkadang masuk ke folder <Text style={{ fontWeight: 'bold' }}>Spam</Text> atau tab <Text style={{ fontWeight: 'bold' }}>Promosi</Text>. Cari email dari: <Text style={{ fontWeight: 'bold' }}>support@hiyorinime.firebaseapp.com</Text>
          </Text>
        </View>

        <ActivityIndicator size="large" color="#f33421" style={{ marginTop: 5 }} />

        {/* Resend Button */}
        <View style={styles.resendSection}>
          {!canResend && (
            <Text style={styles.countdownText}>Tunggu {countdown} detik untuk kirim ulang</Text>
          )}

          <TouchableOpacity
            onPress={handleResendVerification}
            disabled={!canResend}
            style={[
              styles.resendButton,
              { backgroundColor: canResend ? '#f33421' : '#888' },
            ]}
          >
            <Text style={styles.resendButtonText}>
              Kirim Ulang Email Verifikasi
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  warningBox: {
    backgroundColor: '#FFF8E1',
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 5,
    marginHorizontal: 4,
  },
  warningText: {
    color: '#333',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  brand: {
    fontSize: 42,
    color: '#fff',
    fontFamily: 'NotoSans_Condensed-Medium',
    letterSpacing: 1,
  },
  card: {
    width: width - 40,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  resendSection: {
    marginTop: 16,
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 13,
    color: '#ccc',
    marginBottom: 6,
    fontFamily: 'Poppins-Regular',
  },
  resendButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  resendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
});
