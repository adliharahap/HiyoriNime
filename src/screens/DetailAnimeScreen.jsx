import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import StarIcon from '../assets/Icons/StarIcon';
import EpisodeCard from '../components/DetailAnimeComponent/EpisodeCard';
import { autoAdjustColor, getDominantColor } from '../utils/ImageColorModule';
import LinearGradient from 'react-native-linear-gradient';
import SortirIcon from '../assets/Icons/SortirIcon';
import { fetchAnimeDetail, fetchEpisode } from '../utils/api/service';
import { useNavigation } from '@react-navigation/native';
import BatchDownloadSection from '../components/BatchDownloadSection';
import { doc, setDoc, deleteDoc, getDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';
import { useSelector } from 'react-redux';
import HeaderDetailComponent from '../components/DetailAnimeComponent/HeaderDetailComponent';
import FlagStatusIcon from '../assets/Icons/DetailAnimeIcon/FlagStatusIcon';
import TvIcon from '../assets/Icons/DetailAnimeIcon/TvIcon';
import PlayIcon from '../assets/Icons/DetailAnimeIcon/PlayIcon';
import FastImage from '@d11/react-native-fast-image';
import EpisodeCardWithPoster from '../components/DetailAnimeComponent/EpisodeCardWithPoster';
import AnimeDetailCard from '../components/DetailAnimeComponent/AnimeDetailCard';
import LoadingScreen from './LoadingScreen';
import MiniMusicPlayer from '../components/DetailAnimeComponent/MiniMusicPlayer';
import { getAnimeSongById, listAnimeSongs } from '../utils/getAnimeSongById';

const DetailAnimeScreen = ({ route }) => {
  const [colorImage, setColorImage] = useState({
    background: '#1b1b1b',
    text: '#ffffff',
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true); //buat true lagi kalau design nya sudah selesai
  const [isAscending, setIsAscending] = useState(true);
  const [detailAnime, setDetailAnime] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [episodeOne, setEpisodeOne] = useState(null);
  const [animeMusic, setAnimeMusic] = useState(null);
  const [EpsAnimeWithPoster, setEpsAnimeWithPoster] = useState([]);
  const [changeEpsPoster, setChangeEpsPoster] = useState(true);
  const navigation = useNavigation();
  const { animeId, animeTitle } = route.params;
  const source = useSelector((state) => state.animeSource.source);

  const tabTitles = ['Episode', 'Details', 'Synopsis'];
  const [activeTab, setActiveTab] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const newIndex = Math.round(value / Dimensions.get('window').width);
      if (newIndex !== activeTab) setActiveTab(newIndex);
    });
    return () => {
      scrollX.removeListener(listener);
    };
  }, [activeTab]);

  const FetchAnimeAndColor = async () => {
    try {
      if (!animeId) throw new Error('❌ animeId tidak boleh kosong!');

      setIsLoading(true); // Mulai loading

      const detailAnimeRes = await fetchAnimeDetail(animeId, source);
      const animeData = detailAnimeRes?.data || {};

      setDetailAnime(animeData);

      const episode = animeData?.episodeList?.find(ep => ep.title === 1);
      setEpisodeOne(episode);

      console.log("✅ Data anime eps 1 : ", episode);

      // Cek favorit dari Firestore
      if (auth.currentUser) {
        const favRef = doc(db, "users", auth.currentUser.uid, "favorites", animeId);
        const favSnap = await getDoc(favRef);
        setIsFavorite(favSnap.exists());
      }

      // Ambil warna dominan dari poster
      if (animeData?.poster) {
        const color = await getDominantColor(animeData.poster);
        setColorImage(color);
      }
    } catch (error) {
      console.error('❌ Error fetching anime:', error);
    }
  };

  // Fetch data episode yang ada posternya
  const getEpsPoster = async () => {
    try {
      if (!episodeOne) return;

      const epsWithPosterRes = await fetchEpisode(episodeOne?.episodeId, source);
      setEpsAnimeWithPoster(epsWithPosterRes?.data || []);
      console.log("✅ Data eps with poster : ", epsWithPosterRes?.data);
    } catch (error) {
      console.error("❌ Error fetching eps with poster:", error);
    } finally {
      // 🎯 Baru di sini kita set loading ke false, setelah data eps terisi
      setIsLoading(false);
    }
  };

  // Auto fetch detail anime saat komponen mount
  useEffect(() => {
    FetchAnimeAndColor();
  }, []);

  // Kalau episodeOne berubah dan sudah dapat, fetch data episode with poster
  useEffect(() => {
    if (episodeOne) {
      getEpsPoster(); // setIsLoading(false) ada di akhir fungsi ini
    }
  }, [episodeOne]);

  useEffect(() => {
  listAnimeSongs();
}, []);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        console.log("anime id : ", animeId);
        
        const result = await getAnimeSongById(animeId);
        console.log("data music : ", result);
        

        if (result.success && result.data) {
          setAnimeMusic(result.data);
        } else {
          console.log("🎵 Tidak ada lagu untuk anime ini!");
          setAnimeMusic(null); // Kosongin biar ga muncul player kalau datanya null
        }
      } catch (error) {
        console.error("🔥 Gagal ambil lagu anime:", error);
      }
    };

    fetchMusic();
  }, [animeId]);


  const toggleSort = () => {
    setIsAscending(prev => !prev);
  };

  const sortedEpisodes = [...(detailAnime?.episodeList || [])].sort((a, b) =>
    isAscending ? a.title - b.title : b.title - a.title,
  );

  const sortedEpisodesWithPoster = [...(EpsAnimeWithPoster?.recommendedEpisodeList || [])].sort((a, b) => {
    const getEpisodeNumber = (title) => {
      const match = title.match(/Episode\s+(\d+)/i);
      return match ? parseInt(match[1], 10) : 0;
    };

    const epA = getEpisodeNumber(a.title);
    const epB = getEpisodeNumber(b.title);

    return isAscending ? epA - epB : epB - epA;
  });

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={[]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          ListHeaderComponent={() => (
            <>
              <ImageBackground
                style={{ width: '100%', height: 330, position: 'relative' }}
                source={
                  detailAnime?.poster
                    ? { uri: detailAnime.poster }
                    : require('../assets/Images/404ImageNotFound.png')
                }
                resizeMode="cover">
                <BlurView style={[styles.blur, { opacity: 0.7 }]} blurType="dark" blurAmount={10} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,1)']} style={styles.gradientBottom} />
                <HeaderDetailComponent toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, position: 'absolute', bottom: 10, left: 0, right: 0 }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ position: 'relative', width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}>
                      <FastImage
                        source={imageError || !detailAnime?.poster ? require('../assets/Images/404ImageNotFound.png') : { uri: detailAnime.poster }}
                        style={{ width: 150, height: 200, borderRadius: 10 }}
                        resizeMode={FastImage.resizeMode.cover}
                        onError={() => setImageError(true)}
                      />
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, position: 'absolute', top: -6, left: 4, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: 100, paddingRight: 5 }}>
                          <View style={{ paddingBottom: 3 }}><StarIcon color="#f0d508ff" size={12} /></View>
                          <Text style={{ fontFamily: 'Poppins-Medium', color: 'rgba(255,255,255,0.8)', fontSize: 12, paddingLeft: 3 }} numberOfLines={1} ellipsizeMode="tail">{detailAnime?.score?.value || 'N/A'}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 22, fontFamily: 'Poppins-Bold' }} numberOfLines={3} ellipsizeMode="tail">{detailAnime?.title?.trim() ? detailAnime.title : animeTitle}</Text>
                    <Text style={{ fontFamily: 'Poppins-Medium', color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 5 }} numberOfLines={1}>{detailAnime?.japanese || detailAnime?.studios || detailAnime?.producers || detailAnime?.aired || 'Unknown'}</Text>
                    <Text style={{ fontFamily: 'Poppins-Medium', color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 10 }} numberOfLines={1}>{detailAnime?.duration || 'Unknown'} • {detailAnime?.season || 'Unknown'}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: 100, paddingRight: 5 }}>
                        <TvIcon color="#37F008" size={18} />
                        <Text style={{ fontFamily: 'Poppins-Medium', color: 'rgba(255,255,255,0.8)', fontSize: 14, paddingLeft: 5 }} numberOfLines={1} ellipsizeMode="tail">{detailAnime?.type || 'Unknown'}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, maxWidth: 100 }}>
                        <FlagStatusIcon color="rgba(255, 225, 0, 1)" size={20} />
                        <Text style={{ fontFamily: 'Poppins-Medium', color: 'rgba(255,255,255,0.8)', fontSize: 14, paddingLeft: 5 }} numberOfLines={1} ellipsizeMode="tail">{detailAnime?.status || 'Unknown'}</Text>
                      </View>
                    </View>
                    <Text style={{ fontFamily: 'Poppins-Medium', color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 10 }} numberOfLines={2}>Genre : {detailAnime?.genreList?.map(genre => genre.title).join(', ') || detailAnime?.synopsis?.paragraphs.join('\n\n') || 'Unknown'}</Text>
                  </View>
                </View>
              </ImageBackground>

              <View style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#000' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('WatchAnime', { episodeId: episodeOne?.episodeId })}
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: autoAdjustColor(colorImage.background), paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10, width: '100%', marginBottom: 12, borderWidth: 0.5 }}>
                  <PlayIcon color={colorImage.text} size={20} />
                  <Text style={{ marginLeft: 10, color: colorImage.text, fontFamily: 'Poppins-Bold', fontSize: 14 }}>Play Eps 1</Text>
                </TouchableOpacity>
                <BatchDownloadSection batchList={detailAnime?.batchList} colorImage={colorImage.background} />
              </View>

              {/* Tab Header */}
              <View style={{ flexDirection: 'row', backgroundColor: '#000' }}>
                {tabTitles.map((title, index) => {
                  const isActive = index === activeTab;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setActiveTab(index)}
                      style={{ flex: 1, paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: isActive ? autoAdjustColor(colorImage.background) : 'transparent' }}>
                      <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14, color: isActive ? '#fff' : '#888' }}>{title}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Tab Content */}
              {activeTab === 1 && (
                <View style={{ padding: 16 }}>
                  <AnimeDetailCard detailAnime={detailAnime} animeTitle={animeTitle} />
                </View>
              )}
              {activeTab === 2 && (
                <View style={{ padding: 16 }}>
                  <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Sinopsis</Text>
                  {detailAnime?.synopsis?.paragraphs?.length > 0 ? (
                    detailAnime.synopsis.paragraphs.map((para, i) => (
                      <Text key={i} style={{ color: '#ccc', marginTop: 8, lineHeight: 20, fontFamily: 'Poppins-Medium', textAlign: 'justify' }}>{para}</Text>
                    ))
                  ) : (
                    <Text style={{ color: '#888', marginTop: 10 }}>Sinopsis belum tersedia</Text>
                  )}
                </View>
              )}
            </>
          )}
          ListFooterComponent={() => (
            activeTab === 0 && (
              <>
                <View style={{ paddingHorizontal: 15, paddingTop: 5, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>
                    Daftar Episode ({detailAnime?.episodeList?.length || ''})
                  </Text>
                  <TouchableOpacity
                    onPress={() => setChangeEpsPoster(!changeEpsPoster)}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
                    <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>{changeEpsPoster ? "Missing Eps?" : "Return"}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={toggleSort}
                    style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 }}>
                    <Text style={{ marginRight: 8, color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Sortir Eps</Text>
                    <SortirIcon size={20} color={'#fff'} />
                  </TouchableOpacity>
                </View>
                {(changeEpsPoster && EpsAnimeWithPoster?.recommendedEpisodeList?.length > 0 && detailAnime?.episodeList?.length <= 50 ? (
                  <FlatList
                    data={sortedEpisodesWithPoster}
                    keyExtractor={(item, index) => `${item.title}-${index}`}
                    renderItem={({ item }) => (
                      <EpisodeCardWithPoster
                        poster={item.poster}
                        title={item.title}
                        releaseDate={item.releaseDate}
                        onPress={() => {
                          const parts = item.href.split('/');
                          const episodeId = parts[parts.length - 1];
                          navigation.navigate('WatchAnime', { episodeId });
                        }}
                      />
                    )}
                  />
                ) : (
                  <>
                    {detailAnime?.episodeList?.length >= 200 ? (
                      <>
                        <FlatList
                          data={sortedEpisodes}
                          keyExtractor={(item, index) => `${item.episodeId}-${index}`}
                          numColumns={6} // ⬅️ Ini bikin grid 3 kolom
                          removeClippedSubviews={true} // Buat optimalisasi performance
                          initialNumToRender={30}
                          maxToRenderPerBatch={30}
                          windowSize={10}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={{
                                flex: 1,
                                margin: 5,
                                height: 40,
                                backgroundColor: '#222',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onPress={() => navigation.navigate('WatchAnime', { episodeId: item.episodeId})}
                            >
                              <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Poppins-Medium' }}>{item.title}</Text>
                            </TouchableOpacity>
                          )}
                          contentContainerStyle={{ padding: 10 }}
                        />
                      </>
                    ) : (
                      <FlatList
                        data={sortedEpisodes}
                        keyExtractor={(item, index) => `${item.episodeId}-${index}`}
                        renderItem={({ item }) => (
                          <EpisodeCard
                            episodeNumber={item.title}
                            onPress={() => navigation.navigate('WatchAnime', { episodeId: item.episodeId })}
                          />
                        )}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                        removeClippedSubviews={true}
                      />
                    )}
                  </>
                ))}
              </>
            )
          )}
        />
      )}
      {animeMusic && !isLoading && (
        <MiniMusicPlayer
          posterUrl={animeMusic.posterUrl}
          title={animeMusic.title}
          artist={animeMusic.artist}
          mp3Url={animeMusic.mp3Url}
          backgroundColor = {autoAdjustColor(colorImage.background)}
        />
      )}
    </SafeAreaView>
  );
};

export default DetailAnimeScreen;

const styles = StyleSheet.create({
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 330 * 0.3, // 30% dari tinggi ImageBackground
  },
});
