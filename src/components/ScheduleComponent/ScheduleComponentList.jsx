import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import ListAnimeScheduleBackground from './ListAnimeScheduleBackground';

const ScheduleComponentList = ({ headerTitle, animeList }) => {
  return (
    <View style={{ height: 250, width: '100%', marginBottom: 30 }}>
      {/* Header & title */}
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
          {animeList.map((anime, index) => (
            <ListAnimeScheduleBackground
            key={anime.animeId}
            title={anime.title}
            genre={anime.genres}
            rating={anime.score}
            estimation={anime.estimation}
            type={anime.type}
            ImgBackground={anime.poster}
            href={anime.href} // Untuk navigasi ke detail anime
          />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ScheduleComponentList;