// utils/updateUserProfile.js
import { auth, db } from '../../firebase/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Update user profile di Firebase Auth dan Firestore
 * @param {Object} profileData - Data profil yang akan diupdate
 * @param {string} profileData.photoURL - URL foto profil baru
 * @param {string} profileData.displayName - Nama display user (optional)
 * @param {string} profileData.bio - Bio profile user (optional)  
 * @param {string} profileData.birthDate - Tanggal lahir (optional)
 * @param {string} profileData.username - Username (optional)
 * @returns {Object} Result object dengan success status dan data
 */
export const updateUserProfile = async (profileData) => {
  try {
    console.log('🔄 Mulai update profile user...');
    
    // Cek apakah user sedang login
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User tidak sedang login');
    }

    const { uid } = currentUser;
    console.log('👤 User ID:', uid);

    // 1. Update Firebase Auth Profile (untuk photoURL dan displayName)
    const authUpdateData = {};
    if (profileData.photoURL) {
      authUpdateData.photoURL = profileData.photoURL;
    }
    if (profileData.displayName) {
      authUpdateData.displayName = profileData.displayName;
    }

    if (Object.keys(authUpdateData).length > 0) {
      console.log('🔄 Update Firebase Auth Profile...');
      await updateProfile(currentUser, authUpdateData);
      console.log('✅ Firebase Auth Profile berhasil diupdate');
    }

    // 2. Update/Create document di Firestore
    console.log('🔄 Update Firestore document...');
    const userDocRef = doc(db, 'users', uid);
    
    // Cek apakah document user sudah ada
    const userDoc = await getDoc(userDocRef);
    
    // Data yang akan disimpan di Firestore
    const firestoreData = {
      uid: uid,
      email: currentUser.email,
      provider: currentUser.providerData?.[0]?.providerId || 'unknown',
      updatedAt: new Date().toISOString(),
      ...profileData, // spread semua data profile yang dikirim
    };

    if (userDoc.exists()) {
      // Update document yang sudah ada
      await updateDoc(userDocRef, firestoreData);
      console.log('✅ Firestore document berhasil diupdate');
    } else {
      // Buat document baru
      await setDoc(userDocRef, {
        ...firestoreData,
        createdAt: new Date().toISOString(),
      });
      console.log('✅ Firestore document baru berhasil dibuat');
    }

    // 3. Update data di AsyncStorage (untuk Redux state)
    console.log('🔄 Update AsyncStorage...');
    const updatedUserData = {
      name: profileData.displayName || currentUser.displayName,
      email: currentUser.email,
      phone: currentUser.phoneNumber,
      photo: profileData.photoURL || currentUser.photoURL,
      provider: currentUser.providerData?.[0]?.providerId || 'unknown',
      uid: uid,
      bio: profileData.bio || '',
      birthDate: profileData.birthDate || '',
      username: profileData.username || '',
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
    console.log('✅ AsyncStorage berhasil diupdate');

    return {
      success: true,
      data: updatedUserData,
      message: 'Profile berhasil diupdate'
    };

  } catch (error) {
    console.error('❌ Error update user profile:', error);
    return {
      success: false,
      error: error.message,
      message: 'Gagal update profile'
    };
  }
};