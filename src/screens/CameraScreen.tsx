import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CameraViewHandle {
  takePictureAsync: () => Promise<{ uri: string }>;
}

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraViewHandle | null>(null);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission?.granted, requestPermission]);

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
      try {
        setCapturing(true);
        const pic = await cameraRef.current.takePictureAsync();
        Alert.alert(
          "Foto capturada!",
          `A imagem foi salva localmente.\nURI: ${pic.uri}`
        );
      } finally {
        setCapturing(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef as any} style={styles.camera} facing="back" />
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.captureBtn}
          onPress={tirarFoto}
          disabled={capturing}
        >
          <MaterialCommunityIcons
            name="camera-iris"
            size={44}
            color="#ffd86b"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },
  camera: { flex: 1 },
  overlay: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  captureBtn: {
    backgroundColor: "#a27cf0",
    borderRadius: 50,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { color: "#a27cf0", fontSize: 16, textAlign: "center", marginTop: 12 },
});
