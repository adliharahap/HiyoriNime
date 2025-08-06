import { auth, db } from '../../firebase/firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
  doc,
  orderBy,
  deleteDoc,
  limit as limitDocs,
} from 'firebase/firestore';

export const saveWatchHistory = async (userId, anime) => {
  try {
    if (!userId) throw new Error('User belum login!');
    console.log('✅ User ID ditemukan:', userId);

    const historyRef = collection(db, 'users', userId, 'watchHistory');
    console.log('📚 Mengakses koleksi watchHistory');

    // Cek apakah anime sudah ada di riwayat
    const q = query(historyRef, where('animeId', '==', anime.animeId));
    const snapshot = await getDocs(q);
    console.log('🔍 Hasil query animeId:', anime.animeId, '| Jumlah ditemukan:', snapshot.size);

    if (!snapshot.empty) {
      const docRef = doc(historyRef, snapshot.docs[0].id);
      console.log('🔄 Anime sudah ada, update waktu nonton:', snapshot.docs[0].id);

      await updateDoc(docRef, {
        watchedAt: new Date(),
      });
      console.log('✅ Tanggal nonton diupdate');
    } else {
      console.log('🆕 Anime belum ada, menambahkan riwayat baru');

      await addDoc(historyRef, {
        userId,
        animeId: anime.animeId,
        title: anime.title,
        poster: anime.poster,
        genres: anime.genreList?.map((g) => g.title) || [],
        watchedAt: new Date(),
      });

      console.log('✅ Riwayat baru ditambahkan:', anime.title);
    }

    // Ambil semua riwayat untuk cek apakah perlu dihapus
    const allHistory = await getDocs(query(historyRef, orderBy('watchedAt', 'desc')));
    console.log('📦 Total riwayat sekarang:', allHistory.size);

    if (allHistory.size > 30) {
      const docsToDelete = allHistory.docs.slice(30);
      console.log('🧹 Menghapus riwayat lama:', docsToDelete.length);

      for (const docSnap of docsToDelete) {
        console.log('🗑️ Menghapus:', docSnap.id);
        await deleteDoc(doc(historyRef, docSnap.id));
      }
      console.log('✅ Riwayat lama berhasil dibersihkan');
    }
  } catch (error) {
    console.error('🔥 Gagal menyimpan watch history:', error);
  }
};


export const getWatchHistory = async (userId, limit = 50) => {
  try {
    if (!userId) throw new Error('User belum login!');

    const historyRef = collection(db, 'users', userId, 'watchHistory');
    const q = query(historyRef, orderBy('watchedAt', 'desc'), limitDocs(limit));

    const snapshot = await getDocs(q);

    const history = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return history;
  } catch (error) {
    console.error('🔥 Gagal ambil watch history:', error);
    return []; // bisa juga lempar error lagi kalau mau
  }
};

export const clearWatchHistory = async (userId) => {
  try {
    if (!userId) throw new Error('User belum login!');
    console.log('🗑️ Menghapus semua riwayat untuk user:', userId);

    const historyRef = collection(db, 'users', userId, 'watchHistory');
    const snapshot = await getDocs(historyRef);

    if (snapshot.empty) {
      console.log('✅ Tidak ada riwayat untuk dihapus.');
      return;
    }

    // Buat array dari semua promise penghapusan
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    
    // Jalankan semua promise secara paralel untuk efisiensi
    await Promise.all(deletePromises);

    console.log(`✅ Berhasil menghapus ${snapshot.size} item dari riwayat.`);

  } catch (error) {
    console.error('🔥 Gagal menghapus semua watch history:', error);
    // Lempar error agar bisa ditangani di UI jika perlu
    throw error;
  }
};
