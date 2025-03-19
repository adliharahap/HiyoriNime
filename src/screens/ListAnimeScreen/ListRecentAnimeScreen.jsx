import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import PaginationComponent from '../../components/PaginationComponent';
import LinearGradient from 'react-native-linear-gradient';
import BackIcon from '../../assets/Icons/BackIcon';
import {useNavigation} from '@react-navigation/native';

const ListRecentAnimeScreen = () => {
  const navigation = useNavigation();
  const [animeList, setAnimeList] = useState([]); // Menyimpan data anime
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman saat ini
  const [totalPages, setTotalPages] = useState(1); // Total halaman dari API
  const [loading, setLoading] = useState(false); // Status loading

  // 🔥 Fetch Data dari API
  const fetchAnimeData = async page => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://wajik-anime-api.vercel.app/samehadaku/recent?page=${page}`,
      );

      if (response.data && response.data.data && response.data.data.animeList) {
        setAnimeList(response.data.data.animeList); // Simpan daftar anime
        setTotalPages(response.data.pagination.totalPages); // Simpan total halaman
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  // 🔄 Fetch pertama kali
  useEffect(() => {
    fetchAnimeData(currentPage);
  }, [currentPage]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1b1b1b'}}>
      {/* Header */}
      <View
        style={{
          height: 50,
          paddingHorizontal: 15,
          flexDirection: 'row',
          marginTop: 20,
          backgroundColor: '#1b1b1b',
        }}>
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 5,
            paddingRight: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <BackIcon color="#fff" size={28} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'NotoSans_SemiCondensed-Bold',
              fontSize: 22,
            }}>
            Baru Saja Ditambahkan
          </Text>
        </View>
      </View>

      {/* List Anime */}
      <View style={{flex: 1, paddingBottom: 80}}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{marginTop: 350}}
          />
        ) : (
          <FlatList
            data={animeList}
            style={{flex: 1}}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('DetailAnime', {animeId: item.animeId, animeTitle: item.title})
                }
                android_ripple={{
                  color: 'rgba(255,255,255,0.2)',
                  borderless: false,
                }}
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#333',
                  position: 'relative',
                }}>
                <Image
                  source={{uri: item.poster}}
                  style={{
                    width: 105,
                    height: 125,
                    borderRadius: 5,
                    marginRight: 15,
                  }}
                />
                <View style={{flex: 1, gap: 8}}>
                  <Text
                    numberOfLines={3}
                    style={{
                      color: '#fff',
                      fontSize: 17,
                      fontFamily: 'NotoSans_SemiCondensed-Bold',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,1)',
                      fontSize: 12,
                      backgroundColor: '#0FD312',
                      paddingVertical: 3,
                      fontFamily: 'NotoSans_SemiCondensed-Bold',
                      width: 80,
                      textAlign: 'center',
                      borderRadius: 30,
                    }}
                    numberOfLines={1}>
                    Episode {item.episodes}
                  </Text>
                  <Text
                    style={{
                      color: '#aaa',
                      fontSize: 15,
                      fontFamily: 'OpenSans_Condensed-SemiBold',
                    }}
                    numberOfLines={1}>
                    Release {item.releasedOn}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        )}
      </View>

      {/* Pagination Controls */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={page => setCurrentPage(page)}
      />
    </SafeAreaView>
  );
};

export default ListRecentAnimeScreen;
