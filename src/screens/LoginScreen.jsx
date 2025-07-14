import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {auth} from '../../firebase/firebaseConfig';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {Path} from 'react-native-svg';
import EyeOffIcon from '../assets/Icons/EyeOffIcon';
import EyeOnIcon from '../assets/Icons/EyeOnIcon';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Cek apakah ada data login disimpan
    const loadStoredCredentials = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      const storedRemember = await AsyncStorage.getItem('remember');

      if (storedRemember === 'true') {
        setEmail(storedEmail || '');
        setPassword(storedPassword || '');
        setRememberMe(true);
      }
    };
    loadStoredCredentials();
  }, []);

  const handleEmailLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Lengkapi Data', 'Email dan Password wajib diisi');
        return;
      }

      const result = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('onboardingStatus', 'done');

      if (rememberMe) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('remember', 'true');
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('remember');
      }

      ToastAndroid.show(
        `Successfully signed in as ${email}`,
        ToastAndroid.SHORT,
      );
      navigation.replace('MainScreen');
    } catch (err) {
      let message = '';
      switch (err.code) {
        case 'auth/invalid-email':
          message =
            'Email tidak valid. Pastikan Anda memasukkan email dengan format yang benar, contoh: user@gmail.com';
          break;
        default:
          message =
            'Kami tidak dapat menemukan akun dengan data yang Anda berikan. Mohon pastikan email dan password anda sudah benar.';
          break;
      }

      Alert.alert(
        'Login Gagal',
        message,
        [
          {
            text: 'Coba Lagi',
            onPress: () => {},
            style: 'destructive', // tombol warna merah 💥
          },
        ],
        {cancelable: true},
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await auth.signOut();
      await GoogleSignin.signOut();

      await GoogleSignin.hasPlayServices();

      const result = await GoogleSignin.signIn();

      // ✅ Hasil sign-in universal bentuknya { type: 'success', data: { ... } }
      if (result.type === 'success') {
        const {idToken} = result.data;

        if (!idToken) {
          throw new Error('ID Token tidak ditemukan 😵');
        }

        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, credential);

        ToastAndroid.show(
          `Successfully signed in as ${result.data.user.email || result.data.user.name}`,
          ToastAndroid.SHORT,
        );
        await AsyncStorage.setItem('onboardingStatus', 'done');
        setTimeout(() => {
          navigation.replace('MainScreen');
        }, 1000);
      } else {
        Alert.alert('Login Gagal 😢', 'User tidak memilih akun Google');
      }
    } catch (err) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('❌ Sign in dibatalkan oleh user:', err);
      } else if (err.code === statusCodes.IN_PROGRESS) {
        console.log('⏳ Sign in masih diproses:', err);
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('🚫 Google Play Services tidak tersedia:', err);
      } else {
        console.error('Login error:', err);
        Alert.alert('Login Gagal 😵', err.message || 'Terjadi kesalahan.');
      }
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('⚠️ Perhatian', 'Mohon masukkan email terlebih dahulu.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Email Terkirim',
        'Link reset password telah dikirim ke email Anda.',
      );
    } catch (err) {
      Alert.alert('Gagal Mengirim', err.message || 'Terjadi kesalahan.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah kamu yakin ingin keluar dari akun Google kamu?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya, Logout',
          onPress: async () => {
            try {
              // Logout dari Firebase
              await signOut(auth);

              // Logout juga dari Google Sign-In
              await GoogleSignin.signOut();

              Alert.alert('Sampai jumpa!', 'Kamu berhasil logout.');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert(
                'Logout Gagal',
                error.message || 'Terjadi kesalahan saat logout.',
              );
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/Images/image.png')}
        style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.92)'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'Column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}>
            <Text
              style={{
                fontSize: 50,
                color: '#000',
                fontFamily: 'NotoSans_Condensed-Medium',
                paddingHorizontal: 20,
                letterSpacing: 0.8,
                color: '#fff',
              }}>
              HiyoriNime<Text style={{color: '#f33421'}}>.</Text>
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <View style={{marginBottom: 20, paddingHorizontal: 20}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                  fontFamily: 'NotoSans_Condensed-Medium',
                  paddingHorizontal: 4,
                  marginBottom: 6,
                  letterSpacing: 0.8,
                }}>
                Email
              </Text>

              <TextInput
                placeholder="Masukkan email kamu"
                placeholderTextColor="#aaa"
                style={{
                  backgroundColor: '#1e1e1e',
                  color: '#fff',
                  fontSize: 14,
                  fontFamily: 'NotoSans_Condensed-Medium',
                  borderRadius: 10,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderWidth: 1,
                  borderColor: '#333',
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={{marginBottom: 20, paddingHorizontal: 20}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                  fontFamily: 'NotoSans_Condensed-Medium',
                  paddingHorizontal: 4,
                  marginBottom: 6,
                  letterSpacing: 0.8,
                }}>
                Password
              </Text>

              <View style={{position: 'relative'}}>
                <TextInput
                  placeholder="Masukkan Password kamu"
                  placeholderTextColor="#aaa"
                  style={{
                    backgroundColor: '#1e1e1e',
                    color: '#fff',
                    fontSize: 14,
                    fontFamily: 'NotoSans_Condensed-Medium',
                    borderRadius: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderWidth: 1,
                    borderColor: '#333',
                    paddingRight: 45, // space for the eye icon
                  }}
                  keyboardType="default"
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: [{translateY: -12}],
                  }}>
                  {showPassword ? (
                    // Icon: Eye Open
                    <EyeOnIcon color='#646262ff' size={22} />
                  ) : (
                    // Icon: Eye Off
                    <EyeOffIcon color='#646262ff' size={22} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: '#fff',
                      marginRight: 8,
                      backgroundColor: rememberMe ? '#fff' : 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {rememberMe && (
                      <Svg
                        width={14}
                        height={14}
                        viewBox="0 0 24 24"
                        fill="none">
                        <Path
                          d="M20 6L9 17L4 12"
                          stroke="#000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    )}
                  </View>
                  <Text style={{color: '#fff', fontSize: 12}}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleResetPassword}>
                  <Text style={{color: '#2196F3', fontSize: 12}}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Tombol Login */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#f33421',
                  paddingVertical: 14,
                  borderRadius: 10,
                  marginHorizontal: 20,
                  marginBottom: 20,
                }}
                onPress={handleEmailLogin}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>

              {/* OR Separator */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  paddingHorizontal: 20,
                }}>
                <View style={{flex: 1, height: 1, backgroundColor: '#555'}} />
                <Text style={{color: '#999', marginHorizontal: 10}}>or</Text>
                <View style={{flex: 1, height: 1, backgroundColor: '#555'}} />
              </View>

              {/* Google Login */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  paddingVertical: 12,
                  borderRadius: 10,
                  marginHorizontal: 20,
                  marginBottom: 12,
                }}
                onPress={handleGoogleLogin}>
                <Image
                  source={require('../assets/Icons/google.png')}
                  style={{width: 20, height: 20, marginRight: 8}}
                />
                <Text style={{color: '#000', fontWeight: '500'}}>
                  Login dengan Google
                </Text>
              </TouchableOpacity>

              {/* Guest Login */}
              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  borderRadius: 10,
                  marginHorizontal: 20,
                  borderColor: '#fff',
                  borderWidth: 1,
                  marginBottom: 12,
                }}
                onPress={handleLogout}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Masuk sebagai Tamu
                </Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View style={{alignItems: 'center', marginBottom: 40}}>
                <Text style={{color: '#999'}}>
                  Belum punya akun?{' '}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SignUpScreen');
                    }}>
                    <Text style={{color: '#2196F3', fontWeight: '500'}}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
