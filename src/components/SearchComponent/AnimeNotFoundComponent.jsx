import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchIcon from '../../assets/Icons/SearchIcon';

const AnimeNotFoundComponent = () => {
  return (
    <View style={styles.container}>
      <SearchIcon size={130} color='#ded9d9ff'  />
      <Text style={styles.title}>Anime Tidak Ditemukan</Text>
      <Text style={styles.subtitle}>
        Coba periksa kembali ejaan atau gunakan kata kunci lain yang lebih umum.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#EAEAEA',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#888899',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
});

export default AnimeNotFoundComponent;
