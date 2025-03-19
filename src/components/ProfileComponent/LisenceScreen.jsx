import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/Icons/BackIcon';

const LisenceScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b1b1b' }}>
      {/* Header */}
      <View style={{ height: 50, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon color='#fff' size={28} />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontFamily: 'OpenSans_SemiCondensed-Bold', fontSize: 22, marginLeft: 20 }}>
          Lisensi Aplikasi
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Section title='Tentang Aplikasi' icon='ℹ️'
          content='HiyoriNime adalah aplikasi yang dikembangkan untuk tujuan pembelajaran dan sebagai bagian dari portofolio pengembang. Aplikasi ini tidak dimaksudkan untuk digunakan sebagai platform utama dalam menonton anime, dan pengguna disarankan untuk menonton melalui layanan resmi dan legal.' />

        <Section title='Hak Cipta & Konten' icon='🛡️'
          content='Aplikasi ini tidak menyimpan atau mendistribusikan konten anime secara langsung. Semua data dan media yang ditampilkan dalam aplikasi bersumber dari API pihak ketiga, yaitu Wajik Anime API. Hak cipta atas semua konten anime sepenuhnya dimiliki oleh pemegang hak cipta yang sah. Jika ada pemilik konten yang merasa hak ciptanya dilanggar, silakan hubungi penyedia API terkait.'
          link='https://github.com/wajik45/wajik-anime-api' />

        <Section title='Tanggung Jawab Pengguna' icon='⚠️'
          content='Pengguna bertanggung jawab penuh atas penggunaan aplikasi ini. Pengembang tidak bertanggung jawab atas pelanggaran hak cipta atau penyalahgunaan aplikasi oleh pengguna. Pengguna diharapkan menggunakan aplikasi ini untuk keperluan edukasi atau pengembangan, bukan sebagai sarana utama untuk mengakses anime secara ilegal.' />

        <Section title='Penggunaan API Pihak Ketiga' icon='🔗'
          content='Aplikasi ini menggunakan API dari pihak ketiga untuk mendapatkan informasi terkait anime. Pengembang tidak memiliki kontrol atas keakuratan, ketersediaan, atau kebijakan API tersebut. Perubahan atau penghentian layanan API dapat berdampak pada fitur aplikasi.' />

        <Section title='Batasan Tanggung Jawab' icon='🚫'
          content='Aplikasi ini disediakan "sebagaimana adanya" tanpa jaminan dalam bentuk apa pun. Pengembang tidak bertanggung jawab atas: Kerusakan atau kehilangan data akibat penggunaan aplikasi, perubahan atau penghentian layanan API yang menyebabkan fitur aplikasi tidak dapat berfungsi, tindakan pengguna yang melanggar hukum terkait hak cipta.' />

        <Section title='Ketentuan Penggunaan' icon='📜'
          content='Dengan menggunakan aplikasi ini, pengguna dianggap telah memahami dan menyetujui semua ketentuan dalam lisensi ini. Jika tidak setuju dengan ketentuan ini, harap hentikan penggunaan aplikasi.' />

        <Section title='Anjuran Menonton Anime Secara Legal' icon='🎥'
          content='HiyoriNime mendukung industri anime dan menghargai kerja keras para kreator. Oleh karena itu, pengguna dianjurkan untuk menonton anime melalui platform resmi seperti: Crunchyroll, Netflix, Funimation, Muse Asia (YouTube), Bilibili. Dengan menonton anime secara legal, kita ikut mendukung industri agar terus berkembang dan menghasilkan karya-karya terbaik! 💖' />
      </ScrollView>
    </SafeAreaView>
  );
};

const Section = ({ title, icon, content, link }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        <Text style={{ fontSize: 22 }}>{icon}</Text>
        <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'OpenSans_SemiCondensed-Bold', marginLeft: 10 }}>
          {title}
        </Text>
      </View>
      <Text style={{ color: '#bbb', fontSize: 14, fontFamily: 'OpenSans_SemiCondensed-Medium', textAlign: 'justify' }}>
        {content}
      </Text>
      {link && (
        <Text 
          style={{ color: '#1E90FF', fontSize: 14, fontFamily: 'OpenSans_SemiCondensed-Medium', marginTop: 5 }}
          onPress={() => Linking.openURL(link)}
        >
          {link}
        </Text>
      )}
    </View>
  );
};

export default LisenceScreen;