import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import LinearGradient from 'react-native-linear-gradient';
import EyeOnIcon from '../../assets/Icons/EyeOnIcon';
import EyeOffIcon from '../../assets/Icons/EyeOffIcon';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = text => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Format email salah (harus ada @ dan .com)');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = pass => {
    setPassword(pass);

    const hasUpperCase = /[A-Z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    let errorMessage = '';

    if (pass.length < 6) {
      errorMessage = 'Minimal 6 karakter';
    } else if (!hasUpperCase) {
      errorMessage = 'Harus ada huruf besar';
    } else if (!hasNumber) {
      errorMessage = 'Harus ada angka';
    } else if (!hasSymbol) {
      errorMessage = 'Harus ada simbol';
    }

    setPasswordError(errorMessage);
  };

  const validateConfirm = confirm => {
    setConfirmPassword(confirm);
    if (password !== confirm) {
      setConfirmError('Password dan konfirmasi tidak cocok');
    } else {
      setConfirmError('');
    }
  };

const handleSignUp = async () => {
  if (!email || !password || !confirmPassword) {
    return Alert.alert('⚠️ Peringatan', 'Semua kolom wajib diisi!');
  }

  if (emailError || passwordError || confirmError) {
    return Alert.alert(
      '❌ Gagal Daftar',
      'Periksa kembali data kamu yaa',
    );
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);

    console.log('✅ Sign up berhasil:', userCredential.user);
    navigation.replace('VerifyEmailScreen', { email });

  } catch (err) {
    console.log('❌ Error sign up:', err.code, err.message);

    if (err.code === 'auth/email-already-in-use') {
      Alert.alert(
        'Email Sudah Terdaftar via Google',
        'Kamu pernah login dengan Google. Silakan login via Google yaa~',
      );
    } else if (err.code === 'auth/invalid-email') {
      Alert.alert(
        '📛 Email Tidak Valid',
        'Masukkan email yang benar dong 😅',
      );
    } else {
      Alert.alert('💥 Error', err.message || 'Terjadi kesalahan.');
    }
  }
};


  return (
    <LinearGradient colors={['#000', '#2b2b2b']} style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingTop: 100,
            }}>
            <Text
              style={{
                fontSize: 50,
                color: '#fff',
                fontFamily: 'NotoSans_Condensed-Medium',
                letterSpacing: 0.8,
              }}>
              HiyoriNime<Text style={{color: '#f33421'}}>.</Text>
            </Text>
          </View>

          <View style={{paddingHorizontal: 20, marginTop: 40}}>
            {/* Email */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.label}>Email</Text>
              {emailError !== '' && (
                <Text style={styles.error}>{emailError}</Text>
              )}
            </View>
            <TextInput
              placeholder="Masukkan email kamu"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={validateEmail}
              style={styles.input}
            />

            {/* Password */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.label}>Password</Text>
              {passwordError ? (
                <Text style={styles.error}>{passwordError}</Text>
              ) : null}
            </View>
            <View style={{position: 'relative'}}>
                <TextInput
                  placeholder="Masukkan Password kamu"
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  keyboardType="default"
                  autoCapitalize="none"
                  value={password}
                  onChangeText={validatePassword}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '40%',
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

            {/* Konfirmasi Password */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.label}>Konfirmasi Password </Text>
              {confirmError ? (
                <Text style={styles.error}>{confirmError}</Text>
              ) : null}
            </View>
            <View style={{position: 'relative'}}>
                <TextInput
                  placeholder="Masukkan Password kamu"
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  keyboardType="default"
                  autoCapitalize="none"
                  value={confirmPassword}
                  onChangeText={validateConfirm}
                  secureTextEntry={!showConfirmPassword}
                />

                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '40%',
                    transform: [{translateY: -12}],
                  }}>
                  {showConfirmPassword ? (
                    // Icon: Eye Open
                    <EyeOnIcon color='#646262ff' size={22} />
                  ) : (
                    // Icon: Eye Off
                    <EyeOffIcon color='#646262ff' size={22} />
                  )}
                </TouchableOpacity>
              </View>

            {/* Tombol Daftar */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Daftar Sekarang</Text>
            </TouchableOpacity>

            {/* Link ke Login */}
            <View style={{alignItems: 'center', marginBottom: 40}}>
              <Text style={{color: '#999'}}>
                Sudah punya akun?{' '}
                <TouchableOpacity
                  onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={{color: '#2196F3', fontWeight: '500'}}>
                    Login
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'NotoSans_Condensed-Medium',
    paddingHorizontal: 4,
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    fontSize: 14,
    fontFamily: 'NotoSans_Condensed-Medium',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 16,
  },
  error: {
    color: '#f66',
    fontSize: 13,
    marginBottom: 10,
    textAlign: 'right',
    fontFamily: 'NotoSans_Condensed-Medium',
  },
  button: {
    backgroundColor: '#f33421',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'NotoSans_Condensed-Medium',
  },
});
