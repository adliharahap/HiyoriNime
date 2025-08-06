import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ListAnimeImageCollection from '../components/CollectionComponent/ListAnimeImageCollection';
import HistoryIcon from '../assets/Icons/HistoryIcon';
import { useNavigation } from '@react-navigation/native';
import _404MessageComponentList from './../components/_404MessageComponentList';
import LinearGradient from 'react-native-linear-gradient';
import { auth, db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import LoadingScreen from './LoadingScreen';
import GuestInfoScreen from './GuestInfoScreen';

const CollectionScreen = () => {
  const [favoriteAnimes, setFavoriteAnimes] = useState([]);
const [loading, setLoading] = useState(true);
const navigation = useNavigation();

useEffect(() => {
  loadFavoriteAnimes();
}, []);

const loadFavoriteAnimes = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn("🛑 User belum login!");
      navigation.navigate('GuestScreen', {
          description: "Fitur ini hanya bisa diakses oleh pengguna yang sudah login. Yuk masuk dulu~ 😄",
          targetFeature: "Collection Anime",
        });
    }

    const favoritesRef = collection(db, "users", user.uid, "favorites");
    const snapshot = await getDocs(favoritesRef);
    const favorites = snapshot.docs.map((doc) => doc.data());

    setFavoriteAnimes(favorites);
    setLoading(false);
  } catch (error) {
    console.log("❌ Error loading favorites from Firestore:", error);
  }
};

if (loading) {
  return <LoadingScreen />;
}

  return (
    <LinearGradient colors={['#000', 'rgba(81, 8, 10, 1)']} style={{ flex: 1, backgroundColor: 'rgb(12, 2, 27)', paddingBottom: 90, paddingTop: 20 }}>
      <View style={{ height: 40, width: '100%', paddingLeft: 20, paddingRight: 25, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ color: '#fff', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 18 }} numberOfLines={2}>
          Anime Favorite Kamu
        </Text>
        <TouchableOpacity onPress={loadFavoriteAnimes}>
          <HistoryIcon size={20} color='rgba(229, 57, 53, 1)' />
        </TouchableOpacity>
      </View>

      {favoriteAnimes.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 120 }}>
          <_404MessageComponentList subtitle='Kamu belum menambahkan anime apapun ke Favorite Kamu' />
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
              activeOpacity={0.7}
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
    </LinearGradient>
  );
};

export default CollectionScreen;
