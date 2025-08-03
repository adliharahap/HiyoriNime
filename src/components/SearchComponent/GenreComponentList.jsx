import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchGenres } from '../../utils/api/service';
import { useSelector } from 'react-redux';

const GenreComponentList = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const source = useSelector((state) => state.animeSource.source);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await fetchGenres(source);
        if (response.ok && response.data?.genreList) {
          setGenres(response.data.genreList);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
  }, []);

  const visibleGenres = expanded ? genres : genres.slice(0, 6);

  return (
    <>
      {/* Genre Filter */}
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', paddingLeft: 10, }}>Cari Berdasarkan Genre</Text>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, paddingTop: 10, paddingLeft: 10, }}>
          {visibleGenres.map((genre, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                paddingVertical: 6,
                paddingHorizontal: 15,
                borderRadius: 16,
                marginRight: 10,
                marginBottom: 10,
              }}
              onPress={() =>
                navigation.navigate('ListAnimeGenre', {
                  genreId: genre.genreId,
                  title: genre.title,
                })
              }>
              <Text style={{ color: '#fff', fontSize: 13 }}>{genre.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Button Show More / Show Less */}
      {genres.length > 6 && (
        <TouchableOpacity
          style={{
            marginTop: 10,
            backgroundColor: 'rgba(255,255,255,0.2)',
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 15,
            width: '30%',
            alignItems: 'center',
            marginLeft: 10,
          }}
          onPress={() => setExpanded(!expanded)}>
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
            {expanded ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default GenreComponentList;
