import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

/**
 * Ambil semua data dari semua koleksi di Firestore
 */
export const getAllUserDataAsJson = async () => {
      try {
    const detailAnimeIds = ['solo-leveling']; // bisa ambil dari list ID kalau kamu punya

    const allData = {
      DetailAnimeSong: {},
      users: {}
    };

    for (const id of detailAnimeIds) {
      const docRef = doc(db, 'DetailAnimeSong ', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        allData.DetailAnimeSong[id] = docSnap.data();
      }
    }

    // Ambil user juga (seperti sebelumnya)
    const userColRef = collection(db, 'users');
    const userSnap = await getDocs(userColRef);

    userSnap.forEach((doc) => {
      allData.users[doc.id] = doc.data();
    });

    console.log('📦 Semua data Firestore (FIXED):', JSON.stringify(allData, null, 2));
    return { success: true, data: allData };
  } catch (err) {
    console.error('❌ Gagal ambil semua data Firestore:', err);
    return { success: false, error: err.message };
  }
};
