import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const BackIcon = ({ color, size }) => (
  <Text style={{ color, fontSize: size, transform: [{ scaleX: 0.8 }] }}>‹</Text>
);

const LinkIcon = ({ color, size }) => (
  <Text style={{ color, fontSize: size, marginRight: 8 }}>🔗</Text>
);

const InfoCard = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.separator} />
    {children}
  </View>
);

const LinkButton = ({ url, title, icon }) => {
  const openLink = () => Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  return (
    <TouchableOpacity style={styles.linkButton} onPress={openLink}>
      {icon}
      <Text style={styles.linkButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const AboutScreen = () => {
  const navigation = useNavigation();

  const techStack = [
    'React Native 0.78.0',
    'React 19.0.0',
    'Redux Toolkit',
    'React Navigation',
    'React Native Video',
    'Firebase',
    'Axios',
    'Google Sign-In',
    'React Native FS & WebView',
    'Curved Bottom Navigation',
    'Image Crop Picker',
    'AsyncStorage & Permissions',
    'Blur Effect, Linear Gradient',
    'SVG, Keep Awake, Dotenv',
    'Date Picker, Safe Area Context'
  ];

  const features = [
    'Login dengan Google & Email',
    'Streaming Anime',
    'Download Anime per Episode / Batch',
    'Pemilihan Server Streaming',
    'Pencarian Anime',
    'Simpan Anime ke Favorit',
    'UI & Animasi Menarik',
  ];

  const nextUpdates = [
    'Perbaikan UI Alert & Notifikasi',
    'Penambahan Fitur History Nonton Anime',
    'Dukungan Server Samehadaku & Nimegami',
    'Optimisasi performa & penyimpanan lokal',
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackIcon color='#E0E0E0' size={40} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tentang HiyoriNime</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <InfoCard title="Tentang Aplikasi">
          <Text style={styles.cardContent}>
            HiyoriNime adalah aplikasi streaming anime yang dirancang untuk memberikan pengalaman menonton yang nyaman dan menyenangkan. Aplikasi ini dibuat sebagai proyek pembelajaran dan portofolio pengembang.
          </Text>
        </InfoCard>

        <InfoCard title="Tujuan Aplikasi">
          <Text style={styles.cardContent}>Aplikasi ini dibuat untuk tujuan berikut:</Text>
          <Text style={styles.listItem}>• Pembelajaran & Eksperimen dengan teknologi mobile terbaru.</Text>
          <Text style={styles.listItem}>• Portofolio untuk menunjukkan keterampilan pengembangan aplikasi.</Text>
          <Text style={styles.listItem}>• Menyediakan akses mudah ke anime dengan antarmuka yang bersih.</Text>
        </InfoCard>

        <InfoCard title="Teknologi yang Digunakan">
          {techStack.map((tech, index) => (
            <Text key={index} style={styles.listItem}>- {tech}</Text>
          ))}
        </InfoCard>

        <InfoCard title="Sumber Data">
          <Text style={styles.cardContent}>
            HiyoriNime menggunakan Wajik Anime API sebagai sumber utama data anime.
          </Text>
          <LinkButton 
            url='https://github.com/wajik45/wajik-anime-api' 
            title='Kunjungi Wajik Anime API'
            icon={<LinkIcon color="#A78BFA" size={16} />}
          />
        </InfoCard>

        <InfoCard title="Fitur Utama">
          {features.map((feature, index) => (
            <Text key={index} style={styles.listItem}>✓ {feature}</Text>
          ))}
        </InfoCard>

        <InfoCard title="Next Update (Kalau Rajin 😹)">
          {nextUpdates.map((item, index) => (
            <Text key={index} style={styles.listItem}>• {item}</Text>
          ))}
        </InfoCard>

        <InfoCard title="Status Pengembangan">
          <Text style={styles.cardContent}>
            Aplikasi ini masih dalam tahap pengembangan aktif dan akan terus menerima pembaruan untuk perbaikan dan penambahan fitur.
          </Text>
        </InfoCard>

        <InfoCard title="Pengembang">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <Image
              source={{ uri: 'https://media.licdn.com/dms/image/v2/D4E03AQF-7MCGNRgxHA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1695786501535?e=2147483647&v=beta&t=9GAgRpROe4_NPJo-OjwdiKTtz51C1jY4dbUlnEfWLas' || 'https://avatars.githubusercontent.com/u/106441991?v=4' }} // Ganti URL ini kalau pakai foto sendiri ya! 📸
              style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#A78BFA' }}
            />
            <View>
              <Text style={[styles.cardContent, { fontWeight: '600', fontSize: 16 }]}>Adli Rahman Harun Harahap</Text>
              <View style={styles.linkContainer}>
                <LinkButton url='https://github.com/adliharahap' title='GitHub' />
                <LinkButton url='https://www.linkedin.com/in/adlirahmanharunharahap/' title='LinkedIn' />
              </View>
            </View>
          </View>
        </InfoCard>

        <InfoCard title="Disclaimer">
          <Text style={styles.cardContentWarning}>
            Aplikasi ini dikembangkan hanya untuk tujuan pembelajaran dan portofolio, bukan untuk penggunaan komersial. Pengguna sangat disarankan untuk selalu mendukung industri dengan menonton anime melalui platform resmi yang tersedia.
          </Text>
        </InfoCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  headerTitle: {
    color: '#E0E0E0',
    fontWeight: '600',
    fontSize: 22,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  cardTitle: {
    color: '#A78BFA',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#27272a',
    marginBottom: 15,
  },
  cardContent: {
    color: '#BDBDBD',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular',
  },
  cardContentWarning: {
    color: '#FBBF24',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular',
  },
  listItem: {
    color: '#BDBDBD',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    gap: 10,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#373737',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  linkButtonText: {
    color: '#E0E0E0',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});


export default AboutScreen;
