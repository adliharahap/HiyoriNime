import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, ScrollView, StyleSheet, Linking } from "react-native";
import axios from "axios";
import { darkenColor } from "../utils/ImageColorModule";

const BatchDownloadSection = ({ batchList, colorImage }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [downloadData, setDownloadData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function untuk membuka modal dan fetch data dari API
  const openModal = async (batch) => {
    setSelectedBatch(batch);
    setModalVisible(true);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://wajik-anime-api.vercel.app/samehadaku/batch/${batch.batchId}`
      );

      if (response.data.data?.downloadUrl?.formats) {
        setDownloadData(response.data.data.downloadUrl.formats);
      } else {
        setError("Data tidak ditemukan.");
      }
    } catch (err) {
      console.error("Error saat fetch data:", err);
      setError("Gagal mengambil data, coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{...styles.container, backgroundColor: darkenColor(colorImage, 0.6),}}>
      <Text style={styles.title}>Download Batch</Text>

      {/* Mapping daftar batch */}
      {batchList?.length > 0 ? (
        batchList.map((batch, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => openModal(batch)}
            style={{...styles.batchButton, backgroundColor: darkenColor(colorImage, 0.3),}}
          >
            <Text style={styles.batchButtonText}>{batch.title}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noBatchText}>Tidak ada batch tersedia.</Text>
      )}

      {/* Modal untuk menampilkan informasi batch */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedBatch?.title}</Text>

            {/* Loading Indicator */}
            {loading && <ActivityIndicator size="large" color="#7f00ff" />}

            {/* Jika Gagal */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Jika Data Sudah Ada */}
            {downloadData.length > 0 && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {downloadData.map((format, idx) => (
                  <View key={idx} style={styles.formatContainer}>
                    <Text style={styles.formatTitle}>{format.title}</Text>
                    {format.qualities.map((quality, qIdx) => (
                      <View key={qIdx} style={styles.qualityContainer}>
                        <Text style={styles.qualityTitle}>{quality.title}</Text>
                        {quality.urls.map((link, lIdx) => (
                          <TouchableOpacity
                            key={lIdx}
                            onPress={() => Linking.openURL(link.url)} // Open URL in browser
                            style={{...styles.downloadButton, backgroundColor: darkenColor(colorImage, 0.6)}}
                          >
                            <Text style={styles.downloadButtonText}>{link.title}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ))}
                  </View>
                ))}
              </ScrollView>
            )}

            {/* Tombol Tutup Modal */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{...styles.closeButton, backgroundColor: darkenColor(colorImage, 0.6),}}
            >
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderRadius: 15
  },
  title: {
    color: "#Fdfdfd",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "OpenSans_SemiCondensed-Medium",
    marginBottom: 10,
    paddingTop: 10
  },
  batchButton: {
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  batchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  noBatchText: {
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#1b1b1b",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  errorText: {
    color: "red",
  },
  formatContainer: {
    marginBottom: 15,
  },
  formatTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  qualityContainer: {
    marginLeft: 10,
  },
  qualityTitle: {
    fontSize: 14,
    marginTop: 5,
    color: "#fff",
  },
  downloadButton: {
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  downloadButtonText: {
    color: "white",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BatchDownloadSection;
