import * as React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../theme";
import { useTranslation } from "../../i18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useMotos from "../../hooks/useMotos";
import { listMotos, updateMoto } from "../../api/motos";
import { registrarEvento } from "../../api/eventos";
import { detectarPorImagem } from "../../api/deteccoes";
import type { StatusMoto } from "../../types/domain";

type Acao = "CHECKIN" | "CHECKOUT";

export default function CheckinCheckoutScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { reload } = useMotos();

  const [acao, setAcao] = React.useState<Acao>("CHECKIN");
  const [placa, setPlaca] = React.useState("");
  const [setor, setSetor] = React.useState("");
  const [slot, setSlot] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function preencherPorDeteccao() {
    try {
      setLoading(true);
      const dets = await detectarPorImagem("mock://frame");
      const p = dets[0]?.placa ?? "";
      if (p) setPlaca(p);
      Alert.alert(t("checkio.detectado_titulo"), p ? t("checkio.detectado_msg", { placa: p }) as string : t("checkio.detectado_vazio") as string);
    } catch {
      Alert.alert(t("comum.erro"), t("checkio.erro_deteccao") as string);
    } finally {
      setLoading(false);
    }
  }

  async function confirmar() {
    const plc = placa.trim().toUpperCase();
    if (!plc) return Alert.alert(t("comum.atencao"), t("checkio.placa_obrigatoria") as string);

    setLoading(true);
    try {
      const encontrados = await listMotos({ placa: plc });
      if (encontrados.length === 0 && acao === "CHECKOUT") {
        Alert.alert(t("comum.atencao"), t("checkio.nao_encontrada") as string);
        return;
      }

      if (acao === "CHECKIN") {
        if (encontrados.length === 0) {
          Alert.alert(
            t("checkio.nao_encontrada_titulo"),
            t("checkio.sugere_cadastro") as string
          );
          return;
        }
        const m = encontrados[0];
        await updateMoto(m.id, {
          status: "DISPONIVEL" as StatusMoto,
          ultimoSetor: setor || m.ultimoSetor,
          ultimoSlot: slot || m.ultimoSlot,
        });
        await registrarEvento({ motoId: m.id, tipo: "CHECKIN", payload: { setor, slot, placa: plc } });
      } else {
        const m = encontrados[0];
        await updateMoto(m.id, { status: "EM_USO" as StatusMoto });
        await registrarEvento({ motoId: m.id, tipo: "CHECKOUT", payload: { placa: plc } });
      }

      setPlaca(""); setSetor(""); setSlot("");
      await reload();
      Alert.alert(t("comum.sucesso"), t("checkio.ok") as string);
    } catch (e) {
      Alert.alert(t("comum.erro"), (e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen backgroundColor={colors.bg} padded>
      <Text style={[styles.title, { color: colors.primary }]}>{t("checkio.titulo")}</Text>

      <View style={styles.segment}>
        <SegBtn label={t("checkio.checkin")} active={acao === "CHECKIN"} onPress={() => setAcao("CHECKIN")} colors={colors} />
        <SegBtn label={t("checkio.checkout")} active={acao === "CHECKOUT"} onPress={() => setAcao("CHECKOUT")} colors={colors} />
      </View>

      <Field
        icon="card-text-outline"
        placeholder={t("checkio.placa_ph") as string}
        value={placa}
        onChangeText={(v) => setPlaca(v.toUpperCase())}
        colors={colors}
      />

      {acao === "CHECKIN" && (
        <>
          <Field icon="view-grid-outline" placeholder={t("checkio.setor_ph") as string} value={setor} onChangeText={setSetor} colors={colors} />
          <Field icon="view-grid-plus" placeholder={t("checkio.slot_ph") as string} value={slot} onChangeText={setSlot} colors={colors} />
        </>
      )}

      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        <TouchableOpacity
          disabled={loading}
          onPress={preencherPorDeteccao}
          style={[styles.btn, { backgroundColor: colors.bgSecundary, borderColor: colors.border, borderWidth: 1 }]}
        >
          <MaterialCommunityIcons name="barcode" size={18} color={colors.text} />
          <Text style={[styles.btnText, { color: colors.text }]}>{t("checkio.preencher_por_deteccao")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={loading}
          onPress={confirmar}
          style={[styles.btn, { backgroundColor: colors.accent }]}
        >
          <MaterialCommunityIcons name="check-bold" size={18} color={colors.bgSecundary} />
          <Text style={[styles.btnText, { color: colors.bgSecundary }]}>{t("checkio.confirmar")}</Text>
        </TouchableOpacity>
      </View>
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
      <Text style={{ color: active ? colors.bgSecundary : colors.text, fontWeight: "800" }}>{label}</Text>
    </TouchableOpacity>
  );
}

function Field({
  icon, placeholder, value, onChangeText, colors,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  colors: any;
}) {
  return (
    <View style={[styles.field, { backgroundColor: colors.bgSecundary, borderColor: colors.border }]}>
      <MaterialCommunityIcons name={icon} size={18} color={colors.placeholder} />
      <TextInputLike
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        colors={colors}
      />
    </View>
  );
}

function TextInputLike({
  placeholder, value, onChangeText, colors,
}: {
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  colors: any;
}) {
  const [TextInput] = React.useState(() => require("react-native").TextInput);
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.placeholder}
      style={{ flex: 1, color: colors.text, marginLeft: 10, paddingVertical: 6 }}
      autoCapitalize="characters"
      autoCorrect={false}
    />
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  segment: { flexDirection: "row", gap: 8, marginBottom: 12 },
  segBtn: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  field: { flexDirection: "row", alignItems: "center", gap: 10, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10 },
  btn: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  btnText: { fontWeight: "800" },
});
