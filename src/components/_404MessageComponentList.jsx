import { View, Text, Image } from 'react-native';
import React from 'react';

const _404MessageComponentList = ({ title = "Oops! Anime tidak ditemukan", subtitle = "Coba genre lain atau periksa koneksi internetmu." }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 50,
      }}
    >
      <Image
        source={{ uri: 'https://i.imgur.com/qIufhof.png' }} // Ganti dengan gambar 404 favoritmu
        style={{ width: 150, height: 150, marginBottom: 15, tintColor: 'gray' }}
      />
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
        {title}
      </Text>
      <Text
        style={{
          color: 'gray',
          fontSize: 14,
          textAlign: 'center',
          marginTop: 5,
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default _404MessageComponentList;
