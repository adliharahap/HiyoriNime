import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HomeHeaderProfile from '../components/HomeComponent/HomeHeaderProfile';
import HomeComponentList from '../components/HomeComponent/HomeComponentList';
import { useNavigation } from '@react-navigation/native';
import { fetchMovies, fetchOngoing, fetchPopular, fetchRecent } from '../utils/api/service';
import HomeComponentRecentList from '../components/HomeComponent/HomeComponentRecentList';
import getCurrentUserInfo from '../utils/getCurrentUserInfo';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [recentAnime, setRecentAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [ongoingAnime, setOngoingAnime] = useState([]);
  const [movieAnime, setMovieAnime] = useState([]);

  const FetchAnime = async () => {
    try {
      const recent = await fetchRecent();
      const popular = await fetchPopular();
      const ongoing = await fetchOngoing();
      const movies = await fetchMovies();

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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}}>
          <ActivityIndicator size="large" color="yellow" />
        </View>
      ) : (
            <LinearGradient colors={['rgb(12, 2, 27)', '#000']} locations={[0.2, 1]} style={{ flex: 1 }}>
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
                <View style={{height: 80}}></View>
            </ScrollView>
          </LinearGradient>
      )}
    </>
  );
};

export default HomeScreen;
