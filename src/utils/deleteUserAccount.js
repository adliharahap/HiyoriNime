import { deleteUser, signOut, GoogleAuthProvider, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { resetUserData } from './resetUserData';
import { deleteOldSupabasePhoto } from './deleteOldSupabasePhoto';
import { auth } from '../../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const reauthenticateWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.getTokens();
    const googleCredential = GoogleAuthProvider.credential(idToken);

    await reauthenticateWithCredential(auth.currentUser, googleCredential);
    console.log('✅ Re-auth Google sukses');
    return { success: true };
  } catch (error) {
    console.log('❌ Gagal re-auth Google:', error);
    return { success: false, error: 'Gagal otentikasi ulang dengan Google.' };
  }
};


const reauthenticateWithEmail = async (email, password) => {
  try {
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(auth.currentUser, credential);
    console.log('✅ Re-auth Email sukses');
    return { success: true };
  } catch (error) {
    console.log('❌ Gagal re-auth Email:', error);

    if (error.code === 'auth/wrong-password') {
      return { success: false, error: 'Password yang kamu masukkan salah 😢' };
    }

    return { success: false, error: 'Terjadi kesalahan saat re-auth kemungkinan Password yang kamu masukkan salah' };
  }
};


/**
 * Menghapus akun sepenuhnya: data Firestore, foto Supabase, akun Firebase, AsyncStorage, dan navigate ke Login.
 */
export const deleteUserAccount = async (userData, navigation, password) => {
  try {
    const uid = userData.uid;

    let result = { success: false };

    if (userData.provider === 'google.com') {
      const googleResult = await reauthenticateWithGoogle();
      result = { success: googleResult };
    } else if (userData.provider === 'password') {
      if (!password) {
        return { success: false, error: 'Password diperlukan untuk menghapus akun.' };
      }
      result = await reauthenticateWithEmail(userData.email, password);
    }

    if (!result.success) {
      return { success: false, error: result.error || 'Re-authentication failed' };
    }

    if (userData.photoURL || userData.photo) {
      await deleteOldSupabasePhoto(userData.photoURL || userData.photo);
    }


    // 2. Hapus semua data dari Firestore
    await resetUserData(uid, true);

    // 3. Hapus akun dari Firebase Authentication
    const user = auth.currentUser;
    if (user) {
      await deleteUser(user);
    }

    // 4. Bersihkan semua data di AsyncStorage
    await AsyncStorage.clear();

    // 5. Sign out dari Firebase Auth (opsional, karena user udah dihapus, tapi jaga-jaga)
    await signOut(auth);

    // 6. Navigasi ke LoginScreen
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });

    return { success: true };
  } catch (err) {
    console.log('❌ Gagal hapus akun:', err);

    return { success: false, error: err.message };
  }
};
