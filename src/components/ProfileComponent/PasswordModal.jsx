import { useEffect, useState } from 'react';
import {
  Modal,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PasswordModal = ({ visible, onClose, onSubmit }) => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!visible) setPassword('');
  }, [visible]);

  return (
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
            <Text style={styles.modalTitle}>Konfirmasi Password 🔐</Text>

            <Text style={styles.modalDescription}>
              Demi keamanan, masukkan password akun Anda untuk melanjutkan proses penghapusan akun.
            </Text>

            <TextInput
              placeholder="Masukkan password"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  { backgroundColor: password ? '#e74c3c' : '#888' },
                ]}
                onPress={() => onSubmit(password)}
                disabled={!password.trim()}
              >
                <Text style={styles.confirmButtonText}>Hapus Akun</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

export default PasswordModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalGradient: {
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,
  },
  passwordInput: {
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingVertical: 8,
    color: '#fff',
    fontSize: 16,
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#aaa',
    fontSize: 14,
  },
  confirmButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
