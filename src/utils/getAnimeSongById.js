import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export const getAnimeSongById = async (animeId) => {
  try {
    const docRef = doc(db, 'DetailAnimeSong ', animeId)
    const docSnap = await getDoc(docRef);
    console.log("Anime ID yang dikirim ke getAnimeSongById:", animeId);


    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'Data lagu tidak ditemukan untuk anime ini.' };
    }
  } catch (error) {
    console.error('❌ Gagal mengambil data lagu:', error);
    return { success: false, error: error.message };
  }
};

import { collection, getDocs } from 'firebase/firestore';

export const listAnimeSongs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'DetailAnimeSong'));
    querySnapshot.forEach((doc) => {
      console.log("🎼 Dokumen ditemukan:", doc.id, "=>", doc.data());
    });
  } catch (err) {
    console.error("❌ Error listing lagu anime:", err);
  }
};

