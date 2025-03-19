import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListAnimeImageCollection from '../components/CollectionComponent/ListAnimeImageCollection';
import HistoryIcon from '../assets/Icons/HistoryIcon';
import { useNavigation } from '@react-navigation/native';
import _404MessageComponentList from './../components/_404MessageComponentList';

const CollectionScreen = () => {
  const [favoriteAnimes, setFavoriteAnimes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadFavoriteAnimes();
  }, []);

  const loadFavoriteAnimes = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteAnimes');
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavoriteAnimes(favorites);
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
    }
  };
  console.log(favoriteAnimes);
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(12, 2, 27)', paddingBottom: 90 }}>
      <View style={{ height: 40, width: '100%', paddingLeft: 20, paddingRight: 25, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ color: '#fff', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 18 }} numberOfLines={2}>
          Anime Favorite Kamu
        </Text>
        <TouchableOpacity onPress={loadFavoriteAnimes}>
          <HistoryIcon size={20} color='#00FF0B' />
        </TouchableOpacity>
      </View>

      {favoriteAnimes.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 120 }}>
          <_404MessageComponentList subtitle='Kamu belum menambahkan anime apapun ke collection' />
        </View>
      ) : (
        <FlatList
          data={favoriteAnimes}
          keyExtractor={(item) => item.animeId}
          numColumns={2} // Menampilkan dalam 2 kolom
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailAnime', { animeId: item.animeId, animeTitle: item.title })}
              android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: false }}
              style={{margin: 15, alignItems: 'center', justifyContent: 'center' }}>
              <ListAnimeImageCollection 
                title={item.title} 
                genre={item.genres.join(', ')} 
                rating={item.score} 
                ImgBackground={item.poster} 
              />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default CollectionScreen;
