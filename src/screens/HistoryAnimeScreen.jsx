import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, StatusBar, Modal, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import ConfirmationModal from '../components/ConfirmationModal';
import { clearWatchHistory, getWatchHistory } from '../utils/SaveWatchHistory';
import { useSelector } from 'react-redux';
import EpisodeCardWithPoster from '../components/DetailAnimeComponent/EpisodeCardWithPoster';

// Back Icon Component
const BackIcon = ({ color, size }) => (
  <Text style={{ color, fontSize: size, transform: [{ scaleX: 0.8 }] }}>‹</Text>
);

const HistoryAnimeScreen = () => {
  const navigation = useNavigation();
  const [watchHistory, setWatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const dataUser = useSelector(state => state.user.userData);

  useEffect(() => {
    const fetchData = async () => {
      if (!dataUser.uid) return;

      setLoading(true);
      try {
        const history = await getWatchHistory(dataUser.uid);
        setWatchHistory(history);
      } catch (err) {
        setError('⚠️ Gagal memuat riwayat tonton.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataUser.uid]);

  // Handle click on a history item
  const handleItemPress = (animeId) => {
    navigation.navigate('WatchAnime', { episodeId: animeId });
  };

  // Show confirmation modal
  const handleClearHistory = () => {
    setModalVisible(true);
  };

  // Confirm and clear history
  const onConfirmClear = async () => {
    try {
      const result = await clearWatchHistory(dataUser.uid);

      if (result !== false) {
        // Berhasil dihapus
        ToastAndroid.show('Riwayat berhasil dihapus', ToastAndroid.SHORT);
        setWatchHistory([]); // Kosongin state
      }

      setModalVisible(false); // Tutup modal
    } catch (error) {
      console.error('❌ Error saat hapus riwayat:', error);
      ToastAndroid.show('Gagal menghapus riwayat', ToastAndroid.SHORT);
    }
  };

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <EpisodeCardWithPoster
      poster={item.poster}
      title={item.title}
      onPress={() => handleItemPress(item.animeId)}
      releaseDate={
        item.watchedAt
          ? `Last watched: ${new Date(item.watchedAt.seconds * 1000).toLocaleString('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}`
          : 'Terakhir ditonton: Tidak diketahui'
      }
    />

  );

  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: '#121212' }]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ConfirmationModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          // Taruh logika untuk menghapus riwayat di sini
          onConfirmClear();
        }}
        title="Hapus Riwayat"
        message="Apakah Kamu yakin ingin menghapus semua riwayat tontonan?"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackIcon color='#E0E0E0' size={40} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History Tontonan</Text>
      </View>

      {watchHistory.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyIcon}>🎬</Text>
          <Text style={styles.emptyText}>Riwayat tonton Anda kosong.</Text>
          <Text style={styles.emptySubText}>Mulai tonton anime untuk melihatnya di sini!</Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <TouchableOpacity onPress={handleClearHistory} style={styles.clearButtonWrapper}>
              <Text style={styles.clearButtonText}>Hapus Semua Riwayat</Text>
            </TouchableOpacity>
          }
          data={watchHistory}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.animeId}-${index}`}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center title
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
    position: 'relative',
  },
  backButton: {
    padding: 5,
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  headerTitle: {
    color: '#E0E0E0',
    fontSize: 20,
    fontWeight: 'bold'
  },
  listContent: {
    paddingBottom: 20,
  },
  clearButtonWrapper: {
    alignItems: 'flex-end',
    marginBottom: 10,
    marginTop: 20,
    marginRight: 15,
  },
  clearButtonText: {
    color: '#A78BFA',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.2)',
    alignItems: 'center',
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  poster: {
    width: 150,
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#27272a',
  },
  details: {
    flex: 1,
  },
  title: {
    color: '#EAEAEA',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 6,
  },
  lastWatched: {
    color: '#BDBDBD',
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
  },
  genres: {
    color: '#9E9E9E',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#E0E0E0',
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#E0E0E0',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  emptySubText: {
    fontSize: 14,
    color: '#BDBDBD',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
  },
  errorText: {
    fontSize: 16,
    color: '#ff4d4d',
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'Poppins-Medium',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#EAEAEA',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#BDBDBD',
    lineHeight: 24,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#333',
  },
  cancelButtonText: {
    color: '#EAEAEA',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#A78BFA',
  },
  deleteButtonText: {
    color: '#121212',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
});

export default HistoryAnimeScreen;
