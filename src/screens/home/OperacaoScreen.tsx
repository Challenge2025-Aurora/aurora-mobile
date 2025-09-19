import * as React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../theme";
import { useTranslation } from "../../i18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useMotos from "../../hooks/useMotos";
import { listarEventos } from "../../api/eventos";
import type { Evento } from "../../types/domain";

export default function OperacaoScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [query, setQuery] = React.useState("");
  const { motos, loading, reload } = useMotos(query ? { placa: query } : undefined);

  const total = motos.length;
  const sumidas = motos.filter(m => m.status === "SUMIDA").length;
  const disp = motos.filter(m => m.status === "DISPONIVEL").length;
  const manut = motos.filter(m => m.status === "MANUTENCAO").length;

  const [eventos, setEventos] = React.useState<Evento[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const loadEventos = React.useCallback(async () => {
    const data = await listarEventos();
    setEventos(data.slice(0, 15));
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Promise.all([reload(), loadEventos()]);
    setRefreshing(false);
  }, [reload, loadEventos]);

  React.useEffect(() => { loadEventos(); }, [loadEventos]);

  return (
    <Screen backgroundColor={colors.bg} padded>
      <Text style={[styles.title, { color: colors.primary }]}>{t("operacao.titulo")}</Text>

      <View style={[styles.searchBox, { borderColor: colors.border, backgroundColor: colors.bgSecundary }]}>
        <MaterialCommunityIcons name="magnify" size={20} color={colors.placeholder} />
        <TextInput
          value={query}
          onChangeText={(v) => setQuery(v.toUpperCase())}
          placeholder={t("operacao.buscar_placa") as string}
          placeholderTextColor={colors.placeholder}
          style={[styles.input, { color: colors.text }]}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="search"
        />
        {!!query && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <MaterialCommunityIcons name="close-circle-outline" size={18} color={colors.placeholder} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.kpiRow}>
        <Kpi label={t("operacao.kpi_total")} val={total} colors={colors} icon="clipboard-list-outline" />
        <Kpi label={t("operacao.kpi_disponiveis")} val={disp} colors={colors} icon="check-circle-outline" />
      </View>
      <View style={styles.kpiRow}>
        <Kpi label={t("operacao.kpi_manutencao")} val={manut} colors={colors} icon="wrench-outline" />
        <Kpi label={t("operacao.kpi_sumidas")} val={sumidas} colors={colors} icon="alert-outline" accent />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.navText }]}>{t("operacao.eventos")}</Text>
      <FlatList
        data={eventos}
        keyExtractor={(e) => e.id}
        refreshControl={<RefreshControl refreshing={refreshing || loading} onRefresh={onRefresh} tintColor={colors.primary} />}
        renderItem={({ item }) => (
          <View style={[styles.eventItem, { borderColor: colors.border, backgroundColor: colors.bgSecundary }]}>
            <MaterialCommunityIcons name={iconByType[item.tipo]} size={20} color={colors.primary} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: colors.text, fontWeight: "600" }}>{item.tipo}</Text>
              <Text style={{ color: colors.placeholder, fontSize: 12 }}>{new Date(item.criadoEm).toLocaleString()}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: colors.placeholder, textAlign: "center" }}>{t("operacao.sem_eventos") as string}</Text>}
      />
    </Screen>
  );
}

const iconByType = {
  CHECKIN: "login",
  CHECKOUT: "logout",
  MOVE: "arrow-left-right",
  STATUS: "tag-outline",
  DETECCAO: "crosshairs-gps",
} as const;

function Kpi({ label, val, colors, icon, accent }: { label: string; val: number; colors: any; icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"]; accent?: boolean; }) {
  const bg = accent ? colors.accent : colors.bgSecundary;
  const fg = accent ? colors.bgSecundary : colors.text;
  const ic = accent ? colors.bgSecundary : colors.primary;
  return (
    <View style={[styles.kpi, { backgroundColor: bg, shadowColor: colors.shadow }]}>
      <MaterialCommunityIcons name={icon} size={18} color={ic} />
      <Text style={[styles.kpiVal, { color: fg }]}>{val}</Text>
      <Text style={[styles.kpiLab, { color: fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "800", marginBottom: 12, textAlign: "left" },
  searchBox: { flexDirection: "row", alignItems: "center", gap: 8, borderWidth: 1, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12 },
  input: { flex: 1, fontSize: 16, paddingVertical: 4 },
  kpiRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  kpi: { flex: 1, borderRadius: 16, padding: 12, elevation: 2, shadowOpacity: 0.12, shadowRadius: 6, minHeight: 72, justifyContent: "center" },
  kpiVal: { fontSize: 20, fontWeight: "800", marginTop: 6 },
  kpiLab: { fontSize: 12, marginTop: 2 },
  sectionTitle: { marginTop: 4, fontWeight: "700", fontSize: 14, marginBottom: 6 },
  eventItem: { flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 10, borderRadius: 14, marginBottom: 8 },
});
