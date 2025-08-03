import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  VirtualizedList,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BlurView} from '@react-native-community/blur';
import BackIcon from '../assets/Icons/BackIcon';
import StarIcon from '../assets/Icons/StarIcon';
import WaveDetailAnimeIcon from '../assets/Icons/WaveDetailAnimeIcon';
import EpisodeCard from '../components/EpisodeCard';
import {darkenColor, getDominantColor} from '../utils/ImageColorModule';
import LinearGradient from 'react-native-linear-gradient';
import SortirIcon from '../assets/Icons/SortirIcon';
import {fetchAnimeDetail} from '../utils/api/service';
import {useNavigation} from '@react-navigation/native';
import BatchDownloadSection from '../components/BatchDownloadSection';
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  collection
} from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';
import { useSelector } from 'react-redux';


const DetailAnimeScreen = ({route}) => {
  const ScreenHeight = Dimensions.get('screen').height;
  const [showMore, setShowMore] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [colorImage, setColorImage] = useState('#1b1b1b');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAscending, setIsAscending] = useState(true);
  const [detailAnime, setDetailAnime] = useState([]);
  const navigation = useNavigation();
  const {animeId, animeTitle} = route.params;
  const source = useSelector((state) => state.animeSource.source);

  const FetchAnimeAndColor = async () => {
    try {
      if (!animeId) {
        throw new Error('❌ animeId tidak boleh kosong!');
      }

      setIsLoading(true); // Set loading sebelum fetch data

      const detailAnime = await fetchAnimeDetail(animeId, source);
      setDetailAnime(detailAnime?.data || []);
      console.log("data anime detail : ", detailAnime.data);
      

      // Cek apakah anime sudah ada di favorit
      // ✅ Cek favorit dari Firestore
      if (auth.currentUser) {
        const favRef = doc(db, "users", auth.currentUser.uid, "favorites", animeId);
        const favSnap = await getDoc(favRef);
        setIsFavorite(favSnap.exists());
      }
            

      // Ambil warna dominan setelah data anime tersedia
      if (detailAnime?.data?.poster) {
        const color = await getDominantColor(detailAnime.data.poster);
        setColorImage(color);
      }
    } catch (error) {
      console.error('❌ Error fetching anime:', error);
    } finally {
      setIsLoading(false); // Pastikan loading selesai setelah semuanya selesai
    }
  };

  useEffect(() => {
    FetchAnimeAndColor();
  }, []);

  const toggleSort = () => {
    setIsAscending(prev => !prev);
  };

  const sortedEpisodes = [...(detailAnime?.episodeList || [])].sort((a, b) =>
    isAscending ? a.title - b.title : b.title - a.title,
  );

