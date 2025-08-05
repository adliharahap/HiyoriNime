import FastImage from '@d11/react-native-fast-image';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Path } from 'react-native-svg';
import { useSelector, useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { DeleteAllImagesInPictures } from '../../utils/DeleteAllImageInPicture';
import { updateUserProfile } from '../../utils/updateUserProfile';
import { setUserData } from '../../redux/slices/userSlice'; // Import action Redux
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector(state => state.user.userData);
  const navigation = useNavigation();

  // State untuk form data
  const [name, setName] = useState(dataUser?.name || '');
  const [username, setUsername] = useState(dataUser?.username || '');
  const [birthDate, setBirthDate] = useState(dataUser?.birthDate ? new Date(dataUser.birthDate) : new Date());
  const [bio, setBio] = useState(dataUser?.bio || '');
  const [email, setEmail] = useState(dataUser?.email || '');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(
    dataUser?.photo || null,
  );
  
  // Fungsi upload ke Supabase (sama seperti sebelumnya)
  const uploadImageToSupabase = async imagePath => {
    try {
      setIsUploading(true);
      console.log('☁️ Mulai upload ke Supabase dengan Fetch API...');

      // Baca file sebagai base64
      const fileData = await RNFS.readFile(imagePath, 'base64');

      // Konversi base64 ke Uint8Array
      const binaryString = atob(fileData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Generate nama file unik
      const timestamp = Date.now();
      const userId = dataUser?.uid || 'anonymous';
      const fileName = `profile_${userId}_${timestamp}.jpg`;
      const filePath = `profiles/${fileName}`;

      console.log('📤 Uploading file:', filePath);

      // URL untuk upload ke Supabase Storage
      const uploadUrl = `${SUPABASE_URL}/storage/v1/object/hiyorinime-storage/${filePath}`;

      // Upload menggunakan fetch API
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          apikey: SUPABASE_ANON_KEY,
          'Content-Type': 'image/jpeg',
          'x-upsert': 'false',
        },
        body: bytes,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('❌ Response error:', errorText);
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Upload berhasil:', result);

      // Generate URL publik
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/hiyorinime-storage/${filePath}`;
      console.log('🔗 URL gambar:', publicUrl);

      return {
        success: true,
        url: publicUrl,
        path: filePath,
        data: result,
      };
    } catch (error) {
      console.log('❌ Error upload gambar:', error);
      return {
        success: false,
        error: error.message,
      };
    } finally {
      setIsUploading(false);
    }
  };

  // Upload dengan FormData
  const uploadImageWithFormData = async imagePath => {
    try {
      setIsUploading(true);
      console.log('☁️ Mulai upload dengan FormData...');

      // Generate nama file unik
      const timestamp = Date.now();
      const userId = dataUser?.uid || 'anonymous';
      const fileName = `profile_${userId}_${timestamp}.jpg`;
      const filePath = `profiles/${fileName}`;

      // Buat FormData
      const formData = new FormData();
      formData.append('file', {
        uri: imagePath,
        type: 'image/jpeg',
        name: fileName,
      });

      // URL untuk upload ke Supabase Storage
      const uploadUrl = `${SUPABASE_URL}/storage/v1/object/hiyorinime-storage/${filePath}`;

      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          apikey: SUPABASE_ANON_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('❌ Response error:', errorText);
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Upload berhasil:', result);

      // Generate URL publik
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/hiyorinime-storage/${filePath}`;
      console.log('🔗 URL gambar:', publicUrl);

      return {
        success: true,
        url: publicUrl,
        path: filePath,
        data: result,
      };
    } catch (error) {
      console.log('❌ Error upload gambar:', error);
      return {
        success: false,
        error: error.message,
      };
    } finally {
      setIsUploading(false);
    }
  };

  // fungsi untuk mendelete foto profile lama dari Supabase
  const deleteOldSupabasePhoto = async photoUrl => {
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

  const pickAndCropImage = async () => {
    try {
      await DeleteAllImagesInPictures();

      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 1,
        mediaType: 'photo',
        includeBase64: false,
      });

      console.log('📸 Gambar baru dipilih:', image.path);

      let compressedImage = image;
      let currentQuality = 1;
      let fileSizeInMB =
        (await RNFS.stat(compressedImage.path)).size / (1024 * 1024);

      // Loop kompresi sampai ukuran < 10MB
      while (fileSizeInMB > 10 && currentQuality > 0.1) {
        currentQuality -= 0.1;
        console.log(
          `🔄 Kompres ulang dengan kualitas ${Math.round(
            currentQuality * 100,
          )}%`,
        );

        compressedImage = await ImagePicker.openCropper({
          path: image.path,
          width: 300,
          height: 300,
          cropperCircleOverlay: true,
          compressImageQuality: currentQuality,
          mediaType: 'photo',
        });

        const stat = await RNFS.stat(compressedImage.path);
        fileSizeInMB = stat.size / (1024 * 1024);
        console.log(`📦 Ukuran setelah kompres: ${fileSizeInMB.toFixed(2)} MB`);
      }

      lastImagePath = compressedImage.path;

      // 🧹 Hapus gambar lama dari Supabase (kalau ada dan valid)
      const oldPhotoUrl = dataUser?.photoURL || dataUser?.photo;
      await deleteOldSupabasePhoto(oldPhotoUrl);

      // Upload ke Supabase
      let uploadResult = await uploadImageWithFormData(compressedImage.path);

      if (!uploadResult.success) {
        console.log('🔄 Mencoba upload dengan method alternatif...');
        uploadResult = await uploadImageToSupabase(compressedImage.path);
      }

      if (uploadResult.success) {
        console.log('🎉 Gambar berhasil diupload!');
        console.log('🔗 URL Supabase:', uploadResult.url);

        // Update state gambar
        setProfileImageUrl(uploadResult.url);

        // 🔥 Update Firebase langsung setelah upload berhasil
        const firebaseUpdateResult = await updateUserProfile({
          photoURL: uploadResult.url,
          displayName: name || dataUser?.name,
        });

        if (firebaseUpdateResult.success) {
          // Update Redux state
          dispatch(setUserData(firebaseUpdateResult.data));

          ToastAndroid.show(
            'Gambar profile berhasil diupload dan tersimpan!',
            ToastAndroid.SHORT,
          );
        } else {
          Alert.alert(
            'Upload Berhasil',
            'Gambar berhasil diupload, tapi gagal menyimpan ke profile. Silakan klik Simpan Perubahan.',
            [{ text: 'OK' }],
          );
        }
      } else {
        console.log('❌ Gagal upload gambar:', uploadResult.error);
        Alert.alert(
          'Upload Gagal',
          `Gagal mengupload gambar: ${uploadResult.error}`,
          [{ text: 'OK' }],
        );
      }

      return compressedImage;
    } catch (error) {
      console.log('❌ Error pilih gambar:', error);
      Alert.alert('Error', `Gagal memilih gambar: ${error.message}`, [
        { text: 'OK' },
      ]);
    }
  };

  // Fungsi untuk save semua perubahan profile
  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      console.log('💾 Menyimpan perubahan profile...');

      // Data yang akan diupdate
      const profileData = {
        displayName: name,
        photoURL: profileImageUrl,
        bio: bio,
        birthDate: formatDate(birthDate),
        username: username,
      };

      // Update Firebase
      const result = await updateUserProfile(profileData);

      if (result.success) {
        // Update Redux state
        dispatch(setUserData(result.data));

        ToastAndroid.show(
          'Edit Profile Berhasil Di Simpan!',
          ToastAndroid.SHORT,
        );

        // Tunggu sebentar biar toast bisa tampil dulu (opsional delay)
        setTimeout(() => {
          navigation.goBack();  
        }, 500);

        console.log('✅ Profile berhasil diupdate:', result.data);
      } else {
        Alert.alert('Gagal!', `Gagal menyimpan perubahan: ${result.message}`, [
          { text: 'OK' },
        ]);
      }
    } catch (error) {
      console.error('❌ Error save profile:', error);
      Alert.alert('Error!', `Terjadi kesalahan: ${error.message}`, [
        { text: 'OK' },
      ]);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = date => {
    return date.toISOString().split('T')[0];
  };

  return (
    <LinearGradient
      colors={['#000000', 'rgba(81, 8, 10, 1)']}
      locations={[0.2, 1]}
      style={styles.container}>
      <View style={styles.profileImageContainer}>
        <FastImage
          style={styles.profileImage}
          source={
            profileImageUrl
              ? { uri: profileImageUrl, priority: FastImage.priority.normal }
              : require('../../assets/Images/Default_Profile_Screen.jpg')
          }
          resizeMode={FastImage.resizeMode.cover}
        />
        <TouchableOpacity
          style={[styles.editIcon, isUploading && styles.editIconDisabled]}
          onPress={pickAndCropImage}
          disabled={isUploading}>
          {isUploading ? (
            <Text style={styles.uploadingText}>...</Text>
          ) : (
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"
                fill="#fff"
              />
            </Svg>
          )}
        </TouchableOpacity>
      </View>

      {isUploading && (
        <View style={styles.uploadingIndicator}>
          <Text style={styles.uploadingText}>Mengupload gambar...</Text>
        </View>
      )}

      <View style={styles.form}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Masukkan nama"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholder="Masukkan username"
          placeholderTextColor="#aaa"
        />

        <View>
          <Text style={styles.label}>Tanggal Lahir</Text>
          <TouchableOpacity
            onPress={() => setOpenDatePicker(true)}
            style={styles.input}>
            <Text style={styles.dateText}>{formatDate(birthDate)}</Text>
          </TouchableOpacity>

          <DatePicker
            modal
            open={openDatePicker}
            date={birthDate}
            mode="date"
            onConfirm={date => {
              setOpenDatePicker(false);
              setBirthDate(date);
            }}
            onCancel={() => {
              setOpenDatePicker(false);
            }}
          />
        </View>

        <Text style={styles.label}>Bio Profile</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Masukkan Bio Profile"
          placeholderTextColor="#aaa"
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSaveProfile}
          disabled={isSaving || isUploading}>
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 50,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#fff',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#705b5cff',
    padding: 5,
    borderRadius: 20,
  },
  editIconDisabled: {
    backgroundColor: '#555',
    opacity: 0.6,
  },
  uploadingIndicator: {
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadingText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  form: {
    marginTop: 8,
  },
  label: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    fontFamily: 'Poppins-Medium',
    marginBottom: 16,
  },
  dateText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  saveButton: {
    backgroundColor: 'rgba(229, 57, 53, 0.9)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonDisabled: {
    backgroundColor: '#555',
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});

export default EditProfile;
