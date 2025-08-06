import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  TextInput,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/Icons/BackIcon';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { resetUserData } from '../../utils/resetUserData';
import { deleteUserAccount } from '../../utils/deleteUserAccount';
import PasswordModal from './PasswordModal';

const { width } = Dimensions.get('window');


const DeleteAccountOrResetData = () => {
  const navigation = useNavigation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector(state => state.user.userData);

  const handleResetData = async () => {
    if (confirmationText !== 'RESET') {
      Alert.alert('Error', 'Ketik "RESET" untuk mengonfirmasi');
      return;
    }

    setIsLoading(true);
    const result = await resetUserData(userData.uid, false);
    setIsLoading(false);
    setShowResetModal(false);
    setConfirmationText('');

    if (result.success) {
      Alert.alert('Berhasil', 'Data berhasil direset');
    } else {
      Alert.alert('Gagal', result.error || 'Terjadi kesalahan saat mereset data');
    }
  };

  const handleDeleteAccount = async () => {
    if (confirmationText !== 'DELETE') {
      Alert.alert('Error', 'Ketik "DELETE" untuk mengonfirmasi');
      return;
    }

    // Cek provider
    if (userData.provider === 'password') {
      setPendingDelete(true);
      setShowDeleteModal(false);
      setShowPasswordModal(true); // Tampilkan modal password
    } else {
      // Google, langsung hapus
      await proceedDelete();
    }
  };

  const proceedDelete = async (password) => {
    setIsLoading(true);
    const result = await deleteUserAccount(userData, navigation, password);
    setIsLoading(false);
    setShowPasswordModal(false);
    setConfirmationText('');

    if (result.success) {
      Alert.alert('Berhasil', 'Akun berhasil dihapus 🗑️');
      navigation.reset({
        index: 0,
        routes: [{ name: 'SplashScreen' }],
      });
    } else {
      Alert.alert('Gagal', result.error || 'Terjadi kesalahan saat menghapus akun 😓');
    }
  };

  const formatDate = (dateString) => {

    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  const ConfirmationModal = ({
    visible, onClose, onConfirm,
    title, description, confirmText, buttonColor
  }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e']}
            style={styles.modalGradient}
          >
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalDescription}>{description}</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Ketik "{confirmText}" untuk mengonfirmasi:</Text>
              <TextInput
                style={styles.confirmInput}
                value={confirmationText}
                onChangeText={setConfirmationText}
                placeholder={`Ketik ${confirmText}`}
                placeholderTextColor="#666"
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setConfirmationText('');
                  onClose();
                }}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: buttonColor }]}
                onPress={onConfirm}
                disabled={isLoading}
              >
                <Text style={styles.confirmButtonText}>
                  {isLoading ? 'Memproses...' : 'Konfirmasi'}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', 'rgba(81, 8, 10, 1)']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <BackIcon color="#ffffff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kelola Akun</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* User Profile Card */}
          <View style={styles.profileCard}>
            <LinearGradient
              colors={['#1e1e3f', '#2a2a5a']}
              style={styles.profileGradient}
            >
              <Image
                source={{ uri: userData.photoURL || userData.photo }}
                style={styles.avatar}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.displayName}>{userData.displayName || userData.name}</Text>
                <Text style={styles.username}>@{userData.username}</Text>
                <Text style={styles.joinDate}>
                  Bergabung {formatDate(userData.createdAt)}
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Data Overview */}
          <View style={styles.dataOverview}>
            <Text style={styles.sectionTitle}>Data Akun Anda</Text>

            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Bio</Text>
              <Text style={styles.dataValue}>{userData.bio || 'Tidak ada bio'}</Text>
            </View>

            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Tanggal Lahir</Text>
              <Text style={styles.dataValue}>{formatDate(userData.birthDate)}</Text>
            </View>

            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Provider</Text>
              <Text style={styles.dataValue}>{userData.provider}</Text>
            </View>

            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Terakhir Diperbarui</Text>
              <Text style={styles.dataValue}>{formatDate(userData.updatedAt)}</Text>
            </View>
          </View>

          {/* Warning Section */}
          <View style={styles.warningSection}>
            <Text style={styles.warningTitle}>⚠️ Zona Berbahaya</Text>
            <Text style={styles.warningText}>
              Tindakan di bawah ini tidak dapat dibatalkan. Pastikan Anda memahami konsekuensinya.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {/* Reset Data Button */}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => setShowResetModal(true)}
            >
              <LinearGradient
                colors={['#ff6b35', '#ff8e53']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonIcon}>🔄</Text>
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonTitle}>Reset Semua Data</Text>
                  <Text style={styles.buttonDescription}>
                    Hapus semua data personal, tapi akun tetap aktif
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Delete Account Button */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => setShowDeleteModal(true)}
            >
              <LinearGradient
                colors={['#e74c3c', '#c0392b']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonIcon}>🗑️</Text>
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonTitle}>Hapus Akun</Text>
                  <Text style={styles.buttonDescription}>
                    Hapus akun dan semua data secara permanen
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Additional Info */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Informasi Penting</Text>
            <Text style={styles.infoText}>
              • Reset data akan menghapus data anime favorite, history anime dan penelusuran{'\n'}
              • Hapus akun akan menghapus seluruh data dan tidak dapat dipulihkan{'\n'}
            </Text>
          </View>
        </ScrollView>

        {/* Confirmation Modals */}
        <ConfirmationModal
          visible={showResetModal}
          onClose={() => setShowResetModal(false)}
          onConfirm={handleResetData}
          title="Reset Semua Data"
          description="Tindakan ini akan menghapus semua data anime Anda, termasuk anime favorit, riwayat tontonan, dan penelusuran. Akun Anda akan tetap aktif, tetapi semua data akan direset."
          confirmText="RESET"
          buttonColor="#ff6b35"
        />

        <ConfirmationModal
          visible={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAccount}
          title="Hapus Akun Permanen"
          description="Tindakan ini akan menghapus akun dan semua data Anda secara permanen. Anda tidak akan dapat masuk lagi dan semua data akan hilang selamanya."
          confirmText="DELETE"
          buttonColor="#e74c3c"
        />

        <PasswordModal
          visible={showPasswordModal}
          onClose={() => {
            setShowPasswordModal(false);
            setPendingDelete(false);
          }}
          onSubmit={(password) => {
            setShowPasswordModal(false);
            proceedDelete(password); // Lanjut hapus dengan password dari user
          }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a5a',
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  profileGradient: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#4a90e2',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  displayName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#4a90e2',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: '#888',
  },
  dataOverview: {
    marginTop: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dataLabel: {
    fontSize: 16,
    color: '#aaa',
    flex: 1,
  },
  dataValue: {
    fontSize: 16,
    color: '#ffffff',
    flex: 2,
    textAlign: 'right',
  },
  warningSection: {
    marginTop: 24,
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(231, 76, 60, 0.3)',
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e74c3c',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#ffcccb',
    lineHeight: 20,
  },
  actionButtons: {
    marginTop: 24,
    gap: 16,
  },
  resetButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  deleteButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  buttonIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  buttonContent: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  buttonDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },
  infoSection: {
    marginTop: 24,
    marginBottom: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a90e2',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width - 40,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
  },
  modalGradient: {
    padding: 30,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
  },
  confirmInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  confirmButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
};

export default DeleteAccountOrResetData;