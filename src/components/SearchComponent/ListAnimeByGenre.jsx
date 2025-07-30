import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaginationComponent from '../PaginationComponent';
import BackIcon from '../../assets/Icons/BackIcon';
import { useNavigation } from '@react-navigation/native';
import { fetchByGenre } from '../../utils/api/service';
import _404MessageComponentList from './../_404MessageComponentList';

const ListAnimeByGenre = ({ route }) => {
  const navigation = useNavigation();
  const { genreId, title } = route.params;

  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

const fetchAnimeData = async (page) => {
  setLoading(true);
  setError(false);
  try {
    const response = await fetchByGenre(genreId, page);

    if (response.ok && response.data) {
      const animeData = response.data.animeList || [];
      const pagination = response.pagination || { totalPages: 1 };

      if (animeData.length === 0) {
        setError(true);
      }

      setAnimeList(animeData);
      setTotalPages(pagination.totalPages);
    } else {
      setError(true);
    }
  } catch {
    setError(true);
  }
  setLoading(false);
};


  useEffect(() => {
    fetchAnimeData(currentPage);
  }, [currentPage]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b1b1b' }}>
      {/* Header */}
      <View style={{ height: 50, paddingHorizontal: 15, flexDirection: 'row', marginTop: 20 }}>
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: 5, paddingRight: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon color='#fff' size={28} />
          </TouchableOpacity>
        </View>
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'NotoSans_SemiCondensed-Bold',
              fontSize: 22,
            }}>
            {title}
          </Text>
        </View>
      </View>

      {/* List Anime */}
      <View style={{ flex: 1, paddingBottom: 80 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : error ? (
          <_404MessageComponentList />
        ) : (
          <FlatList
            data={animeList}
            style={{ flex: 1 }}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate('DetailAnime', { animeId: item.animeId, animeTitle: item.title })}
                android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: false }}
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#333',
                  position: 'relative',
                }}>
                <Image
                  source={{ uri: item.poster }}
                  style={{
                    width: 105,
                    height: 125,
                    borderRadius: 5,
                    marginRight: 10,
                  }}
                />
                <View style={{ flex: 1, gap: 10 }}>
                  <Text numberOfLines={3} style={{ color: '#fff', fontSize: 17, fontFamily: 'NotoSans_SemiCondensed-Bold' }}>
                    {item.title}
                  </Text>
                  <View style={{ width: '100%', flexDirection: 'row', gap: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 12, backgroundColor: '#0FD312', paddingVertical: 3, borderRadius: 30, paddingHorizontal: 20 }} numberOfLines={1}>
                      {item.type}
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 12,
                        backgroundColor: item.status === 'Completed' ? '#00a2ff' : item.status === 'Ongoing' ? '#ff6d1e' : 'gray',
                        paddingVertical: 3,
                        borderRadius: 30,
                        paddingHorizontal: 20,
                      }}
                      numberOfLines={1}>
                      {item.status}
                    </Text>
                    <Text style={{ color: '#fff', fontSize: 12, backgroundColor: 'rgba(228,255,0,0.7)', paddingVertical: 3, borderRadius: 30, paddingHorizontal: 20 }} numberOfLines={1}>
                      ⭐ {item.score}
                    </Text>
                  </View>
                  <Text style={{ color: '#fff', fontSize: 14 }} numberOfLines={2}>
                    Genre : {item.genreList.map(genre => genre.title).join(', ')}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        )}
      </View>

      {/* Pagination Controls */}
      {!error && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </SafeAreaView>
  );
};

export default ListAnimeByGenre;
