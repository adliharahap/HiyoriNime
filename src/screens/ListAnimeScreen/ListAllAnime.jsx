import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/Icons/BackIcon';
import SearchIcon from '../../assets/Icons/SearchIcon';
import CloseIcon from '../../assets/Icons/CloseIcon';

const ListAllAnime = () => {
  const navigation = useNavigation();
  const [animeData, setAnimeData] = useState([]);
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAnimeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://wajik-anime-api.vercel.app/samehadaku/anime');
      if (response.data && response.data.data && response.data.data.list) {
        setAnimeData(response.data.data.list);
        setFilteredAnime(response.data.data.list);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnimeData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredAnime(animeData);
    } else {
      const filtered = animeData.map(section => ({
        startWith: section.startWith,
        animeList: section.animeList.filter(anime => anime.title.toLowerCase().includes(query.toLowerCase()))
      })).filter(section => section.animeList.length > 0);
      setFilteredAnime(filtered);
    }
  };

  const renderAnimeItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('DetailAnime', { animeId: item.animeId, animeTitle: item.title })}
      android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: false }}
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#333' }}>
      <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>{item.title}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b1b1b' }}>
      <View style={{ height: 50, paddingHorizontal: 15, flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 20 }}>
          <BackIcon color='#fff' size={28} />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>List Anime</Text>
      </View>
      
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
          marginTop: 15,
          marginBottom: 20,
          marginHorizontal: 10,
        }}>
        <SearchIcon color="#ccc" size={24} />
        <TextInput
          style={{ flex: 1, color: '#fff', marginLeft: 10, fontSize: 14, paddingVertical: 5 }}
          placeholder="Cari anime..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <Pressable
            onPress={() => handleSearch('')}
            style={{backgroundColor: 'rgba(255,255,255,0.2)', padding: 2.5, borderRadius: 30}}>
            <CloseIcon size={18} color='#ccc' />
          </Pressable>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 350 }} />
      ) : (
        <FlatList
          data={filteredAnime}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              <Text style={{ color: '#FFD700', fontSize: 20, padding: 10, fontWeight: 'bold' }}>{item.startWith}</Text>
              <FlatList
                data={item.animeList}
                keyExtractor={(anime, index) => index.toString()}
                renderItem={renderAnimeItem}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ListAllAnime;
