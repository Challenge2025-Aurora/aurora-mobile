import { Alert, StyleSheet } from "react-native";
import { useCameraPermissions } from "expo-camera";
import Screen from "../components/common/Screen";
import Overlay from "../components/common/Overlay";
import PermissionGate from "../components/camera/PermissionGate";
import CameraPreview from "../components/camera/CameraPreview";
import CaptureButton from "../components/camera/CaptureButton";
import useCameraCapture from "../hooks/useCameraCapture";
import { useTheme } from "../theme";

export default function CameraScreen() {
  const { colors } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const { cameraRef, capturing, takePicture } = useCameraCapture();

  return (
    <Screen backgroundColor={colors.bg}>
      <PermissionGate
        granted={!!permission?.granted}
        onRequest={async () => {
          await requestPermission();
        }}
        deniedMessage="Permissão da câmera negada."
      >
        <CameraPreview ref={cameraRef} style={styles.camera} facing="back" />
        <Overlay bottom>
          <CaptureButton
            loading={capturing}
            onPress={async () => {
              const uri = await takePicture();
              if (uri)
                Alert.alert(
                  "Foto capturada!",
                  `A imagem foi salva localmente.
URI: ${uri}`
                );
            }}
          />
        </Overlay>
      </PermissionGate>
    </Screen>
  );
}

const styles = StyleSheet.create({
  camera: { flex: 1 },
});
