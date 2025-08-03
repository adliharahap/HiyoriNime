import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import ProfileSwitch from '../atoms/ProfileSwitch';
import CustomDropdown from '../atoms/CustomDropDown';
import DarkModeIcon from '../assets/Icons/darkmodeIcon';
import LanguageIcon from '../assets/Icons/LanguageIcon';
import ServerIcon from '../assets/Icons/serverIcon';
import AboutApplicationIcon from '../assets/Icons/AboutApplicationIcon';
import ProfileNextIcon from '../assets/Icons/ProfileNextIcon';
import LicenseIcon from '../assets/Icons/LisenceIcon';
import VersionIcon from '../assets/Icons/VersionsIcon';
import {version} from '../../package.json';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {signOut} from 'firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {auth} from '../../firebase/firebaseConfig';
import {useSelector} from 'react-redux';
import FastImage from '@d11/react-native-fast-image';
import HistoryIcon from '../assets/Icons/HistoryIcon';
import SecurityIcon from '../assets/Icons/SecurityIcon';
import DeleteAccountIcon from '../assets/Icons/DeleteAccountIcon';
import FeedbackIcon from '../assets/Icons/FeedbackIcon';
import TermsPrivacyIcon from '../assets/Icons/TermsPrivacyIcon';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState('darkMode');
  const [selectedServer, setSelectedServer] = useState('samehadaku');
  const [selectedLanguage, setSelectedLanguage] = useState('id');
  const dataUser = useSelector(state => state.user.userData);
  const videoRef = useRef(null);
  const screenHeight = Dimensions.get('window').height;

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah kamu yakin ingin keluar dari akun anda?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya, Logout',
          onPress: async () => {
            try {
              // Logout dari Firebase
              await signOut(auth);

              // Logout juga dari Google Sign-In
              await GoogleSignin.signOut();

              Alert.alert('Sampai jumpa!', 'Kamu berhasil logout.');
              navigation.replace('LoginScreen');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert(
                'Logout Gagal',
                error.message || 'Terjadi kesalahan saat logout.',
              );
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <ScrollView
        contentContainerStyle={{minHeight: screenHeight, flexGrow: 1}}
        style={{backgroundColor: '#000'}}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}>
        <View style={{height: 200, width: '100%'}}>
          <Video
            ref={videoRef}
            source={require('../assets/LiveWallpaper/Profile_banner.mp4')}
            style={{width: '100%', height: '100%'}}
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
          <View style={{height: 120, width: '100%', flexDirection: 'row'}}>
            <View
              style={{
                width: 120,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
              <FastImage
                style={{height: '65%', width: '65%', borderRadius: 50, borderWidth: 1.1, borderColor: '#fff'}}
                source={
                  dataUser.photo
                    ? {uri: dataUser.photo, priority: FastImage.priority.normal}
                    : require('../assets/Images/Default_Profile_Screen.jpg')
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{flex: 1, paddingTop: 20}}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'NotoSans_SemiCondensed-Bold',
                  fontSize: 20,
                }}
                numberOfLines={1}>
                {dataUser.name || 'User'}
              </Text>
              <View>
                <Text
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontFamily: 'NotoSans_SemiCondensed-Regular',
                    fontSize: 14,
                    paddingBottom: 10,
                  }}
                  numberOfLines={1}>
                  {dataUser.email || "login menggunakan " + dataUser.provider}
                </Text>
                <Pressable
                  android_ripple={{
                    color: 'rgba(255,255,255,0.2)',
                    borderless: false,
                  }}
                  style={{
                    width: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.navigate('EditProfile')}
                  >
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'NotoSans_SemiCondensed-Bold',
                      fontSize: 16,
                    }}
                    numberOfLines={1}>
                    Edit Profile
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{flex: 1, paddingTop: 30, paddingHorizontal: 20, paddingBottom: 120}}>
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
            <View
              style={{
                width: '100%',
                height: 40,
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <DarkModeIcon size={20} color="#fdfdfd" />
                <Text
                  Text
                  style={{
                    color: '#fdfdfd',
                    fontFamily: 'NotoSans_SemiCondensed-Bold',
                    fontSize: 16,
                  }}
                  numberOfLines={1}>
                  Dark Mode
                </Text>
              </View>
              <CustomDropdown
                options={[
                  {label: 'Dark Mode', value: 'darkMode'},
                  {label: 'Light Mode', value: 'lightMode'},
                ]}
                selectedOption={isDarkMode}
                onSelect={setIsDarkMode}
              />
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
              <View style={{flexDirection: 'row', gap: 10}}>
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
              <View style={{flexDirection: 'row', gap: 10}}>
                <SecurityIcon size={20} color="#fdfdfd" />
                <Text
                  Text
                  style={{
                    color: '#fdfdfd',
                    fontFamily: 'NotoSans_SemiCondensed-Bold',
                    fontSize: 16,
                  }}
                  numberOfLines={1}>
                  Keamanan / Login Info
                </Text>
              </View>
              <ProfileNextIcon size={16} color="#fdfdfd" />
            </Pressable>

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
              <View style={{flexDirection: 'row', gap: 10}}>
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
            <View style={{marginTop: 20}}>
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
              <View style={{flexDirection: 'row', gap: 10}}>
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
              <View style={{flexDirection: 'row', gap: 10}}>
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
              <View style={{flexDirection: 'row', gap: 10}}>
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
              <View style={{flexDirection: 'row', gap: 10}}>
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
              <View style={{flexDirection: 'row', gap: 10}}>
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
