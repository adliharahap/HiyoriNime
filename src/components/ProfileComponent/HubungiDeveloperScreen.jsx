import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, SafeAreaView } from 'react-native';
import EmailIcon from '../../assets/Icons/EmailIcon';
import GithubIcon from '../../assets/Icons/GithubIcon';
import LinkedinIcon from '../../assets/Icons/linkedinIcon';
import WhatsAppIcon from '../../assets/Icons/WhatsAppIcon';
// import WhatsAppIcon from '../../assets/Icons/WhatsappIcon';

// --- Komponen Tombol Kontak ---
const ContactButton = ({ icon, label, value, url }) => {
  const handlePress = () => Linking.openURL(url);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttonLabel}>{label}</Text>
        <Text style={styles.buttonValue}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

// --- Komponen Utama ---
const HubungiDeveloperScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <Text style={styles.heading}>Hubungi Developer</Text>
        </View>
        <Text style={styles.description}>
          Jika kamu punya pertanyaan, saran, atau ingin kerja sama, langsung aja hubungi aku lewat salah satu kontak di bawah ini yaa
        </Text>

        <View style={styles.list}>
          <ContactButton
            icon={<EmailIcon color='#A78BFA' size={28} />}
            label="Email"
            value="adliharahap1123@gmail.com"
            url="mailto:adliharahap1123@gmail.com"
          />
          <ContactButton
            icon={<WhatsAppIcon size={24} color="#25D366" />}
            label="WhatsApp"
            value="+62 896-7665-5115"
            url="https://wa.me/6289676655115"
          />
          <ContactButton
            icon={<GithubIcon color='#F8FAFC' size={24} />}
            label="GitHub"
            value="github.com/adliharahap"
            url="https://github.com/adliharahap"
          />
          <ContactButton
            icon={<LinkedinIcon size={26} />}
            label="LinkedIn"
            value="in/adlirahmanharunharahap"
            url="https://linkedin.com/in/adlirahmanharunharahap"
          />
        </View>

        <Text style={styles.footer}>Terima kasih telah menggunakan aplikasi HiyoriNime!</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HubungiDeveloperScreen;

// --- Style Sheet ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#CBD5E1',
    marginBottom: 24,
    lineHeight: 22,
  },
  list: {
    gap: 14,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  icon: {
    marginRight: 14,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonLabel: {
    fontSize: 15,
    color: '#E5E7EB',
    fontWeight: '600',
  },
  buttonValue: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 13,
    color: '#64748B',
  },
});
