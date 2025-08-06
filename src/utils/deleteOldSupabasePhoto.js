import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

/**
 * Fungsi untuk mendelete foto profil lama dari Supabase
 * @param {string} photoUrl - URL foto yang akan dihapus
 * @returns {Promise<{ success: boolean, skipped?: boolean, error?: string }>}
 */

  // fungsi untuk mendelete foto profile lama dari Supabase
export const deleteOldSupabasePhoto = async (photoUrl) => {
    try {
      // Cek apakah URL mengandung domain Supabase Storage
      const isSupabasePhoto = photoUrl?.startsWith(
        `${SUPABASE_URL}/storage/v1/object/public/hiyorinime-storage/profiles/`,
      );

      if (!isSupabasePhoto) {
        console.log('📎 Foto lama bukan dari Supabase, skip penghapusan');
        return { success: false, skipped: true };
      }

      // Ambil path setelah storage public/
      const urlParts = photoUrl.split('/hiyorinime-storage/');
      const filePath = urlParts[1];

      if (!filePath) {
        console.log('⚠️ Gagal ekstrak path file dari URL:', photoUrl);
        return { success: false, error: 'Invalid Supabase URL' };
      }

      console.log('🗑️ Menghapus foto lama di path:', filePath);

      const deleteUrl = `${SUPABASE_URL}/storage/v1/object/hiyorinime-storage/${filePath}`;
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          apikey: SUPABASE_ANON_KEY,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('❌ Gagal hapus foto:', errorText);
        throw new Error(`Delete failed: ${response.status} - ${errorText}`);
      }

      console.log('✅ Foto lama berhasil dihapus!');
      return { success: true };
    } catch (error) {
      console.error('❌ Error delete image:', error);
      return { success: false, error: error.message };
    }
  };
