// components/AnimeCardItem.jsx

import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import FastImage from '@d11/react-native-fast-image';

const fallbackImg = require('../../assets/Images/404ImageNotFound.png');

const AnimeCardItemRecent = ({item, onPress}) => {
  const [imgHasError, setImgHasError] = useState(false);

  return (
    <Pressable
      onPress={onPress}
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
          marginRight: 15,
        }}
        source={
          imgHasError
            ? fallbackImg
            : {
                uri: item.poster,
                priority: FastImage.priority.normal,
              }
        }
        resizeMode={FastImage.resizeMode.cover}
        onError={() => setImgHasError(true)}
      />
      <View style={{flex: 1, gap: 8}}>
        <Text
          numberOfLines={3}
          style={{
            color: '#fff',
            fontSize: 17,
            fontFamily: 'NotoSans_SemiCondensed-Bold',
          }}>
          {item.title}
        </Text>

        {/* 🔁 Bikin conditional bagian ini biar reusable */}
        {item.episodes && (
          <Text
            style={{
              color: 'rgba(255,255,255,1)',
              fontSize: 12,
              backgroundColor: '#0FD312',
              paddingVertical: 3,
              fontFamily: 'NotoSans_SemiCondensed-Bold',
              width: 80,
              textAlign: 'center',
              borderRadius: 30,
            }}
            numberOfLines={1}>
            Episode {item.episodes}
          </Text>
        )}

        {item.status && (
          <Text
            style={{
              color: 'rgba(255,255,255,1)',
              fontSize: 12,
              backgroundColor:
                item.status === 'Completed'
                  ? '#00a2ff'
                  : item.status === 'Ongoing'
                  ? '#ff6d1e'
                  : 'gray',
              paddingVertical: 3,
              fontFamily: 'NotoSans_SemiCondensed-Bold',
              width: 90,
              textAlign: 'center',
              borderRadius: 30,
            }}
            numberOfLines={1}>
            {item.status}
          </Text>
        )}

        {item.releasedOn && (
          <Text
            style={{
              color: '#aaa',
              fontSize: 15,
              fontFamily: 'OpenSans_Condensed-SemiBold',
            }}
            numberOfLines={1}>
            Release {item.releasedOn}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default AnimeCardItemRecent;
