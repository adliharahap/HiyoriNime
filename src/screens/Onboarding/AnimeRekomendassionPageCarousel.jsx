import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
const { width: screenWidth } = Dimensions.get('window');

const AnimeRekomendassionPageCarousel = () => {
  return (
    <View style={[styles.page, { backgroundColor: '#fff', flex: 1 }]}>
      <View style={{ height: 100, width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
          <Text style={[styles.HeaderTitle]}>HiyoriNime<Text style={{color: '#f33421'}}>.</Text></Text>
      </View>
      <ImageBackground source={{uri: 'https://i.pinimg.com/736x/fa/43/9f/fa439fd18238cab42edb9f0de71d758c.jpg'}} style={{flex: 1,width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
        <View
            style={{
              width: '100%',
              height: 200, // Sesuaikan biar ga nutup full
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: '#fff',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingTop: 20,
            }}
        >
          <Text style={[styles.text]}>Welcome To</Text>
          <Text style={[styles.text]}>HiyoriNime</Text>
          <View style={{paddingTop: 20}}>
            <Text style={[styles.subText]}>
              Siap lanjut nonton hari ini? 
            </Text>
            <Text style={[styles.subText]}>
              Cari anime favoritmu dan gas nonton
            </Text>
          </View>
        </View>
      </ImageBackground>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: screenWidth,
    alignItems: 'center'
  },
  HeaderTitle: {
    fontSize: 22,
    color: '#000',
    fontFamily: 'NotoSans_Condensed-Medium',
    paddingHorizontal: 20,
    letterSpacing: 0.8,
  },
  text: {
    fontSize: 30,
    color: '#000',
    fontFamily: 'Roboto-Bold',
    paddingHorizontal: 20,
  },

  subText: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: 'rgba(151, 151, 151, 0.8)',
    fontFamily: 'NotoSans_ExtraCondensed-Regular',
  },
});

export default AnimeRekomendassionPageCarousel