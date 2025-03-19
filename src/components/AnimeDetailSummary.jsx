import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

const AnimeDetailSummary = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const animeList = [
    {
      title: "Amagami-san Chi no Enmusubi",
      poster: "https://samehadaku.mba/wp-content/uploads/2024/10/143586l.jpg",
      score: { value: "6.97", users: "9,301" },
      japanese: "甘神さんちの縁結び",
      synonyms: "Matchmaking of the Amagami Household",
      english: "Tying the Knot with an Amagami Sister",
      status: "Ongoing",
      type: "TV",
      source: "Manga",
      duration: "23 min. per ep.",
      episodes: 24,
      season: "Fall 2024",
      studios: "Drive",
      aired: "Oct 2, 2024 to ?",
      genreList: ["Comedy", "Harem", "Romance", "Shounen"],
    }
  ];

  return (
    <FlatList
      data={animeList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.card}>
          {/* Header (Judul & Poster) */}
          <TouchableOpacity onPress={() => setExpandedIndex(expandedIndex === index ? null : index)} style={styles.header}>
            <Image source={{ uri: item.poster }} style={styles.poster} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.japanese}>{item.japanese}</Text>
              <Text style={styles.score}>⭐ {item.score.value} ({item.score.users} users)</Text>
            </View>
          </TouchableOpacity>

          {/* Detail Expandable */}
          {expandedIndex === index && (
            <View style={styles.details}>
              <Text><Text style={styles.bold}>English:</Text> {item.english}</Text>
              <Text><Text style={styles.bold}>Status:</Text> {item.status}</Text>
              <Text><Text style={styles.bold}>Type:</Text> {item.type}</Text>
              <Text><Text style={styles.bold}>Source:</Text> {item.source}</Text>
              <Text><Text style={styles.bold}>Duration:</Text> {item.duration}</Text>
              <Text><Text style={styles.bold}>Episodes:</Text> {item.episodes}</Text>
              <Text><Text style={styles.bold}>Season:</Text> {item.season}</Text>
              <Text><Text style={styles.bold}>Studios:</Text> {item.studios}</Text>
              <Text><Text style={styles.bold}>Aired:</Text> {item.aired}</Text>

              {/* Genre List */}
              <View style={styles.genreContainer}>
                {item.genreList.map((genre, i) => (
                  <Text key={i} style={styles.genre}>{genre}</Text>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    />
  );
};

export default AnimeDetailSummary;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5f5f5",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3, 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  japanese: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
  },
  score: {
    fontSize: 14,
    color: "#ff9800",
    marginTop: 4,
  },
  details: {
    padding: 10,
    backgroundColor: "#fff",
  },
  bold: {
    fontWeight: "bold",
    color: "#333",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  genre: {
    backgroundColor: "#6200ea",
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
});
