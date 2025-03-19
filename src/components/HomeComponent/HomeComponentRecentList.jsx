import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import RecentListAnimeImageBackground from './RecentListAnimeImageBackground';
import { useNavigation } from '@react-navigation/native';

const HomeComponentRecentList = ({ headerTitle, onPress, data, loading }) => {
  const navigation = useNavigation();
  
  return (
    <View style={{ height: 250, width: '100%', marginBottom: 30 }}>
      {/* Header & Title */}
      <View
        style={{
          height: 50,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontFamily: 'NotoSans_Condensed-SemiBold',
            fontSize: 16,
          }}
        >
          {headerTitle}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              color: 'rgb(25, 202, 28)',
              fontFamily: 'NotoSans_Condensed-Regular',
              fontSize: 16,
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Anime Data List */}
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 10,
          }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : data?.length > 0 ? (
            data.map((item) => (
              <Pressable 
                key={item.animeId} // ✅ Gunakan key di Pressable
                onPress={() => navigation.navigate('DetailAnime', { animeId: item.animeId, animeTitle: item.title })}
              >
                <RecentListAnimeImageBackground
                  ImgBackground={item.poster}
                  title={item.title}
                  eps={item.episodes || '-'}
                  releasedOn={item.releasedOn}
                />
              </Pressable>
            ))
          ) : (
            <Text style={{ color: '#fff' }}>Tidak ada data tersedia</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeComponentRecentList;
