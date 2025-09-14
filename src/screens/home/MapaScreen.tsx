import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  LayoutChangeEvent,
  ScrollView,
  StyleProp,
  ViewStyle,
} from "react-native";
import Screen from "../../components/common/Screen";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import { useTheme } from "../../theme";
import { useTranslation } from "../../i18n";
import useMotos from "../../hooks/useMotos";
import type { Moto, Patio, StatusMoto } from "../../types/domain";
import { getPatioAtual } from "../../api/patios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../../navigation/types";

export default function MapaScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<StatusMoto | undefined>(undefined);

  const { motos, loading, error } = useMotos(
    query || status ? { placa: query || undefined, status } : undefined
  );
  const [patio, setPatio] = React.useState<Patio | null>(null);
  const [patioLoading, setPatioLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      setPatioLoading(true);
      const p = await getPatioAtual();
      setPatio(p);
      setPatioLoading(false);
    })();
  }, []);

  const [selected, setSelected] = React.useState<Moto | null>(null);

  React.useEffect(() => {
    if (!query) return setSelected(null);
    const plc = query.toUpperCase();
    const hit = motos.find((m) => m.placa.includes(plc));
    setSelected(hit ?? null);
  }, [query, motos]);

  if (loading || patioLoading) {
    return (
      <Screen backgroundColor={colors.bg}>
        <LoadingState title={t("mapa.carregando_localizacao")} />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen backgroundColor={colors.bg}>
        <EmptyState
          title={t("mapa.erro")}
          subtitle={error}
          iconName="alert-circle-outline"
        />
      </Screen>
    );
  }

  if (!patio) {
    return (
      <Screen backgroundColor={colors.bg}>
        <EmptyState
          title={t("mapa.sem_dados")}
          subtitle={t("mapa.tente_novamente")}
          iconName="map-marker-off"
        />
      </Screen>
    );
  }

  return (
    <Screen backgroundColor={colors.bg} padded>

      <View style={styles.filters}>
        <View
          style={[
            styles.searchBox,
            { borderColor: colors.border, backgroundColor: colors.bgSecundary },
          ]}
        >
          <MaterialCommunityIcons name="magnify" size={20} color={colors.placeholder} />
          <TextInput
            value={query}
            onChangeText={(v) => setQuery(v.toUpperCase())}
            placeholder={t("mapa.buscar_placa") as string}
            placeholderTextColor={colors.placeholder}
            style={[styles.input, { color: colors.text }]}
            autoCapitalize="characters"
            autoCorrect={false}
            returnKeyType="search"
          />
          {query ? (
            <TouchableOpacity onPress={() => setQuery("")}>
              <MaterialCommunityIcons name="close-circle-outline" size={18} color={colors.placeholder} />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.segment}>
          <SegBtn label={t("detalhes.todos")} active={!status} onPress={() => setStatus(undefined)} colors={colors} />
          <SegBtn label={t("detalhes.disponiveis")} active={status === "DISPONIVEL"} onPress={() => setStatus("DISPONIVEL")} colors={colors} />
          <SegBtn label={t("detalhes.manutencao")} active={status === "MANUTENCAO"} onPress={() => setStatus("MANUTENCAO")} colors={colors} />
          <SegBtn label={t("detalhes.sumidas")} active={status === "SUMIDA"} onPress={() => setStatus("SUMIDA")} colors={colors} />
        </View>
      </View>

      <PatioMap
        patio={patio}
        motos={motos}
        colors={colors}
        selected={selected}
        onSelectMoto={setSelected}
      />

      {selected && (
        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.bgSecundary, borderColor: colors.border },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
            <MaterialCommunityIcons name="motorbike" size={18} color={colors.primary} />
            <Text style={{ marginLeft: 6, fontWeight: "800", color: colors.text }}>
              {selected.placa} — {selected.modelo}
            </Text>
          </View>

          <Text style={{ color: colors.placeholder, marginBottom: 8 }}>
            {t("mapa.status")}: {selected.status} | {t("mapa.posicao")}:{" "}
            {selected.ultimoSetor ?? "—"} {selected.ultimoSlot ?? ""}
          </Text>

          <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
            <Btn
              colors={colors}
              bg={colors.bg}
              icon="open-in-new"
              label={t("mapa.ver_detalhes") as string}
              onPress={() => {
                setSelected(null);
                navigation.navigate("Detalhes");
              }}
            />
            <Btn
              colors={colors}
              bg={colors.accent}
              icon="login"
              label="Check-in/Out"
              fg={colors.bgSecundary}
              onPress={() => {
                setSelected(null);
                navigation.navigate("CheckinCheckout");
              }}
            />
            <Btn
              colors={colors}
              bg={colors.bgSecundary}
              outlined
              icon="check"
              label={t("mapa.ok") as string}
              onPress={() => setSelected(null)}
            />
          </View>
        </View>
      )}
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
        <Legend colors={colors} t={t} containerStyle={{ paddingRight: 6 }} />
      </ScrollView>
    </Screen>
  );
}

