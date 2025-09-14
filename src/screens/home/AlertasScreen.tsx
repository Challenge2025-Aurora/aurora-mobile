import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../theme";
import { useTranslation } from "../../i18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useMotos from "../../hooks/useMotos";
import { registrarEvento } from "../../api/eventos";
import type { Moto } from "../../types/domain";

type Alerta = { id: string; tipo: "SUMIDA" | "FORA_SETOR" | "MANUTENCAO"; moto: Moto; criadoEm: string; };

export default function AlertasScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { motos } = useMotos();

  const alertas = React.useMemo<Alerta[]>(() => {
    const out: Alerta[] = [];
    motos.forEach((m) => {
      if (m.status === "SUMIDA") out.push({ id: `a-${m.id}`, tipo: "SUMIDA", moto: m, criadoEm: new Date().toISOString() });
      if (m.status === "MANUTENCAO") out.push({ id: `b-${m.id}`, tipo: "MANUTENCAO", moto: m, criadoEm: new Date().toISOString() });
    });
    return out;
  }, [motos]);

  async function resolver(a: Alerta) {
    await registrarEvento({ motoId: a.moto.id, tipo: "STATUS", payload: { alertaResolvido: a.tipo } });
  }

  const iconBy: Record<Alerta["tipo"], React.ComponentProps<typeof MaterialCommunityIcons>["name"]> = {
    SUMIDA: "alert",
    FORA_SETOR: "map-marker-alert",
    MANUTENCAO: "wrench",
  };

  return (
    <Screen backgroundColor={colors.bg} padded>
      <Text style={[styles.title, { color: colors.primary }]}>{t("alertas.titulo")}</Text>
      <FlatList
        data={alertas}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.bgSecundary, borderColor: colors.border }]}>
            <MaterialCommunityIcons name={iconBy[item.tipo]} size={20} color={colors.accent} />
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Text style={{ color: colors.text, fontWeight: "800" }}>
                {item.tipo} — {item.moto.placa}
              </Text>
              <Text style={{ color: colors.placeholder, fontSize: 12 }}>
                {t("alertas.detectado_em")}: {new Date(item.criadoEm).toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={() => resolver(item)}>
              <Text style={{ color: colors.bgSecundary, fontWeight: "800" }}>{t("alertas.resolver")}</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: colors.placeholder, textAlign: "center" }}>{t("alertas.nenhum") as string}</Text>}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  card: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 8 },
  btn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
});
