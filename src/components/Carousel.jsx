import { useNavigation } from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
  PanResponder,
} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const Carousel = ({children, scroll = false}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          // Swipe right (go to previous page)
          goToPrevPage();
        } else if (gestureState.dx < -50) {
          // Swipe left (go to next page)
          goToNextPage();
        }
      },
    }),
  ).current;

  const pages = React.Children.toArray(children);
  const totalPages = pages.length;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      const nextPage = currentPage + 1;
      scrollViewRef.current.scrollTo({
        x: nextPage * screenWidth,
        animated: true,
      });
      setCurrentPage(nextPage);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      scrollViewRef.current.scrollTo({
        x: prevPage * screenWidth,
        animated: true,
      });
      setCurrentPage(prevPage);
    }
  };

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  const handleScrollEnd = e => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentPage(pageNum);
  };

  const onboardingContent = [
    {
      title: 'Welcome To HiyoriNime',
      subtitle: [
        'Hai! Senang bertemu denganmu di HiyoriNime.',
        'Yuk, mulai jelajahi cerita favoritmu sekarang!',
      ],
    },
    {
      title: 'Tandai Anime Favoritmu',
      subtitle: [
        'Udah nemu anime yang asik? Tandai aja!',
        'Biar gampang kalau mau nonton lagi nanti.',
      ],
    },
    {
      title: 'Update Setiap Hari',
      subtitle: [
        'Nggak ada lagi kata "ketinggalan episode"!',
        'Anime ongoing selalu update otomatis!',
      ],
    },
    {
      title: 'Unduh Anime Favoritmu!',
      subtitle: [
        'Download sepuasnya, tonton di mana aja.',
        'Kualitas video Full HD, jernih maksimal!',
      ],
    },
  ];
  const currentContent = onboardingContent[currentPage];

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 100,
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 22,
            color: '#000',
            fontFamily: 'NotoSans_Condensed-Medium',
            paddingHorizontal: 20,
            letterSpacing: 0.8,
          }}>
          HiyoriNime<Text style={{color: '#f33421'}}>.</Text>
        </Text>
      </View>
      {/* Carousel Content */}
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEnabled={scroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        {...panResponder.panHandlers}>
        {pages.map((page, index) => (
          <View key={index} style={styles.page}>
            {page}
          </View>
        ))}
      </Animated.ScrollView>

      {/* Navigation Controls */}
      <View style={styles.controls}>
        <View
          style={{
            position: 'absolute',
            top: -170,
            left: 0,
            right: 0,
            height: 170,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#fff',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 20,
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: 36,
              color: '#333',
            }}>
            {currentContent.title}
          </Text>

          <View style={{paddingTop: 20}}>
            {currentContent.subtitle.map((line, index) => (
              <Text key={index} style={styles.subText}>
                {line}
              </Text>
            ))}
          </View>
          <View style={styles.pageIndicatorContainer}>
            {[...Array(totalPages)].map((_, index) => (
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
        {currentPage === 0 ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 40,
                  paddingVertical: 12,
                  backgroundColor: '#f33421',
                  borderRadius: 100,
                }}
                onPress={goToNextPage}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: 'rgb(255, 255, 255)',
                    fontFamily: 'OpenSans_SemiCondensed-Bold',
                    letterSpacing: 1,
                  }}>
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : currentPage === 3 ? (
          <>
          <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 40,
                  paddingVertical: 12,
                  backgroundColor: '#f33421',
                  borderRadius: 100,
                }}
                onPress={() => navigation.replace("LoginScreen")}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: 'rgb(255, 255, 255)',
                    fontFamily: 'OpenSans_SemiCondensed-Bold',
                    letterSpacing: 1,
                  }}>
                  Selesai & Masuk
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={goToPrevPage}>
                <Text style={[styles.controlText]}>Prev</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  backgroundColor: '#f33421',
                  borderRadius: 100,
                }}
                onPress={goToNextPage}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: 'rgb(255, 255, 255)',
                    fontFamily: 'OpenSans_SemiCondensed-Bold',
                    letterSpacing: 1,
                  }}>
                  Selanjutnya
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  controlButton: {
    padding: 10,
  },
  controlText: {
    fontSize: 16,
    color: '#007AFF',
  },
  disabled: {
    color: '#ccc',
  },
  pageIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  text: {
    fontSize: 30,
    color: '#000',
    fontFamily: 'NotoSans_SemiCondensed-Bold',
    paddingHorizontal: 20,
  },

  subText: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: 'rgba(151, 151, 151, 0.8)',
    fontFamily: 'NotoSans_ExtraCondensed-Regular',
  },

  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  dot: {
    width: 20,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#6C63FF', // warna ungu aktif
  },
  inactiveDot: {
    backgroundColor: '#ccc', // warna dot nonaktif
  },
});
export default Carousel;
