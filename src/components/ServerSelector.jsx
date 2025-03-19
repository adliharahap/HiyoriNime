import React, { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList, Modal } from "react-native";
import { fetchServer } from "../utils/api/service";

const ServerSelector = ({ serverData, setVideoUrl }) => {
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const availableQualities = serverData?.qualities?.filter(q => q.serverList.length > 0) || [];
  const serverList = selectedQuality ? selectedQuality.serverList : [];

  const handleSelectServer = async (server) => {
    setSelectedServer(server);
    setModalVisible(false);
  
    try {
      const response = await fetchServer(server.serverId);
      if (response?.data?.url) {  // Ganti streamingUrl ke url sesuai API
        setVideoUrl(response.data.url);
      } else {
        setErrorMessage("⚠️ Maaf, streaming untuk server ini tidak tersedia. Coba server lain ya! 😊");
        setErrorModalVisible(true);
      }
    } catch (error) {
      setErrorMessage(
        "❌ Oops! Gagal mengambil data dari server. Mungkin server sedang bermasalah atau koneksi internet kamu tidak stabil. Coba periksa jaringanmu dan coba lagi! 🔄"
      );
      setErrorModalVisible(true);
    }
  };
  

  return (
    <View style={{ width: "100%", padding: 20, backgroundColor: "#1E293B", borderRadius: 10 }}>
      <Text style={{ color: "#FACC15", fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
        {selectedServer ? selectedServer.title : "Default Server"}
      </Text>

      <Pressable
        onPress={() => setModalVisible(true)}
        style={{
          width: "100%",
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: "#334155",
          borderRadius: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          {selectedQuality ? selectedQuality.title : "Pilih Kualitas"}
        </Text>
        <Text style={{ color: "white", fontSize: 18 }}>▼</Text>
      </Pressable>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)" }}>
          <View style={{ width: "80%", backgroundColor: "#1E293B", padding: 16, borderRadius: 10 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Pilih Kualitas
            </Text>

            {availableQualities.map((quality) => (
              <Pressable
                key={quality.title}
                onPress={() => setSelectedQuality(quality)}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#475569",
                  backgroundColor: selectedQuality?.title === quality.title ? "#FACC15" : "transparent"
                }}
              >
                <Text style={{ color: selectedQuality?.title === quality.title ? "black" : "white", fontSize: 16 }}>
                  {quality.title}
                </Text>
              </Pressable>
            ))}

            {serverList.length > 0 && (
              <>
                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
                  Pilih Server
                </Text>
                <FlatList
                  data={serverList}
                  keyExtractor={(item) => item.serverId}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => handleSelectServer(item)}
                      style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "#475569",
                        backgroundColor: selectedServer?.serverId === item.serverId ? "#FACC15" : "transparent"
                      }}
                    >
                      <Text style={{ color: selectedServer?.serverId === item.serverId ? "black" : "white", fontSize: 16 }}>
                        {item.title}
                      </Text>
                    </Pressable>
                  )}
                />
              </>
            )}

            <Pressable
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: "#EF4444",
                borderRadius: 8,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={errorModalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)" }}>
          <View style={{ width: "80%", backgroundColor: "#1b1b1b", padding: 16, borderRadius: 10, alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Error</Text>
            <Text style={{ color: "white", fontSize: 16, marginVertical: 10, textAlign: 'center' }}>{errorMessage}</Text>
            <Pressable
              onPress={() => setErrorModalVisible(false)}
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: "#1E293B",
                borderRadius: 8,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ServerSelector;
