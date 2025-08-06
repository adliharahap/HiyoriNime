import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServerSelector from '../components/ServerSelector';
import DownloadAnimeComponent from '../components/DownloadAnimeComponent';
import RecommendedEpisodes from '../components/RecomendedEpisodes';
import LinearGradient from 'react-native-linear-gradient';
import { fetchEpisode } from '../utils/api/service';
import { autoAdjustColor, darkenColor, getDominantColor } from '../utils/ImageColorModule';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import FastImage from '@d11/react-native-fast-image';
import LoadingScreen from './LoadingScreen';
import { saveWatchHistory } from '../utils/SaveWatchHistory';

const WatchAnimeScreen = ({ route }) => {
  useKeepAwake();
  const [data, setData] = useState([]); // State untuk menyimpan data
  const [loading, setLoading] = useState(true); // State untuk loading
  const [expanded, setExpanded] = useState(false);
  const hasSaved = useRef(false);
  const [colorImage, setColorImage] = useState({
    background: '#1b1b1b',
    text: '#ffffff',
  });
  const [videoUrl, setVideoUrl] = useState(null);
  const [isMp4, setIsMp4] = useState(false);
  const { episodeId } = route.params;
  const navigation = useNavigation();
  const source = useSelector((state) => state.animeSource.source);
  const dataUser = useSelector(state => state.user.userData);

  const FetchAnimeAndColor = async () => {
    try {
      if (!episodeId) {
        throw new Error('❌ animeId tidak boleh kosong!');
      }

      setLoading(true); // Set loading sebelum fetch data

      const detailEpsAnime = await fetchEpisode(episodeId, source);
      setData(detailEpsAnime?.data || {});

      // Simpan URL video & cek apakah MP4
      if (detailEpsAnime?.data?.defaultStreamingUrl) {
        setVideoUrl(detailEpsAnime.data.defaultStreamingUrl);
        setIsMp4(detailEpsAnime.data.defaultStreamingUrl.endsWith('.mp4'));
      }

      // Ambil warna dominan setelah data anime tersedia
      if (detailEpsAnime?.data?.poster) {
        const color = await getDominantColor(detailEpsAnime.data.poster);
        setColorImage(color);
      }
    } catch (error) {
      console.log('❌ Error fetching anime:', error);
    } finally {
      setLoading(false); // Pastikan loading selesai setelah semuanya selesai
    }
  };

  useEffect(() => {
    FetchAnimeAndColor();
  }, []);

  const getPosterFromRecommended = (episodeId, recommendedList, defaultPoster) => {
    console.log('--- 🚀 Memulai Fungsi getPosterFromRecommended ---');
    console.log('Mencari episodeId:', episodeId);
    console.log('Menggunakan poster default:', defaultPoster);

    if (!recommendedList || !Array.isArray(recommendedList)) {
      console.log('⚠️ recommendedList tidak valid. Menggunakan poster default.');
      return defaultPoster;
    }

    // --- Langkah 1: Mencari berdasarkan href (Metode Paling Andal) ---
    console.log('\n[Langkah 1] Mencoba mencocokkan berdasarkan `href`...');
    const byHref = recommendedList.find((item) => {
      if (!item.href) {
        console.log('   - Melewatkan item karena tidak memiliki `href`.');
        return false;
      }
      // Mengambil ID unik dari string href
      const hrefId = item.href.replace('/samehadaku/episode/', '').replace(/\/$/, '');
      console.log(`   - Membandingkan: [${hrefId}] vs [${episodeId}]`);
      return hrefId === episodeId;
    });

    if (byHref) {
      console.log('✅ SUKSES (Langkah 1): Ditemukan kecocokan `href`.');
      console.log('Poster yang ditemukan:', byHref.poster);
      console.log('--------------------------------------------------');
      return byHref.poster;
    } else {
      console.log('❌ GAGAL (Langkah 1): Tidak ada `href` yang cocok.');
    }

    // --- Langkah 2: Mencari berdasarkan episodeId (Sebagai Cadangan) ---
    console.log('\n[Langkah 2] Mencoba mencocokkan berdasarkan `episodeId` (cadangan)...');
    const byEpisodeId = recommendedList.find(
      (item) => item.episodeId === episodeId
    );

    if (byEpisodeId) {
      console.log('✅ SUKSES (Langkah 2): Ditemukan kecocokan `episodeId`.');
      console.log('Poster yang ditemukan:', byEpisodeId.poster);
      console.log('--------------------------------------------------');
      return byEpisodeId.poster;
    } else {
      console.log('❌ GAGAL (Langkah 2): Tidak ada `episodeId` yang cocok.');
    }

    // --- Langkah 3: Fallback ke poster utama ---
    console.log('\n[Langkah 3] Tidak ada kecocokan ditemukan. Menggunakan poster default.');
    console.log('--------------------------------------------------');
    return defaultPoster;
  };


  useEffect(() => {
    const saveHistory = async () => {
      try {

        if (!dataUser?.uid || hasSaved.current) return;

        // Cek apakah semua data tersedia
        if (!data?.title || !data?.poster || !data?.genreList) {
          console.log('Data belum lengkap untuk disimpan ke history');
          return;
        }

        hasSaved.current = true;


        await saveWatchHistory(dataUser?.uid, {
          animeId: episodeId,
          title: data.title,
          poster: getPosterFromRecommended(
            episodeId,
            data.recommendedEpisodeList,
            data.poster
          ),
          genreList: data.genreList,
        });
      } catch (err) {
        console.error('Gagal menyimpan riwayat:', err);
      }
    };

    saveHistory();
  }, [episodeId, data]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: 350,
              width: '100%',
              paddingVertical: 10,
              backgroundColor: '#000',
            }}>
            {videoUrl ? (
              isMp4 ? (
                <Video
                  source={{ uri: videoUrl }}
                  style={{ width: '100%', height: '100%' }}
                  controls={true}
                  resizeMode="contain"
                />
              ) : (
                <WebView
                  source={{ uri: videoUrl }}
                  allowsFullscreenVideo={true}
                  javaScriptEnabled={true}
                  allowsInlineMediaPlayback={true}
                  cacheEnabled={true}
                  userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                  originWhitelist={['*']}
                  mixedContentMode="always"
                  mediaPlaybackRequiresUserAction={false}
                  onError={syntheticEvent => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('WebView error: ', nativeEvent);
                  }}
                  renderError={() => (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{ color: '#fff' }}>❌ Gagal memuat video</Text>
                    </View>
                  )}
                />
              )
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ color: '#fff' }}>
                  ⚠️ Video tidak tersedia atau sedang error
                </Text>
              </View>
            )}
          </View>
          <LinearGradient
            colors={[autoAdjustColor(colorImage.background), '#000000ff']} // kamu bisa ganti warna pertama sesuai keinginan
            style={{ flex: 1 }}
            locations={[0, 0.15]} // 15% gradasi atas, sisanya hitam
          >
            <View
              style={{
                width: '100%',
                paddingVertical: 10,
                flexDirection: 'row',
                overflow: 'hidden',
              }}>
              <FastImage
                style={{
                  height: 100,
                  width: 80,
                  marginRight: 10,
                  marginLeft: 10,
                  borderRadius: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 6,
                  elevation: 5,
                }}
                source={
                  !data?.poster
                    ? require('../assets/Images/404ImageNotFound.png') // Ganti path sesuai struktur kamu yaaa 😎
                    : {
                      uri: data?.poster,
                      priority: FastImage.priority.normal,
                    }
                }
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'NotoSans_SemiCondensed-Bold',
                    fontSize: 20,
                  }}
                  numberOfLines={2}>
                  {data?.title}
                </Text>
                <Text
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                  }}
                  numberOfLines={1}>
                  {data?.releasedOn}
                </Text>
                <View style={{ marginTop: 5 }}>
                  <FlatList
                    data={data?.genreList}
                    horizontal
                    keyExtractor={item => item.genreId}
                    scrollEventThrottle={60}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('ListAnimeGenre', {
                            genreId: item.genreId,
                            title: item.title,
                          })
                        }
                        style={{
                          backgroundColor: '#1E293B',
                          paddingVertical: 4,
                          paddingHorizontal: 10,
                          borderRadius: 8,
                          marginRight: 10,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontFamily: 'Poppins-Medium',
                            fontSize: 12,
                          }}
                          numberOfLines={1}>
                          {item.title}
                        </Text>
                      </Pressable>
                    )}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                paddingHorizontal: 10,
                gap: 10,
                paddingVertical: 10,
              }}>
              <Pressable
                disabled={!data?.hasPrevEpisode}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: data?.hasPrevEpisode ? autoAdjustColor(colorImage.background) : '#64748B',
                  opacity: data?.hasPrevEpisode ? 1 : 0.5,
                  borderRadius: 8,
                }}
                onPress={() => {
                  if (data?.hasPrevEpisode && data?.prevEpisode) {
                    navigation.replace('WatchAnime', {
                      episodeId: data.prevEpisode.episodeId,
                    });
                  }
                }}>
                <Text
                  style={{
                    color: colorImage.text,
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 15,
                  }}
                  numberOfLines={1}>
                  Prev Episode
                </Text>
              </Pressable>
              <Pressable
                disabled={!data?.hasNextEpisode}
                onPress={() => {
                  if (data?.hasNextEpisode) {
                    navigation.replace('WatchAnime', {
                      episodeId: data.nextEpisode.episodeId,
                    });
                  }
                }}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: data?.hasNextEpisode ? autoAdjustColor(colorImage.background) : '#64748B',
                  opacity: data?.hasNextEpisode ? 1 : 0.5,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    color: colorImage.text,
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 15,
                  }}
                  numberOfLines={1}>
                  Next Episode
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingBottom: 20,
              }}>
              <ServerSelector
                serverData={data?.server}
                setVideoUrl={setVideoUrl}
              />
            </View>
            <RecommendedEpisodes episodes={data?.recommendedEpisodeList} />
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 16,
                borderRadius: 12,
              }}
            >
              {/* Judul */}
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 22,
                  fontWeight: '700',
                  fontFamily: 'OpenSans_SemiCondensed-Bold',
                  marginBottom: 12,
                }}
              >
                Ringkasan
              </Text>

              {/* Isi Ringkasan */}
              <Text
                style={{
                  color: '#CCCCCC',
                  fontSize: 15,
                  lineHeight: 28,
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'justify',
                }}
              >
                {data?.synopsis?.paragraphs?.join('\n\n')}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingBottom: 20,
                paddingTop: 20,
              }}>
              <DownloadAnimeComponent animeData={data?.downloadUrl} colorImage={colorImage} />
            </View>
          </LinearGradient>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: 300,
  },

  moreText: {
    color: '#00a2ff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'OpenSans_Condensed-SemiBold',
  },
});

export default WatchAnimeScreen;
