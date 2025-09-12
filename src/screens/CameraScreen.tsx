import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Permissão da câmera negada.</Text>
      </View>
    );
  }

  const tirarFoto = async () => {
    if (cameraRef.current && !capturing) {
      setCapturing(true);
      await cameraRef.current.takePictureAsync();
      Alert.alert('Foto capturada!', 'A imagem foi salva localmente.');
      setCapturing(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.captureBtn} onPress={tirarFoto}>
          <MaterialCommunityIcons name="camera-iris" size={44} color="#ffd86b" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  camera: { flex: 1 },
  overlay: { position: 'absolute', bottom: 40, width: '100%', alignItems: 'center' },
  captureBtn: {
    backgroundColor: '#a27cf0',
    borderRadius: 50,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { color: '#a27cf0', fontSize: 16, textAlign: 'center', marginTop: 12 },
});