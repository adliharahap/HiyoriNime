import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Menghapus semua data user di Firestore, termasuk subkoleksi di dalam dokumen user.
 */
export const resetUserData = async (uid, deleteaccount = false) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const subcollections = ['favorites', 'watchlist', 'history', 'reviews'];

    await AsyncStorage.removeItem('searchHistory');

    // 🔥 Hapus semua dokumen di subkoleksi
    for (const subcol of subcollections) {
      const subColRef = collection(userDocRef, subcol);
      const snapshot = await getDocs(subColRef);

      if (snapshot.empty) {
        console.log(`ℹ️ Tidak ada data di '${subcol}' untuk uid: ${uid}`);
        continue;
      }

      const deletions = snapshot.docs.map(docSnap =>
        deleteDoc(doc(subColRef, docSnap.id))
      );

      await Promise.all(deletions);
      console.log(`✅ Semua data di '${subcol}' berhasil dihapus`);
    }

    // ⚠️ Optional: Kalau mau hapus dokumen utama user juga, uncomment ini
    if(deleteaccount) {
      await deleteDoc(userDocRef);
      console.log("data dokumen utama user dihapus");
    }

    return { success: true };
  } catch (err) {
    console.error('❌ Gagal reset data user:', err);
    return { success: false, error: err.message };
  }
};
