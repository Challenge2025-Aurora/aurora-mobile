import * as React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../theme";
import { useTranslation } from "../../i18n";
import { listarEventos } from "../../api/eventos";
import { listMotos } from "../../api/motos";
import type { Evento } from "../../types/domain";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type FiltroTipo = "TODOS" | "CHECKIN" | "CHECKOUT" | "MOVE" | "STATUS" | "DETECCAO";

export default function EventosScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [eventos, setEventos] = React.useState<Evento[]>([]);
  const [tipo, setTipo] = React.useState<FiltroTipo>("TODOS");
  const [placa, setPlaca] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const iconByType: Record<Exclude<FiltroTipo, "TODOS">, React.ComponentProps<typeof MaterialCommunityIcons>["name"]> = {
    CHECKIN: "login",
    CHECKOUT: "logout",
    MOVE: "arrow-left-right",
    STATUS: "tag-outline",
    DETECCAO: "crosshairs-gps",
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await listarEventos();
      setEventos(data);
      setLoading(false);
    })();
  }, []);

  const filtrados = React.useMemo(() => {
    let out = [...eventos];
    if (tipo !== "TODOS") out = out.filter(e => e.tipo === tipo);
    if (placa) {
      const plc = placa.toUpperCase();
      out = out.filter(e => String(e.payload?.placa ?? "").includes(plc));
    }
    return out;
  }, [eventos, tipo, placa]);

  async function buscarPorPlaca() {
    if (!placa.trim()) return;
    const found = await listMotos({ placa: placa.trim().toUpperCase() });
    if (found.length > 0) {
      const ids = new Set(found.map(m => m.id));
      const list = (await listarEventos()).filter(e => ids.has(e.motoId));
      setEventos(list);
    }
  }

  return (
    <Screen backgroundColor={colors.bg} padded>
      <Text style={[styles.title, { color: colors.primary }]}>{t("eventos.titulo")}</Text>

      <View style={[styles.searchBox, { backgroundColor: colors.bgSecundary, borderColor: colors.border }]}>
        <MaterialCommunityIcons name="card-text-outline" size={18} color={colors.placeholder} />
        <TextInput
          value={placa}
          onChangeText={(v) => setPlaca(v.toUpperCase())}
          placeholder={t("eventos.buscar_placa") as string}
          placeholderTextColor={colors.placeholder}
          style={{ flex: 1, color: colors.text, marginLeft: 10 }}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={buscarPorPlaca}
        />
        {!!placa && (
          <TouchableOpacity onPress={() => setPlaca("")}>
            <MaterialCommunityIcons name="close-circle-outline" size={18} color={colors.placeholder} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.segment}>
        {(["TODOS","CHECKIN","CHECKOUT","MOVE","STATUS","DETECCAO"] as FiltroTipo[]).map(v => (
          <SegBtn key={v} label={v} active={tipo === v} onPress={() => setTipo(v)} colors={colors} />
        ))}
      </View>

      {loading ? (
        <Text style={{ color: colors.placeholder }}>{t("eventos.carregando")}</Text>
      ) : filtrados.length === 0 ? (
        <Text style={{ color: colors.placeholder }}>{t("eventos.vazio")}</Text>
      ) : (
        <FlatList
          data={filtrados}
          keyExtractor={(e) => e.id}
          contentContainerStyle={{ paddingBottom: 16 }}
          renderItem={({ item }) => (
            <View style={[styles.item, { backgroundColor: colors.bgSecundary, borderColor: colors.border }]}>
              <MaterialCommunityIcons name={iconByType[item.tipo as Exclude<FiltroTipo,"TODOS">] ?? "clock-outline"} size={20} color={colors.primary} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ color: colors.text, fontWeight: "800" }}>{item.tipo}</Text>
                <Text style={{ color: colors.placeholder, fontSize: 12 }}>
                  {new Date(item.criadoEm).toLocaleString()}
                </Text>
                {!!item.payload?.placa && (
                  <Text style={{ color: colors.navText, fontSize: 12 }}>
                    {t("eventos.placa")}: {String(item.payload?.placa)}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
      )}
    </Screen>
  );
}

function SegBtn({ label, active, onPress, colors }: { label: string; active: boolean; onPress: () => void; colors: any; }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.segBtn,
        { backgroundColor: active ? colors.accent : colors.bgSecundary, borderColor: colors.border, borderWidth: 1 },
      ]}
    >
      <Text style={{ color: active ? colors.bgSecundary : colors.text, fontWeight: "800", fontSize: 12 }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    marginBottom: 10
  },
  segment: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8
  },

  segBtn: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
