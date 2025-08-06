import {
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const ListAnimeSearch = ({ animeList }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 80 }}>
      {animeList.map((item, index) => (
        <Pressable
          key={index}
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
            <Text
              numberOfLines={3}
              style={{
                color: '#fff',
                fontSize: 17,
                fontFamily: 'NotoSans_SemiCondensed-Bold',
              }}>
              {item.title}
            </Text>
            <View style={{ width: '100%', flexDirection: 'row', gap: 10 }}>
              <Text
                style={{
                  color: 'rgba(255,255,255,1)',
                  fontSize: 12,
                  backgroundColor: '#0FD312',
                  paddingVertical: 3,
                  fontFamily: 'NotoSans_SemiCondensed-Bold',
                  textAlign: 'center',
                  borderRadius: 30,
                  paddingHorizontal: 20,
                }}
                numberOfLines={1}>
                {item.type}
              </Text>
              <Text
                style={{
                  color: 'rgba(255,255,255,1)',
                  fontSize: 12,
                  backgroundColor:
                    item.status === 'Completed' ? '#00a2ff' : item.status === 'Ongoing' ? '#ff6d1e' : 'gray',
                  paddingVertical: 3,
                  fontFamily: 'NotoSans_SemiCondensed-Bold',
                  textAlign: 'center',
                  borderRadius: 30,
                  paddingHorizontal: 20,
                }}
                numberOfLines={1}>
                {item.status}
              </Text>
              <Text
                style={{
                  color: 'rgba(255,255,255,1)',
                  fontSize: 12,
                  backgroundColor: 'rgba(228,255,0,0.7)',
                  paddingVertical: 3,
                  fontFamily: 'NotoSans_SemiCondensed-Bold',
                  textAlign: 'center',
                  borderRadius: 30,
                  paddingHorizontal: 20,
                }}
                numberOfLines={1}>
                ⭐ {item.score || '-'}
              </Text>
            </View>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'NotoSans_Condensed-Medium',
              }}
              numberOfLines={2}>
              Genre : {item.genreList.map(genre => genre.title).join(', ')}
            </Text>
          </View>
        </Pressable>
      ))}
    </SafeAreaView>
  );
};

export default ListAnimeSearch;