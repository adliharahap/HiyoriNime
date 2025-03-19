import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/Icons/BackIcon';

const AboutScreen = () => {
  const navigation = useNavigation();

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b1b1b' }}>
      {/* Header */}
      <View style={{ height: 50, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon color='#fff' size={28} />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontFamily: 'OpenSans_SemiCondensed-Bold', fontSize: 22, marginLeft: 20 }}>
          Tentang HiyoriNime
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Section title='📝 Tentang HiyoriNime' 
          content='HiyoriNime adalah aplikasi streaming anime yang dirancang untuk memberikan pengalaman menonton yang nyaman dan menyenangkan. Aplikasi ini dibuat sebagai proyek pembelajaran dan portofolio pengembang.' />

        <Section title='🎯 Tujuan Aplikasi' 
          content='Pembelajaran & Eksperimen: Mengembangkan aplikasi mobile dengan teknologi terbaru.
Portofolio Pengembang: Bukti keterampilan dalam membangun aplikasi mobile.
Kemudahan Akses Anime: UI menarik dan mudah digunakan.' />

        <Section title='🔧 Teknologi yang Digunakan' 
          content='- React Native
- Redux Toolkit
- React Navigation
- React Native SVG & Animated
- Axios
- React Native Video' />

        <Section title='🌐 Sumber Data' 
          content='HiyoriNime menggunakan Wajik Anime API sebagai sumber utama data anime.' />

        <TouchableOpacity onPress={() => openLink('https://github.com/wajik45/wajik-anime-api')}>
          <Text style={{ color: '#4fa3ff', fontSize: 16, fontFamily: 'OpenSans_SemiCondensed-Medium', textAlign: 'center', marginVertical: 10 }}>
            🔗 Wajik Anime API
          </Text>
        </TouchableOpacity>

        <Section title='🚨 Disclaimer' 
          content='Aplikasi ini dikembangkan hanya untuk pembelajaran, bukan untuk penggunaan komersial. Pengguna disarankan menonton anime melalui platform resmi.' />

        <Section title='📌 Fitur Utama' 
          content='✅ Streaming Anime
✅ Dark Mode
✅ Pilihan Server
✅ Pengaturan Bahasa
✅ UI & Animasi Menarik' />

        <Section title='🏗️ Status Pengembangan' 
          content='Aplikasi ini masih dalam tahap pengembangan dan akan terus diperbarui.' />

        <Section title='👨‍💻 Pengembang' content='Nama: Adli Rahman Harun Harahap' />
        <TouchableOpacity onPress={() => openLink('https://github.com/adliharahap')}>
          <Text style={{ color: '#4fa3ff', fontSize: 16, fontFamily: 'OpenSans_SemiCondensed-Medium', textAlign: 'center', marginVertical: 5 }}>
            🔗 GitHub
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/in/adlirahmanharunharahap/')}>
          <Text style={{ color: '#4fa3ff', fontSize: 16, fontFamily: 'OpenSans_SemiCondensed-Medium', textAlign: 'center', marginVertical: 5 }}>
            🔗 LinkedIn
          </Text>
        </TouchableOpacity>
        <View style={{height: 80}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Section = ({ title, content }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'OpenSans_SemiCondensed-Bold', marginBottom: 5 }}>
        {title}
      </Text>
      <Text style={{ color: '#bbb', fontSize: 14, fontFamily: 'OpenSans_SemiCondensed-Medium', textAlign: 'justify' }}>
        {content}
      </Text>
    </View>
  );
};

export default AboutScreen;
