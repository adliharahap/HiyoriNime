import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PaginationComponent from '../../components/PaginationComponent';
import BackIcon from '../../assets/Icons/BackIcon';
import {useNavigation} from '@react-navigation/native';
import {fetchRecent} from '../../utils/api/service';
import AnimeCardItemRecent from '../../components/ListAnimeComponent/AnimeCardItemRecent';
import { useSelector } from 'react-redux';

const ListRecentAnimeScreen = () => {
  const navigation = useNavigation();
  const [animeList, setAnimeList] = useState([]); // Menyimpan data anime
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman saat ini
  const [totalPages, setTotalPages] = useState(1); // Total halaman dari API
  const [loading, setLoading] = useState(false); // Status loading
  const source = useSelector((state) => state.animeSource.source);

  // 🔥 Fetch Data dari API
  const fetchAnimeData = async page => {
    setLoading(true); // mulai loading

    try {
      const response = await fetchRecent(page, source);

      // Cek struktur data
      if (response?.data?.animeList) {
        setAnimeList(response.data.animeList);
        setTotalPages(response.pagination?.totalPages ?? 1);
      } else {
        console.warn('Data anime tidak ditemukan dalam response');
      }
    } catch (error) {
      console.error('❌ Error fetching anime data:', error);
    }

    setLoading(false); // selesai loading
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
              <AnimeCardItemRecent
                item={item}
                onPress={() =>
                  navigation.navigate('DetailAnime', {
                    animeId: item.animeId,
                    animeTitle: item.title,
                  })
                }
              />
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
