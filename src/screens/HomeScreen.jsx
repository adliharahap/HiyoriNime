import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HomeHeaderProfile from '../components/HomeComponent/HomeHeaderProfile';
import HomeComponentList from '../components/HomeComponent/HomeComponentList';
import { useNavigation } from '@react-navigation/native';
import { fetchMovies, fetchOngoing, fetchPopular, fetchRecent } from '../utils/api/service';
import HomeComponentRecentList from '../components/HomeComponent/HomeComponentRecentList';
import { useSelector } from 'react-redux';
import LoadingScreen from './LoadingScreen';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [recentAnime, setRecentAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [ongoingAnime, setOngoingAnime] = useState([]);
  const [movieAnime, setMovieAnime] = useState([]);
  const source = useSelector((state) => state.animeSource.source);

  const FetchAnime = async () => {
    try {
      const recent = await fetchRecent(1, source);
      const popular = await fetchPopular(1, source);
      const ongoing = await fetchOngoing(1, source);
      const movies = await fetchMovies(1, source);

      // Simpan ke state, pastikan data tidak undefined
      setRecentAnime(recent?.data?.animeList || []);
      setPopularAnime(popular?.data?.animeList || []);
      setOngoingAnime(ongoing?.data?.animeList || []);
      setMovieAnime(movies?.data?.animeList || []);

    } catch (error) {
      console.error("❌ Error fetching anime:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchAnime();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
            <LinearGradient colors={['#000000', 'rgba(81, 8, 10, 1)']} locations={[0.2, 1]} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} horizontal={false} scrollEventThrottle={80} showsVerticalScrollIndicator={false}>
              {/* Header */}
              <HomeHeaderProfile />
      
              {/* Baru Ditambahkan */}
              <HomeComponentRecentList headerTitle="Baru Saja Ditambahkan" onPress={() => navigation.navigate('ListAnimeRecent')} data={recentAnime} loading={loading} />
      
              {/* Popular Anime */}
              <HomeComponentList headerTitle="Anime Paling Populer" onPress={() => navigation.navigate('ListAnimePopular')} data={popularAnime} loading={loading} />
      
              {/* Anime Ongoing */}
              <HomeComponentList headerTitle="Anime onGoing" onPress={() => navigation.navigate('ListAnimeOngoing')} data={ongoingAnime} loading={loading} />
      
              {/* Anime Movie */}
              <HomeComponentList headerTitle="Anime Movie" onPress={() => navigation.navigate('ListAnimeMovie')} data={movieAnime} loading={loading} />
                <View style={{height: 90}}></View>
            </ScrollView>
          </LinearGradient>
      )}
    </>
  );
};

export default HomeScreen;
