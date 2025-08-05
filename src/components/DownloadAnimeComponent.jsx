import React, { useState } from "react"; 
import { View, Text, Pressable, FlatList, Modal, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { autoAdjustColor } from "../utils/ImageColorModule";

const DownloadAnimeComponent = ({ animeData, colorImage }) => {
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Download Anime</Text>
      {animeData?.formats?.map((format, index) => (
        <Pressable key={index} style={[styles.button, { backgroundColor: autoAdjustColor(colorImage.background) }]} onPress={() => {
          setSelectedFormat(format);
          setSelectedQuality(null); // Reset kualitas saat format berubah
          setModalVisible(true);
        }}>
          <Text style={[styles.buttonText, { color: colorImage.text }]}>{format.title}</Text>
        </Pressable>
      ))}
      
      {/* Modal Pilih Kualitas dan Link Download */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Kualitas</Text>
            {selectedFormat?.qualities?.map((quality, index) => (
              <Pressable
                key={index}
                style={[styles.qualityButton, selectedQuality?.quality === quality.title.trim() && styles.selectedQuality]}
                onPress={() => setSelectedQuality({ ...quality, quality: quality.title.trim() })}
              >
                <Text style={[styles.qualityText, selectedQuality?.quality === quality.title.trim() && styles.selectedQualityText]}>
                  {quality.title.trim()}
                </Text>
              </Pressable>
            ))}

            {selectedQuality && (
              <>
                <Text style={styles.modalTitle}>Pilih Server</Text>
                <FlatList
                  data={selectedQuality.urls}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.downloadButton} onPress={() => Linking.openURL(item.url)}>
                      <Text style={styles.downloadText}>{item.title}</Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            )}

            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E293B",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 10,
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },
  qualityButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#475569",
    backgroundColor: "transparent",
  },
  selectedQuality: {
    backgroundColor: "#FACC15",
  },
  qualityText: {
    color: "white",
    fontSize: 16,
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },
  selectedQualityText: {
    color: "black",
  },
  downloadButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: "center",
  },
  downloadText: {
    color: "#000",
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },
});

export default DownloadAnimeComponent;