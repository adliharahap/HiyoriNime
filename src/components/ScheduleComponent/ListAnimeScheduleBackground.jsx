import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ListAnimeScheduleBackground = ({ title, genre, rating, estimation, type, ImgBackground, href }) => {
  const navigation = useNavigation();
  
  // Extract routerId from href
  const animeId = href.replace('/samehadaku/anime/', '');

  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailAnime', { animeId, animeTitle: title })}>
      <ImageBackground
        source={{ uri: ImgBackground }}
        style={{
          height: '100%',
          maxHeight: 200,
          width: 150,
          backgroundColor: '#000',
          borderRadius: 15,
          overflow: 'hidden',
          position: 'relative',
        }}
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
              Genre: {genre}
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
              Type: {type} | {estimation}
            </Text>
          </View>
        </LinearGradient>
        <Text
          style={{
            color: 'rgb(255, 255, 255)',
            fontFamily: 'OpenSans_Condensed-SemiBold',
            fontSize: 12,
            textAlign: 'center',
            position: 'absolute',
            top: 6,
            left: 6,
            paddingHorizontal: 6,
            paddingVertical: 3,
            backgroundColor: 'rgba(216, 189, 78, 0.7)',
            borderRadius: 50,
          }}
          numberOfLines={1}
        >
          ⭐ {rating}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ListAnimeScheduleBackground;