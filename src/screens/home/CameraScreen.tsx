import * as React from "react";
import { Alert, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useCameraPermissions } from "expo-camera";
import Screen from "../../components/common/Screen";
import Overlay from "../../components/common/Overlay";
import PermissionGate from "../../components/camera/PermissionGate";
import CameraPreview from "../../components/camera/CameraPreview";
import CaptureButton from "../../components/camera/CaptureButton";
import useCameraCapture from "../../hooks/useCameraCapture";
import { useTheme } from "../../theme";
import { useTranslation } from "../../i18n";
import { detectarPorImagem } from "../../api/deteccoes";
import { registrarEvento } from "../../api/eventos";
import { listMotos } from "../../api/motos";
import type { Deteccao } from "../../types/domain";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../../navigation/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CameraScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [permission, requestPermission] = useCameraPermissions();
  const { cameraRef, capturing, takePicture } = useCameraCapture();

  const [previewUri, setPreviewUri] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [dets, setDets] = React.useState<Deteccao[]>([]);

  async function handleCapture() {
    const uri = await takePicture();
    if (!uri) return;
    setPreviewUri(uri);
    setProcessing(true);
    try {
      const result = await detectarPorImagem(uri);
      setDets(result);
    } catch (e) {
      Alert.alert(t("camera.erro_titulo"), t("camera.erro_processar") as string);
    } finally {
      setProcessing(false);
    }
  }

  async function handleConfirmFirst() {
    if (!dets[0]) return;
    const d = dets[0];

    let motoId: string | null = null;
    if (d.placa) {
      const found = await listMotos({ placa: d.placa });
      if (found.length > 0) motoId = found[0].id;
    }

    if (!motoId) {
      Alert.alert(
        t("camera.nao_encontrada_titulo"),
        t("camera.nao_encontrada_msg") as string,
        [
          { text: t("camera.cancelar") as string, style: "cancel" },
          {
            text: t("camera.cadastrar") as string,
            onPress: () => navigation.navigate("Formulario"),
          },
        ]
      );
      return;
    }

    await registrarEvento({
      motoId,
      tipo: "DETECCAO",
      payload: {
        placa: d.placa,
        modeloProb: d.modeloProb,
        confianca: d.confianca,
        setorEstimado: d.setorEstimado,
        slotEstimado: d.slotEstimado,
        imagemRef: previewUri,
      },
    });

    Alert.alert(t("camera.ok"), t("camera.detectou", { placa: d.placa ?? "?" }) as string);
    setPreviewUri(null);
    setDets([]);
  }

  function handleDiscard() {
    setPreviewUri(null);
    setDets([]);
  }

  return (
    <Screen backgroundColor={colors.bg}>
      <PermissionGate
        granted={!!permission?.granted}
        onRequest={async () => { await requestPermission(); }}
        deniedMessage={t("camera.permissao_negada")}
      >
        <View style={styles.cameraWrap}>
          <CameraPreview ref={cameraRef} style={styles.camera} facing="back" />
          {!!dets.length && (
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
              {dets.map((d) => (
                <BBox key={d.id} d={d} colors={colors} />
              ))}
            </View>
          )}
        </View>

        <Overlay bottom>
          {previewUri && dets.length > 0 ? (
            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.bgSecundary }]} onPress={handleDiscard}>
                <MaterialCommunityIcons name="delete-outline" size={20} color={colors.text} />
                <Text style={[styles.actionText, { color: colors.text }]}>{t("camera.descartar")}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.accent }]} onPress={handleConfirmFirst}>
                <MaterialCommunityIcons name="check-bold" size={20} color={colors.bgSecundary} />
                <Text style={[styles.actionText, { color: colors.bgSecundary }]}>{t("camera.confirmar")}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <CaptureButton loading={capturing || processing} onPress={handleCapture} />
          )}
        </Overlay>
      </PermissionGate>
    </Screen>
  );
}

function BBox({ d, colors }: { d: Deteccao; colors: any }) {
  if (!d.bbox) return null;
  const { x, y, w, h } = d.bbox;
  return (
    <View
      style={[
        styles.bbox,
        {
          left: x,
          top: y,
          width: w,
          height: h,
          borderColor: colors.accent,
        },
      ]}
    >
      <View style={[styles.tag, { backgroundColor: colors.accent }]}>
        <Text style={[styles.tagText, { color: colors.bgSecundary }]}>
          {d.placa ?? "—"} {d.confianca ? `(${Math.round(d.confianca * 100)}%)` : ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraWrap: { flex: 1, position: "relative" },
  camera: { flex: 1 },
  bbox: {
    position: "absolute",
    borderWidth: 2,
    borderRadius: 8,
  },
  tag: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -28,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  tagText: { fontWeight: "700", fontSize: 12 },
  actionRow: { flexDirection: "row", gap: 12, alignItems: "center", justifyContent: "center" },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  actionText: { fontWeight: "700" },
});
