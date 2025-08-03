import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import PaginationComponent from '../../components/PaginationComponent';
import BackIcon from '../../assets/Icons/BackIcon';
import { useNavigation } from '@react-navigation/native';
import { fetchOngoing } from '../../utils/api/service';
import AnimeCardItem from '../../components/ListAnimeComponent/AnimeCardItem';
import { useSelector } from 'react-redux';

const ListAnimeOngoing = () => {
  const navigation = useNavigation();
  const [animeList, setAnimeList] = useState([]); // Menyimpan data anime
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman saat ini
  const [totalPages, setTotalPages] = useState(1); // Total halaman dari API
  const [loading, setLoading] = useState(false); // Status loading
  const source = useSelector((state) => state.animeSource.source);

  // 🔥 Fetch Data dari API
  const fetchAnimeData = async page => {
    setLoading(true);
    try {
      const response = await fetchOngoing(page, source);

      if (response?.data?.animeList) {
        setAnimeList(response.data.animeList);
        setTotalPages(response.pagination?.totalPages ?? 1);
      } else {
        console.warn('Data anime tidak ditemukan dalam response');
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
      <View style={{height: 50, paddingHorizontal: 15, flexDirection:  'row', marginTop: 20 }}>
        <View style={{height: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: 5, paddingRight: 20}}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <BackIcon color='#fff' size={28} />
            </TouchableOpacity>
        </View>
        <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text
            style={{
                color: '#fff',
                fontFamily: 'NotoSans_SemiCondensed-Bold',
                fontSize: 22,
            }}>
              Anime Ongoing
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
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <AnimeCardItem item={item} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Pagination Controls */}
        <PaginationComponent
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={(page) => setCurrentPage(page)} 
        />
    </SafeAreaView>
  );
};

export default ListAnimeOngoing;
