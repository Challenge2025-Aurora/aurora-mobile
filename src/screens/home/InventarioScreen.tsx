import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../theme";
import { useTranslation } from "../../i18n";
import useMotos from "../../hooks/useMotos";
import { getPatioAtual } from "../../api/patios";

export default function InventarioScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { motos } = useMotos();
  const [cap, setCap] = React.useState<{ setor: string; slots: number }[]>([]);

  React.useEffect(() => {
    (async () => {
      const p = await getPatioAtual();
      setCap(p.setores.map(s => ({ setor: s.id, slots: s.slots })));
    })();
  }, []);

  const linhas = React.useMemo(() => {
    const porSetor = new Map<string, number>();
    motos.forEach(m => {
      const s = m.ultimoSetor ?? "—";
      porSetor.set(s, (porSetor.get(s) ?? 0) + 1);
    });
    return Array.from(porSetor.entries()).map(([setor, qtd]) => {
      const capSet = cap.find(c => c.setor === setor)?.slots ?? 0;
      const ocup = capSet ? Math.min(100, Math.round((qtd / capSet) * 100)) : 0;
      return { setor, qtd, cap: capSet, ocup };
    }).sort((a, b) => a.setor.localeCompare(b.setor));
  }, [motos, cap]);

  return (
    <Screen backgroundColor={colors.bg} padded>
      <Text style={[styles.title, { color: colors.primary }]}>{t("inventario.titulo")}</Text>
      <View style={[styles.header, { borderColor: colors.border }]}>
        <Text style={[styles.th, { color: colors.navText, flex: 1.2 }]}>{t("inventario.setor")}</Text>
        <Text style={[styles.th, { color: colors.navText, flex: 1 }]}>{t("inventario.quantidade")}</Text>
        <Text style={[styles.th, { color: colors.navText, flex: 1 }]}>{t("inventario.capacidade")}</Text>
        <Text style={[styles.th, { color: colors.navText, flex: 1 }]}>{t("inventario.ocupacao")}</Text>
      </View>
      <FlatList
        data={linhas}
        keyExtractor={(x) => x.setor}
        renderItem={({ item }) => (
          <View style={[styles.row, { borderColor: colors.border }]}>
            <Text style={[styles.td, { color: colors.text, flex: 1.2 }]}>{item.setor}</Text>
            <Text style={[styles.td, { color: colors.text, flex: 1 }]}>{item.qtd}</Text>
            <Text style={[styles.td, { color: colors.text, flex: 1 }]}>{item.cap}</Text>
            <Text style={[styles.td, { color: colors.text, flex: 1 }]}>{item.ocup}%</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: colors.placeholder, textAlign: "center" }}>{t("inventario.vazio") as string}</Text>}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  header: { flexDirection: "row", borderBottomWidth: 1, paddingBottom: 8, marginBottom: 8 },
  th: { fontWeight: "800", fontSize: 12 },
  row: { flexDirection: "row", borderBottomWidth: StyleSheet.hairlineWidth, paddingVertical: 8 },
  td: { fontSize: 14 },
});
