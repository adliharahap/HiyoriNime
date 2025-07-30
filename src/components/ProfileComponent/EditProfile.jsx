import FastImage from '@d11/react-native-fast-image';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Path } from 'react-native-svg'; // Contoh icon manual
import { useSelector } from 'react-redux';

// Simulasi apakah login via Google atau Email
const isGoogleLogin = true;

const EditProfile = () => {
    const dataUser = useSelector(state => state.user.userData);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [email, setEmail] = useState('kakadli@example.com');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <LinearGradient
      colors={['#000000', 'rgba(81, 8, 10, 1)']}
      locations={[0.2, 1]}
      style={styles.container}
    >
      <View style={styles.profileImageContainer}>
        <FastImage
          style={styles.profileImage}
            source={
            dataUser.photo
                ? {uri: dataUser.photo, priority: FastImage.priority.normal}
                : require('../../assets/Images/Default_Profile_Screen.jpg')
            }
          resizeMode={FastImage.resizeMode.cover}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"
              fill="#fff"
            />
          </Svg>
        </TouchableOpacity>
      </View>

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
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Masukkan username"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Tanggal Lahir</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text style={styles.dateText}>{formatDate(birthDate)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        <Text style={styles.label}>Bio Profile</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Masukkan Bio Profile"
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
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
  infoBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  infoText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  infoNote: {
    color: '#aaa',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: 'rgba(229, 57, 53, 0.9)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});

export default EditProfile;
