import FastImage from '@d11/react-native-fast-image';
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

const EpisodeCardWithPoster = ({ title, poster, releaseDate, onPress }) => {

  return (
    <Pressable
      android_ripple={{ color: 'rgba(255,255,255,0.4)', borderless: false }}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
      >
      <View style={styles.inner}>
    <FastImage
      style={styles.poster}
      source={
        poster === null || poster === undefined || poster === ''
          ? require('../../assets/Images/404ImageNotFound.png')
          : {
              uri: poster,
              priority: FastImage.priority.high,
            }
      }
      resizeMode={FastImage.resizeMode.cover}
      onError={() => setError(true)}
    />
        <View style={styles.textContainer}>
          <Text numberOfLines={4} style={styles.title}>
            {title}
          </Text>
          <Text style={styles.date} numberOfLines={1}>{releaseDate}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    paddingVertical: 10,
    paddingHorizontal: 15,
},
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  poster: {
    width: 150,
    aspectRatio: 16 / 9,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  title: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'left',
  },
  date: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Poppins-Medium',
  },
});

export default EpisodeCardWithPoster;
