import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';
import AboutApplicationIcon from '../assets/Icons/AboutApplicationIcon';
import ProfileNextIcon from '../assets/Icons/ProfileNextIcon';
import LicenseIcon from '../assets/Icons/LisenceIcon';
import VersionIcon from '../assets/Icons/VersionsIcon';
import { version } from '../../package.json';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { signOut } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../../firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import HistoryIcon from '../assets/Icons/HistoryIcon';
import DeleteAccountIcon from '../assets/Icons/DeleteAccountIcon';
import FeedbackIcon from '../assets/Icons/FeedbackIcon';
import TermsPrivacyIcon from '../assets/Icons/TermsPrivacyIcon';
import HeaderProfilePicture from '../components/ProfileComponent/HeaderProfilePicture';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearUserData } from '../redux/slices/userSlice';
import ConfirmationModal from '../components/ConfirmationModal';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dataUser = useSelector(state => state.user.userData);
  const videoRef = useRef(null);
  const screenHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    const checkGuestStatus = async () => {
      try {
        const guestFlag = await AsyncStorage.getItem('isGuest');
        const isGuest = guestFlag === 'true';

        if (!dataUser || isGuest) {
          navigation.navigate('GuestScreen', {
            description: "Fitur ini hanya bisa diakses oleh pengguna yang sudah login. Yuk masuk dulu~ 😄",
            targetFeature: "Profil & Riwayat Anime",
          });
        }
      } catch (err) {
        console.error('❌ Gagal cek status guest:', err);
      }
    };

    checkGuestStatus();
  }, [dataUser]);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const onConfirmLogout = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem('onboardingStatus');
      await signOut(auth);
      await GoogleSignin.signOut();
      await AsyncStorage.clear();

      if (onboardingStatus) {
        await AsyncStorage.setItem('onboardingStatus', onboardingStatus);
      }

      dispatch(clearUserData());

      ToastAndroid.show('Sampai jumpa! Kamu berhasil logout.', ToastAndroid.LONG);
      navigation.replace('LoginScreen');
    } catch (error) {
      console.error('Logout error:', error);
      ToastAndroid.show(
        `Logout gagal: ${error.message || 'Terjadi kesalahan saat logout.'}`,
        ToastAndroid.LONG
      );

    } finally {
      setLogoutModalVisible(false); // Tutup modal
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ConfirmationModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={onConfirmLogout}
        title="Konfirmasi Logout"
        message="Apakah kamu yakin ingin keluar dari akunmu?"
        confirmText='Ya, Logout'
        cancelText='Batal'
      />
      <ScrollView
        contentContainerStyle={{ minHeight: screenHeight, flexGrow: 1 }}
        style={{ backgroundColor: '#000' }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}>
        <View style={{ height: 200, width: '100%' }}>
          <Video
            ref={videoRef}
            source={require('../assets/LiveWallpaper/Profile_banner.mp4')}
            style={{ width: '100%', height: '100%' }}
            controls={false}
            repeat={true}
            muted={true}
            resizeMode="cover"
            playWhenInactive={true}
            onPlaybackResume={() => videoRef.current.play()}
            // onBuffer={() => console.log("Buffering...")}
            onError={e => console.log(e)}
          />
        </View>
        <LinearGradient
          colors={['#000000ff', 'rgba(81, 8, 10, 1)']}
          locations={[0.1, 6]}
          style={{
            flex: 1,
            backgroundColor: '#000',
            borderTopWidth: 1.2,
            borderColor: 'rgba(255,255,255,0.2)',
          }}>
          <HeaderProfilePicture
            dataUser={dataUser}
            navigation={navigation}
          />
          <View style={{ flex: 1, paddingTop: 30, paddingHorizontal: 20, paddingBottom: 120 }}>
            {/* Header */}
            <View>
              <Text
                style={{
                  color: '#ccc',
                  fontFamily: 'NotoSans_SemiCondensed-Bold',
                  fontSize: 15,
                }}
                numberOfLines={1}>
                Pengaturan
              </Text>
              <View
                style={{
                  height: 1.5,
                  width: '100%',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  marginTop: 5,
                  borderRadius: 30,
                }}></View>
            </View>
            {/* body */}
            <Pressable
              onPress={() => {
                navigation.navigate('HistoryAnime');
              }}
              style={{
                width: '100%',
                height: 40,
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <HistoryIcon size={20} color="#fdfdfd" />
                <Text
                  Text
                  style={{
                    color: '#fdfdfd',
                    fontFamily: 'NotoSans_SemiCondensed-Bold',
                    fontSize: 16,
                  }}
                  numberOfLines={1}>
                  History Tontonan
                </Text>
              </View>
              <ProfileNextIcon size={16} color="#fdfdfd" />
            </Pressable>

            <Pressable
              onPress={() => {
                navigation.navigate('DeleteAccount');
              }}
              style={{
                width: '100%',
                height: 40,
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <DeleteAccountIcon size={20} color="#fdfdfd" />
                <Text
                  Text
                  style={{
                    color: '#fdfdfd',
                    fontFamily: 'NotoSans_SemiCondensed-Bold',
                    fontSize: 16,
                  }}
                  numberOfLines={1}>
                  Hapus Akun / Reset Data
                </Text>
              </View>
              <ProfileNextIcon size={16} color="#fdfdfd" />
            </Pressable>

            {/* Header */}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  color: '#ccc',
                  fontFamily: 'NotoSans_SemiCondensed-Bold',
                  fontSize: 15,
                }}
                numberOfLines={1}>
                Informasi
              </Text>
              <View
                style={{
                  height: 1.5,
                  width: '100%',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  marginTop: 5,
                  borderRadius: 30,
                }}></View>
            </View>

            <Pressable
              onPress={() => {
                navigation.navigate('About');
              }}
              style={{
                width: '100%',
                height: 40,
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <AboutApplicationIcon size={20} color="#fdfdfd" />
                <Text
                  Text
                  style={{
                    color: '#fdfdfd',
                    fontFamily: 'NotoSans_SemiCondensed-Bold',
                    fontSize: 16,
                  }}
                  numberOfLines={1}>
                  Tentang Aplikasi
                </Text>
              </View>
              <ProfileNextIcon size={16} color="#fdfdfd" />
            </Pressable>

            <Pressable
              onPress={() => {
                navigation.navigate('Lisence');
              }}
              style={{
                width: '100%',
                height: 40,
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <LicenseIcon size={20} color="#fdfdfd" />
                <Text
                  Text
                  style={{
                    color: '#fdfdfd',
                    fontFamily: 'NotoSans_SemiCondensed-Bold',
                    fontSize: 16,
                  }}
                  numberOfLines={1}>
                  Lisensi
                </Text>
              </View>
              <ProfileNextIcon size={16} color="#fdfdfd" />
            </Pressable>

            <Pressable
              onPress={() => {
                navigation.navigate('HubungiDeveloper');
              }}
              style={{
                width: '100%',
                height: 40,
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <FeedbackIcon size={20} color="#fdfdfd" />
                <Text
                  Text
                  style={{
                    color: '#fdfdfd',
                    fontFamily: 'NotoSans_SemiCondensed-Bold',
                    fontSize: 16,
                  }}
                  numberOfLines={1}>
                  Hubungi Developer / Feedback
                </Text>
              </View>
              <ProfileNextIcon size={16} color="#fdfdfd" />
            </Pressable>

            <Pressable
              onPress={() => {
                navigation.navigate('PrivacyPolicy');
              }}
              style={{
                width: '100%',
                height: 40,
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TermsPrivacyIcon size={20} color="#fdfdfd" />
                <Text
                  Text
                  style={{
                    color: '#fdfdfd',
                    fontFamily: 'NotoSans_SemiCondensed-Bold',
                    fontSize: 16,
                  }}
                  numberOfLines={1}>
                  Syarat & Ketentuan / Kebijakan Privasi
                </Text>
              </View>
              <ProfileNextIcon size={16} color="#fdfdfd" />
            </Pressable>

            <View
              style={{
                width: '100%',
                height: 40,
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <VersionIcon size={20} color="#fdfdfd" />
                <Text
                  Text
                  style={{
                    color: '#fdfdfd',
                    fontFamily: 'NotoSans_SemiCondensed-Bold',
                    fontSize: 16,
                  }}
                  numberOfLines={1}>
                  Version
                </Text>
              </View>
              <Text
                Text
                style={{
                  color: '#fdfdfd',
                  fontFamily: 'NotoSans_SemiCondensed-Bold',
                  fontSize: 16,
                }}
                numberOfLines={1}>
                {version}
              </Text>
            </View>

            <Pressable
              onPress={handleLogout}
              android_ripple={{
                color: 'rgba(255,255,255,0.2)',
                borderless: false,
              }}
              style={{
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'NotoSans_SemiCondensed-Bold',
                  fontSize: 16,
                }}
                numberOfLines={1}>
                Log Out
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
