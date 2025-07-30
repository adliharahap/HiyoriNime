import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from '@d11/react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const {width: screenWidth} = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.9;
const ITEM_SPACING = (screenWidth - ITEM_WIDTH) / 2;

const HomeCarousel = ({data, scroll = true}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (currentPage + 1) % data.length;
      scrollViewRef.current?.scrollToOffset({
        offset: nextPage * ITEM_WIDTH,
        animated: true,
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={scrollViewRef}
        data={data}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{paddingHorizontal: ITEM_SPACING}}
        scrollEnabled={scroll}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-10, 0, 10],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate('DetailAnime', {
                  animeId: item.animeId,
                  animeTitle: item.title,
                })
              }>
              <Animated.View
                style={[
                  styles.slide,
                  {
                    transform: [{scale}, {translateX}],
                  },
                ]}>
                <FastImage
                  source={{uri: item.poster}}
                  style={styles.image}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.Bottomgradient}
                />

                <View style={styles.newLabel}>
                  <Text style={styles.newLabelText}>New</Text>
                </View>
                <View style={styles.newLabel2}>
                  <Text style={styles.newLabelText2}>Eps. {item.episodes}</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
        onMomentumScrollEnd={event => {
          const pageIndex = Math.round(
            event.nativeEvent.contentOffset.x / ITEM_WIDTH,
          );
          setCurrentPage(pageIndex);
        }}
      />

      {/* TEXT INFO DI LUAR GAMBAR */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={1}>
            {data[currentPage]?.title}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.time}>{data[currentPage]?.releasedOn}</Text>
        </View>
      </View>

      {/* Titik indikator */}
      <View style={styles.indicatorContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: (screenWidth * 9) / 16,
    justifyContent: 'center',
    position: 'relative',
  },
  slide: {
    width: ITEM_WIDTH,
    height: (ITEM_WIDTH * 9) / 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#111',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  newLabel: {
    backgroundColor: 'rgba(229, 57, 53, 0.9)',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 15,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
  },
  newLabelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },

  newLabel2: {
    backgroundColor: 'rgba(216, 189, 78, 0.7)',
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 15,
  },
  newLabelText2: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },

  infoContainer: {
    bottom: 40,
    left: 16,
    width: (ITEM_WIDTH * 9) / 9,
    paddingHorizontal: 20,
    position: 'absolute',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },

  episode: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Roboto-Regular',
  },
  time: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Roboto-Regular',
  },

  Bottomgradient: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: '100%',
  },
  indicatorContainer: {
    bottom: 40,
    left: 20,
    width: (ITEM_WIDTH * 9) / 9,
    paddingHorizontal: 20,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  inactiveDot: {
    backgroundColor: '#888',
  },
});

export default HomeCarousel;
