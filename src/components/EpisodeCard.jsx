import React, { useState } from 'react';
import { View, Text, Pressable, Animated, Platform, StyleSheet } from 'react-native';

const EpisodeCard = ({ episodeNumber, onPress }) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.96,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress} // Hanya trigger jika benar-benar tap, bukan swipe
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      delayPressIn={100} // Mencegah tap accidental saat swipe
      android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: false }}
      style={({ pressed }) => [
        styles.container,
        Platform.OS === 'ios' && pressed ? styles.pressed : null,
      ]}>
      <Animated.View style={[styles.inner, { transform: [{ scale }] }]}>
        <Text style={styles.text}>Episode {episodeNumber}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  inner: {
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },
  pressed: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});

export default EpisodeCard;
