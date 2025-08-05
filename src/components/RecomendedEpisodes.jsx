import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient"; // ✨ import gradient

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
            activeOpacity={0.7}
            style={styles.card}
            onPress={() => {
              const episodeId = item.href.replace("/samehadaku/episode/", "");
              navigation.replace("WatchAnime", { episodeId });
            }}
          >
            <Image source={{ uri: item.poster }} style={styles.poster} />
            
            {/* ✨ Gradient overlay */}
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.gradientOverlay}
            >
              <Text numberOfLines={2} style={styles.episodeTitle}>{item.title}</Text>
              <Text numberOfLines={1} style={styles.releaseDate}>{item.releaseDate}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  title: {
    color: "#Fdfdfd",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
  },
  card: {
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  poster: {
    width: 200,
    aspectRatio: 16 / 9,
    borderRadius: 10,
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "flex-end",
    height: 70,
  },
  episodeTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  releaseDate: {
    color: "#ddd",
    fontSize: 12,
  },
});

export default RecommendedEpisodes;
