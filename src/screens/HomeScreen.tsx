import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Feather, Entypo } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../navigation/types";
import Screen from "../components/common/Screen";
import { useTheme } from "../theme/index";
import { useTranslation } from "../i18n";

type Props = NativeStackScreenProps<MainStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Screen backgroundColor={colors.bg} padded>
      <Text style={[styles.title, { color: colors.primary }]}>{t("home.titulo")}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.bgSecundary, shadowColor: colors.shadow }]}
          onPress={() => navigation.navigate("Formulario")}
        >
          <Feather name="plus-circle" size={32} color={colors.primary} />
          <Text style={[styles.label, { color: colors.text }]}>{t("home.cadastrar_moto")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.accent, shadowColor: colors.shadow }]}
          onPress={() => navigation.navigate("Mapa")}
        >
          <MaterialCommunityIcons
            name="map-marker-radius-outline"
            size={32}
            color={colors.bgSecundary}
          />
          <Text style={[styles.label, { color: colors.bgSecundary }]}>{t("home.mapa_do_patio")}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.bgSecundary, shadowColor: colors.shadow }]}
          onPress={() => navigation.navigate("Camera")}
        >
          <MaterialCommunityIcons name="camera-outline" size={32} color={colors.primary} />
          <Text style={[styles.label, { color: colors.text }]}>{t("home.camera")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.accent, shadowColor: colors.shadow }]}
          onPress={() => navigation.navigate("Detalhes")}
        >
          <Entypo name="list" size={32} color={colors.bgSecundary} />
          <Text style={[styles.label, { color: colors.bgSecundary }]}>{t("home.visualizar_motos")}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 36, textAlign: "center" },
  row: { flexDirection: "row", marginBottom: 24 },
  card: {
    flex: 1,
    height: 130,
    marginHorizontal: 14,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowOpacity: 0.14,
    shadowRadius: 6,
    minWidth: 150,
    maxWidth: 180
  },
  label: { marginTop: 12, fontSize: 16, fontWeight: "600" }
});