function PatioMap({
  patio,
  motos,
  colors,
  selected,
  onSelectMoto,
}: {
  patio: Patio;
  motos: Moto[];
  colors: any;
  selected: Moto | null;
  onSelectMoto: (m: Moto | null) => void;
}) {
  const cols = patio.mapa?.cols ?? 12;
  const rows = patio.mapa?.rows ?? 8;

  const [size, setSize] = React.useState({ w: 0, h: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setSize({
      w: width,
      h: Math.max(220, Math.min(520, Math.round(width * 0.6))),
    });
  };

  const totalCells = cols * rows;
  const placeIdx = (m: Moto, fallbackSeed: number) => {
    const n = /(\d+)/.exec(m.ultimoSlot ?? "")?.[1];
    const num = n ? parseInt(n, 10) : (fallbackSeed * 37) % totalCells;
    return Math.max(0, Math.min(totalCells - 1, num - 1));
  };

  const cells: Array<{ motos: Moto[] }> = Array.from({ length: totalCells }, () => ({ motos: [] }));
  motos.forEach((m, i) => {
    const idx = placeIdx(m, i + 1);
    cells[idx].motos.push(m);
  });

  const colorByStatus: Record<Moto["status"], string> = {
    DISPONIVEL: colors.primary,
    MANUTENCAO: "#f59e0b",
    SUMIDA: "#ef4444",
    EM_USO: "#3b82f6",
  };

  return (
    <View onLayout={onLayout} style={{ marginTop: 8 }}>
      <View
        style={[
          styles.grid,
          {
            width: size.w,
            height: size.h,
            backgroundColor: colors.bgSecundary,
            borderColor: colors.border,
          },
        ]}
      >
        {cells.map((cell, idx) => {
          const has = cell.motos.length > 0;
          const first = cell.motos[0];

          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={has ? 0.85 : 1}
              style={[
                styles.cell,
                {
                  width: `${100 / cols}%`,
                  borderColor: colors.border,
                  backgroundColor: has
                    ? withAlpha(colorByStatus[first.status], 0.13)
                    : colors.bg,
                  borderWidth:
                    has && selected?.id === first?.id ? 2 : StyleSheet.hairlineWidth,
                },
              ]}
              onPress={() => has && onSelectMoto(first)}
            >
              {has && (
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: colorByStatus[first.status],
                      borderColor: colors.bg,
                    },
                  ]}
                />
              )}
              {has && (
                <Text style={{ fontSize: 9, color: colors.navText }} numberOfLines={1}>
                  {shortPlate(first.placa)}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function SegBtn({
  label,
  active,
  onPress,
  colors,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  colors: any;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.segBtn,
        {
          backgroundColor: active ? colors.accent : colors.bgSecundary,
          borderColor: colors.border,
          borderWidth: 1,
        },
      ]}
    >
      <Text
        style={{
          color: active ? colors.bgSecundary : colors.text,
          fontWeight: "700",
          fontSize: 12,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function Legend({
  colors,
  t,
  containerStyle,
}: {
  colors: any;
  t: (k: string, p?: any) => string | string[];
  containerStyle?: StyleProp<ViewStyle>;
}) {
  const Chip = ({ color, label }: { color: string; label: string }) => (
    <View
      style={[
        styles.legendItem,
        { backgroundColor: colors.bgSecundary, borderColor: colors.border },
      ]}
    >
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={{ color: colors.text, fontSize: 12 }}>{label}</Text>
    </View>
  );
  return (
    <View style={[{ flexDirection: "row", gap: 8, alignItems: "center" }, containerStyle]}>
      <Chip color={colors.primary} label={t("home.kpi_disponiveis") as string} />
      <Chip color="#f59e0b" label={t("home.kpi_manutencao") as string} />
      <Chip color="#ef4444" label={t("home.kpi_sumidas") as string} />
      <Chip color="#3b82f6" label="Em uso" />
    </View>
  );
}

function withAlpha(hexOrRgb: string, alpha = 0.15) {
  if (hexOrRgb.startsWith("#") && hexOrRgb.length >= 7) {
    const r = parseInt(hexOrRgb.slice(1, 3), 16);
    const g = parseInt(hexOrRgb.slice(3, 5), 16);
    const b = parseInt(hexOrRgb.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return hexOrRgb;
}
function shortPlate(placa: string) {
  return placa?.length > 3 ? `${placa.slice(0, 3)}-${placa.slice(-2)}` : placa;
}

const styles = StyleSheet.create({
  filters: { marginBottom: 12 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 4 },
  segment: { flexDirection: "row", gap: 8, flexWrap: "wrap" },

  grid: {
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  cell: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  dot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
  },

  infoCard: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  btnText: { fontWeight: "800" },

  segBtn: {
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
});

function Btn({
  colors,
  icon,
  label,
  onPress,
  bg,
  fg,
  outlined,
}: {
  colors: any;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  onPress: () => void;
  bg: string;
  fg?: string;
  outlined?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btn,
        outlined
          ? { backgroundColor: bg, borderWidth: 1, borderColor: colors.border }
          : { backgroundColor: bg },
      ]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={18}
        color={fg ?? colors.text}
      />
      <Text style={[styles.btnText, { color: fg ?? colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );
}
