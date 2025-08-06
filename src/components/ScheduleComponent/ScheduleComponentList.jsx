// ScheduleComponentList.jsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = screenWidth / 2 - 20; // Ubah jadi 2 kolom

const ListAnimeScheduleBackground = ({ title, genre, rating, estimation, type, ImgBackground, href }) => {
  const navigation = useNavigation();
  const animeId = href.replace('/samehadaku/anime/', '');
  const fallbackImg = require('../../assets/Images/404ImageNotFound.png');

  const formattedGenre = Array.isArray(genre) ? genre.join(', ') : genre || 'Unknown Genre';
  const isUp = estimation === 'Update';
  const estimationText = isUp ? 'Up' : estimation;

  const [imageError, setImageError] = React.useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('DetailAnime', { animeId, animeTitle: title })}
      style={styles.card}
    >
      <View style={{ position: 'relative' }}>
        <FastImage
          source={imageError ? fallbackImg : { uri: ImgBackground }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
          onError={() => setImageError(true)}
        />

        {/* Badge UP */}
        {isUp && (
          <Text style={styles.upBadge}>UP</Text>
        )}

        {/* Badge rating */}
        <Text style={styles.rating}>⭐ {rating || 'N/A'}</Text>

        {/* Gradient Info Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,8)']}
          style={styles.overlay}
        >
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.genres} numberOfLines={1}>{formattedGenre}</Text>
          <Text style={styles.typeText} numberOfLines={1}>{type} | {estimationText}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};


const ScheduleComponentList = ({ headerTitle, animeList }) => {
  return (
    <View style={{ width: '100%', marginBottom: 30 }}>
      {headerTitle && (
        <View style={styles.header}>
          <Text style={styles.headerText}>{headerTitle}</Text>
        </View>
      )}
      <FlatList
        data={animeList}
        keyExtractor={item => item.animeId}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <ListAnimeScheduleBackground
            title={item.title}
            genre={item.genres}
            rating={item.score}
            estimation={item.estimation}
            type={item.type}
            ImgBackground={item.poster}
            href={item.href}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    paddingBottom: 5
  },
  headerText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },
  gridContainer: {
    paddingHorizontal: 10,
    gap: 10,
  },
  card: {
    width: ITEM_WIDTH,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  image: {
    width: '100%',
    height: ITEM_WIDTH * 1.4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rating: {
    position: 'absolute',
    top: 6,
    right: 6,
    fontSize: 11,
    backgroundColor: 'rgba(216, 189, 78, 0.9)',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 50,
    fontFamily: 'Poppins-SemiBold',
  },
  upBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 11,
    backgroundColor: 'rgba(229, 57, 53, 0.9)',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 1,
    borderBottomRightRadius: 10,
    fontFamily: 'Poppins-Bold',
  },
  infoContainer: {
    padding: 6,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  genres: {
    color: '#cdcdcd',
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
  },
  typeText: {
    color: '#cdcdcd',
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
});

export default ScheduleComponentList;
