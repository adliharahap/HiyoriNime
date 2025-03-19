import { View, Text, TouchableOpacity, Modal, Animated, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CloseIcon from '../../assets/Icons/CloseIcon';

const SearchHistoryList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [searchHistory, setSearchHistory] = useState([]);

  // Ambil history dari AsyncStorage saat pertama kali render
  useEffect(() => {
    const loadHistory = async () => {
      const storedHistory = await AsyncStorage.getItem('searchHistory');
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    };
    loadHistory();
  }, []);

  // Hapus satu item dari history
  const removeHistoryItem = async (index) => {
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Hapus semua history
  const clearAllHistory = async () => {
    setSearchHistory([]);
    await AsyncStorage.removeItem('searchHistory');
    setModalVisible(false);
  };

  // Tampilkan modal konfirmasi
  const showModal = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      {/* Riwayat Pencarian */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, paddingBottom: 20 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Riwayat Pencarian</Text>
        {searchHistory.length > 0 && (
          <TouchableOpacity onPress={showModal}>
            <Text style={{ color: '#FF5555', fontSize: 14 }}>Hapus Semua</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
        {searchHistory.length > 0 ? (
          searchHistory.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 16,
                marginRight: 8,
                marginBottom: 8,
              }}>
              <Text style={{ color: '#fff', fontSize: 13, marginRight: 6 }}>{item}</Text>
              <TouchableOpacity onPress={() => removeHistoryItem(index)}>
                <CloseIcon color="#aaa" size={14} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={{ color: '#aaa', fontSize: 14, textAlign: 'center', marginTop: 10 }}>
            Belum ada riwayat pencarian.
          </Text>
        )}
      </View>

      {/* Modal Konfirmasi Hapus Semua */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
            <Text style={styles.modalTitle}>Konfirmasi</Text>
            <Text style={styles.modalText}>Yakin ingin menghapus semua riwayat pencarian?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonDanger]} onPress={clearAllHistory}>
                <Text style={styles.modalButtonText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#1e1e2e',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#333',
  },
  modalButtonDanger: {
    backgroundColor: '#FF5555',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SearchHistoryList;
