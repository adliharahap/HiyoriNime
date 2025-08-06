import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// --- Komponen & Ikon ---
const BackIcon = ({ color, size }) => (
  <Text style={{ color, fontSize: size, transform: [{ scaleX: 0.8 }] }}>‹</Text>
);

const InfoCard = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.separator} />
    {children}
  </View>
);

// --- Komponen Utama Layar Kebijakan Privasi ---

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  // Menggunakan tanggal hari ini untuk relevansi
  const effectiveDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackIcon color='#E0E0E0' size={40} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kebijakan Privasi</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.effectiveDate}>Terakhir diperbarui: {effectiveDate}</Text>

        <InfoCard title="Komitmen Kami pada Privasi Anda">
          <Text style={styles.cardContent}>
            Di HiyoriNime, kami menghargai privasi Anda. Kebijakan Privasi ini bertujuan untuk menjelaskan secara transparan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan aplikasi kami. Kepercayaan Anda adalah prioritas utama kami.
          </Text>
        </InfoCard>

        <InfoCard title="Informasi yang Kami Kumpulkan">
            <Text style={styles.cardContent}>
              Untuk menyediakan fungsionalitas aplikasi, kami mengumpulkan jenis data berikut saat Anda mendaftar atau masuk:
            </Text>
            <Text style={styles.listItem}>
                • <Text style={styles.bold}>Data Identitas:</Text> Nama lengkap, alamat email, dan foto profil yang Anda berikan saat mendaftar melalui Google atau Email (via Firebase Authentication).
            </Text>
            <Text style={styles.listItem}>
                • <Text style={styles.bold}>Data Aplikasi:</Text> Informasi yang Anda buat di dalam aplikasi, seperti daftar anime yang Anda simpan ke "Favorit". Data ini ditautkan ke akun Anda untuk personalisasi.
            </Text>
             <Text style={styles.cardContent}>
              Kami <Text style={styles.bold}>tidak</Text> mengumpulkan data sensitif seperti lokasi geografis, kontak telepon, atau riwayat penelusuran di luar aplikasi.
            </Text>
        </InfoCard>

        <InfoCard title="Bagaimana Kami Menggunakan Data Anda">
            <Text style={styles.cardContent}>
              Informasi pribadi Anda digunakan secara khusus untuk tujuan berikut:
            </Text>
            <Text style={styles.listItem}>
                • <Text style={styles.bold}>Autentikasi Pengguna:</Text> Untuk membuat dan mengelola akun Anda, serta menjaga keamanan sesi login Anda.
            </Text>
            <Text style={styles.listItem}>
                • <Text style={styles.bold}>Personalisasi Pengalaman:</Text> Untuk menampilkan nama dan foto profil Anda di dalam aplikasi, serta menyimpan preferensi Anda seperti daftar anime favorit.
            </Text>
             <Text style={styles.listItem}>
                • <Text style={styles.bold}>Komunikasi:</Text> Kami mungkin menggunakan alamat email Anda untuk mengirimkan informasi penting terkait akun atau pembaruan layanan, namun bukan untuk tujuan pemasaran.
            </Text>
        </InfoCard>
        
        <InfoCard title="Penyimpanan & Keamanan Data">
            <Text style={styles.cardContent}>
              Keamanan data Anda adalah hal yang serius bagi kami.
            </Text>
            <Text style={styles.listItem}>
                • <Text style={styles.bold}>Penyimpanan Aman:</Text> Semua data pengguna disimpan dan dikelola oleh layanan <Text style={styles.bold}>Firebase by Google</Text>, yang menerapkan standar keamanan terdepan di industri untuk melindungi data dari akses tidak sah.
            </Text>
            <Text style={styles.listItem}>
                • <Text style={styles.bold}>Tidak Ada Penjualan Data:</Text> Kami berkomitmen untuk <Text style={styles.bold}>tidak akan pernah membagikan, menjual, atau menyewakan</Text> informasi pribadi Anda kepada pihak ketiga mana pun.
            </Text>
        </InfoCard>
        
        <InfoCard title="Hak Anda Atas Data Pribadi">
            <Text style={styles.cardContent}>
              Sebagai pengguna, Anda memiliki kendali penuh atas data Anda.
            </Text>
            <Text style={styles.listItem}>
                • <Text style={styles.bold}>Akses & Koreksi:</Text> Anda dapat melihat dan memperbarui sebagian data Anda (seperti nama dan foto profil) melalui pengaturan akun Google Anda.
            </Text>
            <Text style={styles.listItem}>
                • <Text style={styles.bold}>Penghapusan Data:</Text> Anda berhak meminta penghapusan seluruh data akun Anda dari server kami. Untuk melakukannya, silakan kirim permintaan melalui email ke <Text style={styles.bold}>adliharahap1123@gmail.com</Text> dari alamat email yang terdaftar.
            </Text>
        </InfoCard>

        <InfoCard title="Privasi Anak-Anak">
          <Text style={styles.cardContent}>
            Aplikasi ini tidak ditujukan untuk mengumpulkan data pribadi dari anak di bawah usia 13 tahun secara sengaja. Jika Anda adalah orang tua atau wali dan mengetahui bahwa anak Anda telah memberikan data kepada kami tanpa persetujuan Anda, silakan hubungi kami agar kami dapat mengambil tindakan yang diperlukan.
          </Text>
        </InfoCard>

        <InfoCard title="Kontak">
          <Text style={styles.cardContent}>
            Jika ada pertanyaan atau kekhawatiran mengenai Kebijakan Privasi ini, jangan ragu untuk menghubungi kami melalui halaman "Hubungi Developer" atau langsung ke email yang tercantum di atas.
          </Text>
        </InfoCard>

      </ScrollView>
    </SafeAreaView>
  );
};

// --- Stylesheet ---
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
  effectiveDate: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
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
    lineHeight: 24,
    textAlign: 'justify',
  },
  listItem: {
    color: '#BDBDBD',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'justify',
  },
  bold: {
    fontWeight: '700',
    color: '#E0E0E0',
  },
});

export default PrivacyPolicyScreen;
