import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import Screen from "../../components/common/Screen";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import MotoList from "../../components/motos/MotoList";
import EditMotoModal from "../../components/motos/EditMotoModal";
import useMotos from "../../hooks/useMotos";
import useBoolean from "../../hooks/useBoolean";
import type { Moto, StatusMoto } from "../../types/domain";
import { useTheme } from "../../theme";
import { useTranslation } from "../../i18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DetalhesScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<StatusMoto | undefined>(undefined);

  const { motos, loading, error, reload, update, remove } = useMotos(
    query || status ? { placa: query || undefined, status } : undefined
  );

  const editOpen = useBoolean(false);
  const confirmOpen = useBoolean(false);
  const [editing, setEditing] = React.useState<{ idx?: number; moto?: Moto }>(
    {}
  );
  const [toDeleteIdx, setToDeleteIdx] = React.useState<number | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  }, [reload]);

  return (
    <Screen backgroundColor={colors.bg} padded>
      <View style={styles.filters}>
        <View
          style={[
            styles.searchBox,
            { borderColor: colors.border, backgroundColor: colors.bgSecundary },
          ]}
        >
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color={colors.placeholder}
          />
          <TextInput
            value={query}
            onChangeText={(v) => setQuery(v.toUpperCase())}
            placeholder={t("detalhes.buscar_placa") as string}
            placeholderTextColor={colors.placeholder}
            style={[styles.input, { color: colors.text }]}
            autoCapitalize="characters"
            autoCorrect={false}
          />
          {query ? (
            <TouchableOpacity onPress={() => setQuery("")}>
              <MaterialCommunityIcons
                name="close-circle-outline"
                size={18}
                color={colors.placeholder}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.segment}>
          <SegBtn
            label={t("detalhes.todos")}
            active={!status}
            onPress={() => setStatus(undefined)}
            colors={colors}
          />
          <SegBtn
            label={t("detalhes.disponiveis")}
            active={status === "DISPONIVEL"}
            onPress={() => setStatus("DISPONIVEL")}
            colors={colors}
          />
          <SegBtn
            label={t("detalhes.manutencao")}
            active={status === "MANUTENCAO"}
            onPress={() => setStatus("MANUTENCAO")}
            colors={colors}
          />
          <SegBtn
            label={t("detalhes.sumidas")}
            active={status === "SUMIDA"}
            onPress={() => setStatus("SUMIDA")}
            colors={colors}
          />
        </View>
      </View>

      {loading ? (
        <LoadingState title={t("detalhes.carregando")} />
      ) : error ? (
        <EmptyState
          title={t("detalhes.erro")}
          subtitle={error}
          iconName="alert-circle-outline"
        />
      ) : motos.length === 0 ? (
        <View
          style={[
            styles.emptyBox,
            { borderColor: colors.border, backgroundColor: colors.bgSecundary },
          ]}
        >
          <MaterialCommunityIcons
            name="playlist-remove"
            size={28}
            color={colors.placeholder}
          />
          <Text style={[styles.emptyTitle, { color: colors.navText }]}>
            {t("detalhes.vazio_titulo")}
          </Text>
          <Text style={[styles.emptySub, { color: colors.placeholder }]}>
            {t("detalhes.vazio_sub")}
          </Text>
        </View>
      ) : (
        <MotoList
          data={motos}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEdit={(m, idx) => {
            setEditing({ idx, moto: m as Moto });
            editOpen.setTrue();
          }}
          onDelete={(idx) => {
            setToDeleteIdx(idx);
            confirmOpen.setTrue();
          }}
        />
      )}

      <EditMotoModal
        visible={editOpen.value}
        initialMoto={editing.moto}
        onClose={editOpen.setFalse}
        onSave={async (patch: Partial<Moto>) => {
          if (!editing.moto?.id) return;
          await update(editing.moto.id, {
            ...patch,
            placa: patch.placa ? patch.placa.toUpperCase() : editing.moto.placa,
          });
          editOpen.setFalse();
          setEditing({});
        }}
      />

      <ConfirmDialog
        visible={confirmOpen.value}
        title={t("detalhes.excluir_titulo")}
        message={t("detalhes.excluir_mensagem")}
        onCancel={() => {
          confirmOpen.setFalse();
          setToDeleteIdx(null);
        }}
        onConfirm={async () => {
          if (toDeleteIdx != null && motos[toDeleteIdx]) {
            await remove(motos[toDeleteIdx].id);
          }
          confirmOpen.setFalse();
          setToDeleteIdx(null);
        }}
      />
    </Screen>
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

const styles = StyleSheet.create({
  filters: { marginBottom: 16 },
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
  segBtn: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    borderWidth: 1,
    borderRadius: 14,
  },
  emptyTitle: { fontSize: 16, fontWeight: "800", marginTop: 8 },
  emptySub: {
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 12,
  },
});
