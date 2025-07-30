import { View, Text, ImageBackground, useWindowDimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const RecentListAnimeImageBackground = ({ title, eps, releasedOn, ImgBackground }) => {
  const { width } = useWindowDimensions();

  // Misalnya 1 card ambil 70% dari lebar layar, bisa disesuaikan
  const cardWidth = width * 0.9;
  const cardHeight = (cardWidth * 9) / 16; // Aspect ratio 16:9

  return (
    <ImageBackground
      source={{ uri: ImgBackground }}
      style={{
        width: cardWidth,
        height: cardHeight,
        backgroundColor: '#000',
        borderRadius: 15,
        overflow: 'hidden',
      }}
      imageStyle={{ borderRadius: 15 }}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.0)', 'rgba(0,0,0,0.8)']}
        locations={[0.5, 1]}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 10,
          paddingHorizontal: 5,
        }}
      >
        <View>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'NotoSans_Condensed-SemiBold',
              fontSize: 17,
              textAlign: 'center',
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'OpenSans_Condensed-SemiBold',
              fontSize: 13,
              textAlign: 'center',
            }}
            numberOfLines={1}
          >
            Eps. {eps}
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'OpenSans_Condensed-SemiBold',
              fontSize: 13,
              textAlign: 'center',
            }}
            numberOfLines={1}
          >
            {releasedOn}
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default RecentListAnimeImageBackground;
