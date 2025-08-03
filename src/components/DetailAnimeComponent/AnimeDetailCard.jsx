import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailItem = ({ label, value }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || '-'}</Text>
  </View>
);

const AnimeDetailCard = ({ detailAnime, animeTitle }) => {
  const details = [
    { label: 'Title', value: detailAnime?.title?.trim() || animeTitle },
    { label: 'English', value: detailAnime?.english },
    { label: 'Japanese', value: detailAnime?.japanese },
    { label: 'Synonyms', value: detailAnime?.synonyms },
    { label: 'Type', value: detailAnime?.type },
    { label: 'Status', value: detailAnime?.status },
    { label: 'Episodes', value: detailAnime?.episodes },
    { label: 'Score', value: detailAnime?.score?.value },
    { label: 'Users', value: detailAnime?.score?.users },
    { label: 'Duration', value: detailAnime?.duration },
    { label: 'Season', value: detailAnime?.season },
    { label: 'Aired', value: detailAnime?.aired },
    { label: 'Source', value: detailAnime?.source },
    { label: 'Producers', value: detailAnime?.producers },
    { label: 'Studios', value: detailAnime?.studios },
    { label: 'Genres', value: detailAnime?.genreList?.map(g => g.title).join(', ') },
  ];

  return (
    <View style={styles.container}>
      {details.map((item, index) => (
        <DetailItem key={index} label={item.label} value={item.value} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  itemContainer: {
    width: '47%',
    marginBottom: 8,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#aaa',
  },
  value: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#fff',
    marginTop: 2,
  },
});

export default AnimeDetailCard;
