import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";

const RecommendedEpisodes = ({ episodes }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rekomendasi Episode Lainnya</Text>
      <FlatList
        data={episodes}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => {
              const episodeId = item.href.replace("/samehadaku/episode/", "");
              navigation.replace("WatchAnime", { episodeId });
            }}
          >
            <Image source={{ uri: item.poster }} style={styles.poster} />
            <View style={styles.overlay}>
              <Text style={styles.episodeTitle}>{item.title}</Text>
              <Text style={styles.releaseDate}>{item.releaseDate}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    color: "#Fdfdfd",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  poster: {
    width: 200,
    height: 120,
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 5,
  },
  episodeTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  releaseDate: {
    color: "#ccc",
    fontSize: 12,
  },
});

export default RecommendedEpisodes;
