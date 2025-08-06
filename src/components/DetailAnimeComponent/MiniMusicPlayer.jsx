import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { Svg, Path, Circle } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';

// --- SVG Icons (dibuat di dalam file agar self-contained) ---
const PauseIcon = ({ size, color }) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill={color} />
  </Svg>
);

// --- Komponen Utama ---
const MiniMusicPlayer = ({
  posterUrl,
  title = 'Unknown Title',
  artist = 'Unknown Artist',
  mp3Url,
  backgroundColor,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null);
  const spinValue = useRef(new Animated.Value(0)).current;
  const expandAnim = useRef(new Animated.Value(1)).current; // 1 = expanded, 0 = collapsed

  // Mendapatkan dimensi layar untuk kalkulasi lebar
  const screenWidth = Dimensions.get('window').width;
  const collapsedWidth = 60; // Lebar saat hanya poster terlihat
  const expandedWidth = screenWidth * 0.45; // Lebar saat penuh

  // Efek untuk animasi expand/collapse berdasarkan status isPlaying
  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: isPlaying ? 1 : 0,
      duration: 350,
      useNativeDriver: false, // Diperlukan untuk animasi 'width'
    }).start();
  }, [isPlaying]);

  // Efek untuk animasi poster berputar secara terus-menerus
  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();
    return () => spinAnimation.stop();
  }, [spinValue]);

  // Interpolasi nilai untuk animasi
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedWidth = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [collapsedWidth, expandedWidth],
  });

  const contentOpacity = expandAnim.interpolate({
    inputRange: [0, 0.5, 1], // Fade-out cepat, fade-in setelah setengah jalan
    outputRange: [0, 0, 1],
  });

  const formatTime = (timeInSeconds) => {
    if (!timeInSeconds || timeInSeconds < 0) return "0:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useFocusEffect(
  React.useCallback(() => {
    // Saat screen yang punya player aktif
    setIsPlaying(false);
    console.log('🎵 Player aktif!');

    return () => {
      // Saat screen blur (misal navigate ke WatchAnimeScreen)
      setIsPlaying(false);
      console.log('🛑 Player dihentikan');

      if (videoRef.current) {
        videoRef.current.seek(0);
        setCurrentTime(0);
        console.log('⏹️ Video di-stop & reset!');
      } else {
        console.warn('⚠️ videoRef belum siap buat di-seek!');
      }
    };
  }, [])
);

  return (
    <>
      {/* Komponen Video untuk memutar audio di background */}
      <Video
        ref={videoRef}
        source={{ uri: mp3Url }}
        paused={!isPlaying}
        onLoad={data => setDuration(data.duration)}
        onProgress={data => setCurrentTime(data.currentTime)}
        repeat={true}
        audioOnly={true}
        // --- PERUBAHAN KUNCI ---
        // Memastikan video berhenti saat aplikasi tidak aktif atau di background
        playInBackground={false}
        playWhenInactive={false}
        // ----------------------
        ignoreSilentSwitch={'ignore'}
        style={styles.hiddenVideo}
      />

      {/* Tampilan UI Player */}
      <Animated.View style={[styles.container, { width: animatedWidth, backgroundColor: `${backgroundColor}cc` }]}>
        {/* Konten yang bisa fade (Tombol & Info) */}
        <Animated.View style={[styles.fadingContent, { opacity: contentOpacity }]}>
          <TouchableOpacity onPress={() => setIsPlaying(false)} style={styles.playButton}>
            <PauseIcon size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.infoSection}>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <Text numberOfLines={1} style={styles.artist}>{artist}</Text>
            <Text style={styles.durationText}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </View>
        </Animated.View>

        {/* Poster Album (selalu terlihat) */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => setIsPlaying(true)}>
            <Animated.View style={[styles.posterContainer, { transform: [{ rotate: spin }] }]}>
                <Image source={{ uri: posterUrl }} style={styles.poster} />
            </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  hiddenVideo: {
    height: 0,
    width: 0,
  },
  container: {
    position: 'absolute',
    bottom: 30,
    right: '5%',
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Konten akan menempel ke kanan
    paddingLeft: 10, // Padding untuk tombol play saat expand
    paddingRight: 5, // Padding untuk poster
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  fadingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden', // Penting agar teks tidak keluar saat mengecil
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  infoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  artist: {
    color: '#D1D1D6',
    fontWeight: '400',
    fontSize: 11,
  },
  durationText: {
    color: '#A0A0A0',
    fontSize: 10,
    marginTop: 2,
  },
  posterContainer: {
    width: 50, // Sedikit lebih besar agar pas di container
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
});

export default MiniMusicPlayer;
