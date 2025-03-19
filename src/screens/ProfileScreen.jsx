import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import Video from 'react-native-video'
import ProfileSwitch from '../atoms/ProfileSwitch'
import CustomDropdown from '../atoms/CustomDropDown'
import DarkModeIcon from '../assets/Icons/darkmodeIcon'
import LanguageIcon from '../assets/Icons/LanguageIcon'
import ServerIcon from '../assets/Icons/serverIcon'
import AboutApplicationIcon from '../assets/Icons/AboutApplicationIcon'
import ProfileNextIcon from '../assets/Icons/ProfileNextIcon'
import LicenseIcon from '../assets/Icons/LisenceIcon'
import VersionIcon from '../assets/Icons/VersionsIcon'
import { version } from '../../package.json'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState('darkMode');
  const [selectedServer, setSelectedServer] = useState("samehadaku");
  const [selectedLanguage, setSelectedLanguage] = useState("id");

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <View style={{height: 200, width: '100%'}}>
          <Video
            source={require('../assets/LiveWallpaper/Profile_banner.mp4')}
            style={{ width: "100%", height: "100%" }}
            controls={false}
            repeat={true}
            muted={true}
            resizeMode="cover"
          />
      </View>
      <LinearGradient 
        colors={['#8D0230', '#14001A']} 
        start={{ x: 1, y: 0 }}
        locations={[0.1, 0.25]} 
        end={{ x: 0, y: 1 }}
        style={{flex: 1, backgroundColor: '#000', borderTopWidth: 1.2, borderColor: 'rgba(255,255,255,0.2)'}}>
        <View style={{height: 120, width: '100%', flexDirection: 'row'}}>
            <View style={{width: 120, height:'100%', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
              <Image style={{height: '65%', width: '65%', borderRadius: 50, borderWidth: 1.5, borderColor: '#fff'}} source={require('../assets/Images/Default_Profile_Screen.jpg')} />
            </View>
            <View style={{flex: 1, paddingTop: 20}}>
              <Text style={{color: '#fff', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 20}} numberOfLines={1}>Adli Rahman Harun Harahap</Text>
              <View>
                <Text style={{color: 'rgba(255,255,255,0.7)', fontFamily: "NotoSans_SemiCondensed-Regular", fontSize: 14, paddingBottom: 10}} numberOfLines={1}>adliraahman7@gmail.com</Text>
                <Pressable
                  onPress={() => {}}
                  android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: false }}
                  style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 5, paddingHorizontal: 20, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}
                >
                  <Text style={{color: '#fff', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 16}} numberOfLines={1}>Edit Profile</Text>
                </Pressable>
              </View>
            </View>
        </View>
        <View style={{flex: 1, paddingTop: 30, paddingHorizontal: 20}}>
          {/* Header */}
          <View>
            <Text style={{color: '#ccc', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 15}} numberOfLines={1}>Pengaturan</Text>
            <View style={{height: 1.5, width: '100%', backgroundColor: 'rgba(255,255,255,0.3)', marginTop: 5, borderRadius: 30}}></View>
          </View>
          {/* body */}
          <View style={{width: '100%', height: 40, marginTop: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <DarkModeIcon size={20} color='#fdfdfd' />
              <Text Text style={{color: '#fdfdfd', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 16}} numberOfLines={1}>Dark Mode</Text>
            </View>
            <CustomDropdown
              options={[
                { label: "Dark Mode", value: "darkMode" },
                { label: "Light Mode", value: "lightMode" },
              ]}
              selectedOption={isDarkMode}
              onSelect={setIsDarkMode}
            />
          </View>

          <View style={{width: '100%', height: 40, marginTop: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <LanguageIcon size={22} color='#fdfdfd' />
              <Text Text style={{color: '#fdfdfd', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 16}} numberOfLines={1}>Bahasa</Text>
            </View>
            <CustomDropdown
              options={[
                { label: "Indonesia", value: "id" },
                { label: "English", value: "en" },
              ]}
              selectedOption={selectedLanguage}
              onSelect={setSelectedLanguage}
            />
          </View>

          <View style={{width: '100%', height: 40, marginTop: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <ServerIcon size={22} color='#fdfdfd' />
              <Text Text style={{color: '#fdfdfd', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 16}} numberOfLines={1}>Server</Text>
            </View>
            <CustomDropdown
              options={[
                { label: "Samehadaku", value: "samehadaku" },
                { label: "Otakudesu", value: "otakudesu" },
              ]}
              selectedOption={selectedServer}
              onSelect={setSelectedServer}
              boxWidth={110}
              boxHeight={40}
            />
          </View>

          {/* Header */}
          <View style={{marginTop: 20}}>
            <Text style={{color: '#ccc', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 15}} numberOfLines={1}>Informasi</Text>
            <View style={{height: 1.5, width: '100%', backgroundColor: 'rgba(255,255,255,0.3)', marginTop: 5, borderRadius: 30}}></View>
          </View>

          <Pressable
            onPress={() => {navigation.navigate('About')}}
            style={{width: '100%', height: 40, marginTop: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <AboutApplicationIcon size={20} color='#fdfdfd' />
              <Text Text style={{color: '#fdfdfd', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 16}} numberOfLines={1}>Tentang Aplikasi</Text>
            </View>
              <ProfileNextIcon size={16} color='#fdfdfd' />
          </Pressable>

          <Pressable onPress={() => {navigation.navigate('Lisence')}} style={{width: '100%', height: 40, marginTop: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <LicenseIcon size={20} color='#fdfdfd' />
              <Text Text style={{color: '#fdfdfd', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 16}} numberOfLines={1}>Lisensi</Text>
            </View>
              <ProfileNextIcon size={16} color='#fdfdfd' />
          </Pressable>

          <View style={{width: '100%', height: 40, marginTop: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <VersionIcon size={20} color='#fdfdfd' />
              <Text Text style={{color: '#fdfdfd', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 16}} numberOfLines={1}>Version</Text>
            </View>
              <Text Text style={{color: '#fdfdfd', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 16}} numberOfLines={1}>{version}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

export default ProfileScreen