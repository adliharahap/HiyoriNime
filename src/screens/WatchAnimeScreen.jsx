import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
  FlatList,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Video from 'react-native-video';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import {SafeAreaView} from 'react-native-safe-area-context';
import ServerSelector from '../components/ServerSelector';
import DownloadAnimeComponent from '../components/DownloadAnimeComponent';
import RecommendedEpisodes from '../components/RecomendedEpisodes';
import LinearGradient from 'react-native-linear-gradient';
import {fetchEpisode} from '../utils/api/service';
import {darkenColor, getDominantColor} from '../utils/ImageColorModule';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const WatchAnimeScreen = ({route}) => {
  useKeepAwake();
  const [data, setData] = useState([]); // State untuk menyimpan data
  const [loading, setLoading] = useState(true); // State untuk loading
  const [expanded, setExpanded] = useState(false);
  const [colorImage, setColorImage] = useState({
      background: '#1b1b1b',
      text: '#ffffff',
    });
  const [videoUrl, setVideoUrl] = useState(null);
  const [isMp4, setIsMp4] = useState(false);
  const {episodeId} = route.params;
  const navigation = useNavigation();
  const source = useSelector((state) => state.animeSource.source);

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      ) : (
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
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
                  source={{uri: videoUrl}}
                  style={{width: '100%', height: '100%'}}
                  controls={true}
                  resizeMode="contain"
                />
              ) : (
                <WebView
                  source={{uri: videoUrl}}
                  allowsFullscreenVideo={true}
                  javaScriptEnabled={true}
                  allowsInlineMediaPlayback={true}
                  cacheEnabled={true}
                  userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                  originWhitelist={['*']}
                  mixedContentMode="always"
                  mediaPlaybackRequiresUserAction={false}
                  onError={syntheticEvent => {
                    const {nativeEvent} = syntheticEvent;
                    console.warn('WebView error: ', nativeEvent);
                  }}
                  renderError={() => (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: '#fff'}}>❌ Gagal memuat video</Text>
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
                <Text style={{color: '#fff'}}>
                  ⚠️ Video tidak tersedia atau sedang error
                </Text>
              </View>
            )}
          </View>
          <LinearGradient
            colors={[colorImage.background, darkenColor(colorImage.background, 0.7)]}
            style={{flex: 1}}>
            <View
              style={{
                width: '100%',
                paddingVertical: 10,
                flexDirection: 'row',
                overflow: 'hidden',
              }}>
              <Image
                style={{
                  height: 100,
                  width: 80,
                  marginRight: 10,
                  marginLeft: 10,
                  borderRadius: 5,
                }}
                source={{uri: data?.poster}}
              />
              <View style={{flex: 1, paddingRight: 10}}>
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
                    fontFamily: 'NotoSans_SemiCondensed-Regular',
                    fontSize: 14,
                  }}
                  numberOfLines={1}>
                  {data?.releasedOn}
                </Text>
              </View>
            </View>
            <View style={{width: '100%', paddingBottom: 10}}>
              <FlatList
                data={data?.genreList}
                horizontal
                keyExtractor={item => item.genreId}
                scrollEventThrottle={60}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 10}}
                renderItem={({item}) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('ListAnimeGenre', {
                        genreId: item.genreId,
                        title: item.title,
                      })
                    }
                    style={{
                      backgroundColor: '#1E293B',
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 20,
                      marginRight: 10,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'NotoSans_SemiCondensed-Bold',
                        fontSize: 12,
                      }}
                      numberOfLines={1}>
                      {item.title}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <Pressable
                disabled={!data?.hasPrevEpisode}
                style={{
                  width: '45%',
                  paddingVertical: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: data?.hasPrevEpisode ? '#1E293B' : '#64748B',
                  opacity: data?.hasPrevEpisode ? 1 : 0.5,
                  borderRadius: 30,
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
                    color: '#fff',
                    fontFamily: 'NotoSans_SemiCondensed-Bold',
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
                  width: '45%',
                  paddingVertical: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: data?.hasNextEpisode ? '#1E293B' : '#64748B',
                  opacity: data?.hasNextEpisode ? 1 : 0.5,
                  borderRadius: 30,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'NotoSans_SemiCondensed-Bold',
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
                paddingHorizontal: 20,
                paddingBottom: 20,
              }}>
              <ServerSelector
                serverData={data?.server}
                setVideoUrl={setVideoUrl}
              />
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 20,
              }}>
              {data?.synopsis?.paragraphs?.length > 0 && (
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
                        ? data?.synopsis?.paragraphs.join('\n\n')
                        : data?.synopsis?.paragraphs[0].slice(0, 200) + '...'}
                    </Text>
                    <TouchableOpacity
                      style={{paddingBottom: 30}}
                      onPress={() => setExpanded(!expanded)}>
                      <Text style={styles.moreText}>
                        {expanded ? 'Show Less' : 'Show More'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <RecommendedEpisodes episodes={data?.recommendedEpisodeList} />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingBottom: 20,
                paddingTop: 50,
              }}>
              <DownloadAnimeComponent animeData={data?.downloadUrl} />
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
