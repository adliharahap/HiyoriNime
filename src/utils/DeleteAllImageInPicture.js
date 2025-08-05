import RNFS from 'react-native-fs';

export const DeleteAllImagesInPictures = async () => {
  try {
    const picturesPath = `${RNFS.ExternalDirectoryPath}/Pictures`;
    const files = await RNFS.readDir(picturesPath);

    const ekstensiGambar = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

    for (const file of files) {
      const isGambar = ekstensiGambar.some(ext => file.name.toLowerCase().endsWith(ext));
      if (isGambar) {
        await RNFS.unlink(file.path);
        console.log(`🧹 Gambar dihapus: ${file.name}`);
      } else {
        console.log(`📁 Lewat: ${file.name} (bukan gambar)`);
      }
    }

    console.log('✅ Semua gambar berhasil dihapus.');
  } catch (error) {
    console.error('❌ Gagal menghapus gambar:', error);
  }
};
