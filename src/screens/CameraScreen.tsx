import { Alert, StyleSheet } from "react-native";
import { useCameraPermissions } from "expo-camera";
import Screen from "../components/common/Screen";
import Overlay from "../components/common/Overlay";
import PermissionGate from "../components/camera/PermissionGate";
import CameraPreview from "../components/camera/CameraPreview";
import CaptureButton from "../components/camera/CaptureButton";
import useCameraCapture from "../hooks/useCameraCapture";
import { useTheme } from "../theme";
import { useTranslation } from "../i18n";

export default function CameraScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();
  const { cameraRef, capturing, takePicture } = useCameraCapture();

  return (
    <Screen backgroundColor={colors.bg}>
      <PermissionGate
        granted={!!permission?.granted}
        onRequest={async () => {
          await requestPermission();
        }}
        deniedMessage={t("camera.permissao_negada")}
      >
        <CameraPreview ref={cameraRef} style={styles.camera} facing="back" />
        <Overlay bottom>
          <CaptureButton
            loading={capturing}
            onPress={async () => {
              const uri = await takePicture();
              if (uri)
                Alert.alert(
                  t("camera.alerta_foto_titulo"),
                  t("camera.alerta_foto_mensagem", { uri })
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