const toggleFavorite = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn("🛑 User belum login!");
      return;
    }

    const userId = user.uid;
    const favRef = doc(db, "users", userId, "favorites", animeId);

    if (isFavorite) {
      // ❌ Hapus dari Firestore
      await deleteDoc(favRef);
      console.log("🗑️ Anime dihapus dari favorit");
    } else {
      // ✅ Tambahkan ke Firestore
      const newFavorite = {
        animeId,
        title: detailAnime?.title?.trim() ? detailAnime.title : animeTitle,
        score: detailAnime.score?.value || "",
        poster: detailAnime.poster,
        genres: detailAnime.genreList.map((genre) => genre.title),
      };
      await setDoc(favRef, newFavorite);
      console.log("✅ Anime ditambahkan ke favorit");
    }

    setIsFavorite(!isFavorite);
  } catch (error) {
    console.error("❌ Error handling favorite:", error);
  }
};


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#FFD700" />
          </View>
      ) : (
        <ImageBackground
          style={styles.imageBackground}
          source={{uri: detailAnime?.poster}}>
          <BlurView style={styles.blur} blurType="dark" blurAmount={8} />

          <ScrollView
            style={{flex: 1, minHeight: ScreenHeight}}
            showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <BackIcon size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
                <StarIcon size={16} />
                <Text style={styles.favoriteText}>
                  {isFavorite ? 'Remove From Favorite' : 'Add To Favorite'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Poster & Anime Info */}
            <View style={styles.centered}>
              <Image
                source={{uri: detailAnime?.poster}}
                style={styles.poster}
              />
            </View>

            {/* Wave & Title */}
            <View style={styles.waveContainer}>
              <WaveDetailAnimeIcon
                width={'100%'}
                height={150}
                color={colorImage}
              />
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={2}>{detailAnime?.title?.trim() ? detailAnime.title : animeTitle}</Text>
                <Text style={styles.subTitle} numberOfLines={1}>
                  {detailAnime?.studios} | {detailAnime?.season} |{' '}
                  {detailAnime?.duration}
                </Text>
                <View style={styles.genreTags}>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,1)',
                      fontSize: 12,
                      backgroundColor: '#0FD312',
                      paddingVertical: 3,
                      fontFamily: 'NotoSans_SemiCondensed-Bold',
                      textAlign: 'center',
                      borderRadius: 30,
                      paddingHorizontal: 20,
                      marginRight: 10,
                    }}
                    numberOfLines={1}>
                    {detailAnime?.type}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,1)',
                      fontSize: 12,
                      backgroundColor:
                        detailAnime?.status === 'Completed'
                          ? '#00a2ff'
                          : detailAnime?.status === 'Ongoing'
                          ? '#ff6d1e'
                          : 'gray',
                      paddingVertical: 3,
                      fontFamily: 'NotoSans_SemiCondensed-Bold',
                      textAlign: 'center',
                      borderRadius: 30,
                      paddingHorizontal: 20,
                      marginRight: 10,
                    }}
                    numberOfLines={1}>
                    {detailAnime?.status}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,1)',
                      fontSize: 12,
                      backgroundColor: 'rgba(228,255,0,0.7)',
                      paddingVertical: 3,
                      fontFamily: 'NotoSans_SemiCondensed-Bold',
                      textAlign: 'center',
                      borderRadius: 30,
                      paddingHorizontal: 20,
                    }}
                    numberOfLines={1}>
                    ⭐ {detailAnime?.score?.value}
                  </Text>
                </View>
              </View>
            </View>

            {/* Anime Detail Section */}
            <LinearGradient
              colors={[colorImage, darkenColor(colorImage)]}
              locations={[0.2, 1]}
              style={styles.detailContainer}>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Title:</Text> {detailAnime?.title?.trim() ? detailAnime.title : animeTitle}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Status:</Text> {detailAnime?.status}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Episodes:</Text>{' '}
                {detailAnime?.episodes}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Source:</Text> {detailAnime?.source}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Duration:</Text>{' '}
                {detailAnime?.duration}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Genres:</Text>{' '}
                {detailAnime?.genreList?.map(genre => genre.title).join(', ')}
              </Text>

              {/* Expandable Detail */}
              {showMore && (
                <View>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Type:</Text> {detailAnime?.type}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Aired:</Text> {detailAnime?.aired}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Season:</Text>{' '}
                    {detailAnime?.season}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Producer:</Text>{' '}
                    {detailAnime?.producers || '-'}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Studios:</Text>{' '}
                    {detailAnime?.studios}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Score:</Text>{' '}
                    {detailAnime?.score?.value}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Users:</Text>{' '}
                    {detailAnime?.score.users}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>English:</Text>{' '}
                    {detailAnime?.english}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Japanese:</Text>{' '}
                    {detailAnime?.japanese}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Synonyms:</Text>{' '}
                    {detailAnime?.synonyms}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                onPress={() => setShowMore(!showMore)}
                style={styles.moreButton}>
                <Text style={styles.moreText}>
                  {showMore ? 'Show Less' : 'Show More'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 20,
                backgroundColor: darkenColor(colorImage),
              }}>
              {detailAnime?.synopsis?.paragraphs?.length > 0 && (
                <View
                  style={{
                    width: '100%',
                  }}>
                  {/* Title */}
                  <Text
                    style={{
                      color: '#Fdfdfd',
                      fontSize: 20,
                      fontWeight: 'bold',
                      fontFamily: 'OpenSans_SemiCondensed-Medium',
                      marginBottom: 10,
                    }}>
                    Ringkasan
                  </Text>

                  {/* Content */}
                  <View>
                    <Text
                      style={{
                        color: '#EAEAEA',
                        fontSize: 15,
                        lineHeight: 26,
                        fontFamily: 'OpenSans_SemiCondensed-Medium',
                        textAlign: 'justify',
                      }}>
                      {expanded
                        ? detailAnime?.synopsis?.paragraphs.join('\n\n')
                        : detailAnime?.synopsis?.paragraphs[0].slice(0, 200) +
                          '...'}
                    </Text>
                    <TouchableOpacity
                      style={{paddingBottom: 20}}
                      onPress={() => setExpanded(!expanded)}>
                      <Text style={styles.moreText}>
                        {expanded ? 'Show Less' : 'Show More'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            {detailAnime?.batchList?.length > 0 && (
              <View
              style={{
                width: '100%',
                paddingHorizontal: 20,
                backgroundColor: darkenColor(colorImage),
              }}>
                <BatchDownloadSection batchList={detailAnime.batchList} colorImage={colorImage} />
              </View>
            )}
            <View
              style={{
                width: '100%',
                paddingHorizontal: 20,
                backgroundColor: darkenColor(colorImage),
                paddingBottom: 80,
              }}>
              {/* Header Episode */}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: 20,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: '#Fdfdfd',
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontFamily: 'OpenSans_SemiCondensed-Medium',
                    marginBottom: 10,
                  }}>
                  Episode ({detailAnime?.episodes})
                </Text>
                <TouchableOpacity onPress={toggleSort}>
                  <SortirIcon size={26} color="#fdfdfd" />
                </TouchableOpacity>
              </View>
              <VirtualizedList
                data={sortedEpisodes}
                nestedScrollEnabled={true}
                scrollEnabled={false}
                initialNumToRender={10} // Render awal cuma 10 item biar gak lag
                renderItem={({item}) => (
                  <EpisodeCard
                    episodeNumber={item.title}
                    onPress={() => navigation.navigate('WatchAnime', { episodeId: item.episodeId })}
                  />
                )}
                keyExtractor={item => item.episodeId}
                getItemCount={data => data.length}
                getItem={(data, index) => data[index]}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
};

export default DetailAnimeScreen;

const styles = StyleSheet.create({
  imageBackground: {
    height: '80%',
    width: '100%',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1C16',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 30,
  },
  favoriteText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    paddingLeft: 5,
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },
  centered: {
    alignItems: 'center',
    paddingTop: 20,
  },
  poster: {
    height: 270,
    width: 180,
    borderRadius: 10,
  },
  waveContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
  },
  titleContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },
  subTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'OpenSans_Condensed-SemiBold',
  },
  genreTags: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  detailContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#28002C',
  },
  detailText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'OpenSans_SemiCondensed-Medium',
  },
  bold: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },
  moreButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  moreText: {
    color: '#00a2ff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'OpenSans_Condensed-SemiBold',
  },
});
