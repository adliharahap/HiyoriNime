import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const fallbackImg = require('../../assets/Images/404ImageNotFound.png');

const AnimeCardItem = ({ item }) => {
  const navigation = useNavigation();
  const [hasError, setHasError] = useState(false);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('DetailAnime', {
          animeId: item.animeId,
          animeTitle: item.title,
        })
      }
      android_ripple={{
        color: 'rgba(255,255,255,0.2)',
        borderless: false,
      }}
      style={{
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        position: 'relative',
      }}>
      <FastImage
        style={{
          width: 105,
          height: 125,
          borderRadius: 5,
          marginRight: 10,
        }}
          source={
            hasError
            ? fallbackImg
            : {
                uri: item.poster,
                priority: FastImage.priority.normal,
            }
        }
        resizeMode={FastImage.resizeMode.cover}
        onError={() => {
          setHasError(true);
        }}
      />
      <View style={{ flex: 1, gap: 10 }}>
        <Text
          numberOfLines={3}
          style={{
            color: '#fff',
            fontSize: 17,
            fontFamily: 'NotoSans_SemiCondensed-Bold',
          }}>
          {item.title}
        </Text>

        <View style={{ width: '100%', flexDirection: 'row', gap: 10 }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              backgroundColor: '#0FD312',
              paddingVertical: 3,
              fontFamily: 'NotoSans_SemiCondensed-Bold',
              textAlign: 'center',
              borderRadius: 30,
              paddingHorizontal: 20,
            }}>
            {item.type}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              backgroundColor:
                item.status === 'Completed'
                  ? '#00a2ff'
                  : item.status === 'Ongoing'
                  ? '#ff6d1e'
                  : 'gray',
              paddingVertical: 3,
              fontFamily: 'NotoSans_SemiCondensed-Bold',
              textAlign: 'center',
              borderRadius: 30,
              paddingHorizontal: 20,
            }}>
            {item.status}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              backgroundColor: 'rgba(228,255,0,0.7)',
              paddingVertical: 3,
              fontFamily: 'NotoSans_SemiCondensed-Bold',
              textAlign: 'center',
              borderRadius: 30,
              paddingHorizontal: 20,
            }}>
            ⭐ {item.score}
          </Text>
        </View>

        <Text
          numberOfLines={2}
          style={{
            color: '#fff',
            fontSize: 14,
            fontFamily: 'NotoSans_Condensed-Medium',
          }}>
          Genre : {item.genreList.map(genre => genre.title).join(', ')}
        </Text>
      </View>
    </Pressable>
  );
};

export default AnimeCardItem;
