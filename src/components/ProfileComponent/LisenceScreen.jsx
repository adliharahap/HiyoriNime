import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const BackIcon = ({ color, size }) => (
  <Text style={{ color, fontSize: size, transform: [{ scaleX: 0.8 }] }}>‹</Text>
);

const LicenseScreen = () => {
  const navigation = useNavigation();

  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackIcon color="#E0E0E0" size={40} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lisensi & Ketentuan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tentang HiyoriNime</Text>
          <View style={styles.separator} />
          <Text style={styles.cardContent}>
            HiyoriNime dikembangkan oleh <Text style={styles.bold}>Adli Rahman Harun Harahap</Text> sebagai proyek pembelajaran React Native dan portofolio pengembangan aplikasi mobile.
          </Text>
          <Text style={styles.cardContentWarning}>
            ⚠️ Aplikasi ini hanya untuk tujuan pembelajaran dan pengembangan skill programming. Tidak direkomendasikan untuk penggunaan komersial.
          </Text>
          <Text style={styles.cardContent}>
            Untuk menonton anime secara legal, silakan gunakan platform resmi seperti Netflix, Crunchyroll, Funimation, atau layanan streaming legal lainnya.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sumber Konten & Disclaimer</Text>
          <View style={styles.separator} />
          <Text style={styles.cardContent}>
            Aplikasi ini menggunakan API pihak ketiga dari <Text style={styles.bold}>Wajik Anime API</Text> (https://wajik-anime-api.vercel.app/) yang melakukan scraping dari website Samehadaku.
          </Text>
          <Text style={styles.cardContentWarning}>
            📢 PENTING: Pengembang tidak memiliki, mengontrol, atau bertanggung jawab atas konten yang ditampilkan dalam aplikasi ini.
          </Text>
          <Text style={styles.cardContent}>
            • Semua hak cipta konten anime adalah milik pemilik asli dan studio produksi masing-masing.
          </Text>
          <Text style={styles.cardContent}>
            • Ketersediaan konten bergantung pada website sumber (Samehadaku) dan API pihak ketiga.
          </Text>
          <Text style={styles.cardContent}>
            • Aplikasi dapat mengalami gangguan jika sumber konten bermasalah atau tidak tersedia.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Lisensi Aplikasi</Text>
          <View style={styles.separator} />
          <Text style={styles.cardContentWarning}>
            MIT License © 2025 - Adli Rahman Harun Harahap
          </Text>
          <Text style={styles.cardContent}>
            Source code aplikasi ini tersedia untuk pembelajaran dan pengembangan dengan ketentuan:
          </Text>
          <Text style={styles.listItem}>✓ Penggunaan untuk pembelajaran pribadi dan proyek open-source</Text>
          <Text style={styles.listItem}>✓ Modifikasi dan distribusi dengan mencantumkan atribusi</Text>
          <Text style={styles.listItem}>✗ Penggunaan komersial tanpa izin tertulis</Text>
          <Text style={styles.listItem}>✗ Menghapus atribusi atau klaim kepemilikan</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ketentuan Penggunaan</Text>
          <View style={styles.separator} />
          <Text style={styles.cardContent}>
            <Text style={styles.bold}>Target Pengguna:</Text> Aplikasi ini dapat digunakan oleh semua pengguna dengan pemahaman bahwa ini adalah proyek pembelajaran.
          </Text>
          <Text style={styles.cardContent}>
            <Text style={styles.bold}>Penggunaan yang Diizinkan:</Text>
          </Text>
          <Text style={styles.listItem}>• Menonton streaming anime untuk pembelajaran dan hiburan pribadi</Text>
          <Text style={styles.listItem}>• Mengakses fitur-fitur aplikasi sesuai fungsinya</Text>
          <Text style={styles.listItem}>• Memberikan feedback untuk pengembangan aplikasi</Text>
          
          <Text style={styles.cardContent}>
            <Text style={styles.bold}>Penggunaan yang Dilarang:</Text>
          </Text>
          <Text style={styles.listItem}>• Menggunakan aplikasi untuk tujuan komersial</Text>
          <Text style={styles.listItem}>• Mendistribusikan konten anime untuk keuntungan pribadi</Text>
          <Text style={styles.listItem}>• Melakukan reverse engineering untuk tujuan yang merugikan</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fitur Download & Redirect</Text>
          <View style={styles.separator} />
          <Text style={styles.cardContent}>
            Fitur download dalam aplikasi ini tidak menyimpan konten di aplikasi, melainkan mengarahkan pengguna ke website sumber untuk mengunduh konten.
          </Text>
          <Text style={styles.cardContentWarning}>
            ⚠️ Pengembang tidak bertanggung jawab atas konten yang diunduh dari website eksternal atau masalah yang timbul dari proses download tersebut.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Privasi & Data Pengguna</Text>
          <View style={styles.separator} />
          <Text style={styles.cardContent}>
            Aplikasi ini mengumpulkan data pengguna melalui integrasi Firebase untuk fitur autentikasi, termasuk:
          </Text>
          <Text style={styles.listItem}>• Nama pengguna dan email</Text>
          <Text style={styles.listItem}>• Foto profil (jika menggunakan Google Sign-In)</Text>
          <Text style={styles.listItem}>• Data akun Google (untuk autentikasi)</Text>
          <Text style={styles.listItem}>• Preferensi dan riwayat penggunaan aplikasi</Text>
          
          <Text style={styles.cardContent}>
            Data yang dikumpulkan hanya digunakan untuk:
          </Text>
          <Text style={styles.listItem}>• Menyediakan layanan autentikasi</Text>
          <Text style={styles.listItem}>• Menyimpan preferensi pengguna</Text>
          <Text style={styles.listItem}>• Meningkatkan pengalaman pengguna</Text>
          
          <Text style={styles.cardContentWarning}>
            Data pengguna tidak akan dijual atau dibagikan kepada pihak ketiga untuk tujuan komersial.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Jurisdiksi & Hukum</Text>
          <View style={styles.separator} />
          <Text style={styles.cardContent}>
            Aplikasi ini dikembangkan dan beroperasi berdasarkan hukum yang berlaku di Indonesia. Pengguna yang mengakses aplikasi ini dianggap setuju dengan ketentuan yang berlaku.
          </Text>
          <Text style={styles.cardContent}>
            Tidak ada pembatasan geografis untuk konten, namun ketersediaan konten bergantung pada sumber eksternal (Samehadaku).
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ketersediaan Layanan</Text>
          <View style={styles.separator} />
          <Text style={styles.cardContentWarning}>
            ⚠️ PENTING: Ketersediaan layanan bergantung pada:
          </Text>
          <Text style={styles.listItem}>• Status website Samehadaku sebagai sumber konten</Text>
          <Text style={styles.listItem}>• Ketersediaan Wajik Anime API</Text>
          <Text style={styles.listItem}>• Koneksi internet pengguna</Text>
          <Text style={styles.listItem}>• Layanan Firebase untuk autentikasi</Text>
          
          <Text style={styles.cardContent}>
            Pengembang tidak dapat menjamin ketersediaan layanan 100% dan tidak bertanggung jawab atas gangguan layanan yang disebabkan oleh faktor eksternal.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pustaka & Dependensi</Text>
          <View style={styles.separator} />
          <Text style={styles.cardContent}>
            Aplikasi ini menggunakan pustaka open-source berikut:
          </Text>
          <Text style={styles.listItem}>• React Native - Framework pengembangan mobile</Text>
          <Text style={styles.listItem}>• Redux Toolkit - State management</Text>
          <Text style={styles.listItem}>• React Navigation - Navigasi aplikasi</Text>
          <Text style={styles.listItem}>• Firebase SDK - Autentikasi dan database</Text>
          <Text style={styles.listItem}>• Wajik Anime API - Sumber konten anime</Text>
          
          <Text style={styles.cardContent}>
            Semua pustaka tersebut tunduk pada lisensi masing-masing dan digunakan sesuai dengan ketentuan fair-use dan lisensi yang berlaku.
          </Text>
        </View>
                <View style={styles.card}>
          <Text style={styles.cardTitle}>Kontak & Dukungan</Text>
          <View style={styles.separator} />
          <Text style={styles.cardContent}>
            Untuk pertanyaan atau feedback, hubungi pengembang melalui:
          </Text>

          <TouchableOpacity onPress={() => openURL('mailto:adliharahap1123@gmail.com')}>
            <Text style={styles.linkButton}>✉️ Email: adliharahap1123@gmail.com</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openURL('https://github.com/adliharahap/hiyorinime')}>
            <Text style={styles.linkButton}>💻 GitHub: adliharahap/hiyorinime</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openURL('https://www.linkedin.com/in/adlirahmanharunharahap/')}>
            <Text style={styles.linkButton}>🔗 LinkedIn: Adli Rahman Harun Harahap</Text>
          </TouchableOpacity>

          <Text style={styles.cardContentWarning}>Terakhir diperbarui: 5 Agustus 2025</Text>
        </View>
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

    linkButton: {
    color: '#60A5FA',
    fontSize: 15,
    marginBottom: 10,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Medium',
  },
  
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  headerTitle: {
    color: '#E0E0E0',
    fontWeight: '600',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
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
    marginBottom: 10,
  },
  cardContentWarning: {
    color: '#FBBF24',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  listItem: {
    color: '#BDBDBD',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
    color: '#E0E0E0',
  },
});

export default LicenseScreen;