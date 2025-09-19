import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import TextField from "../common/TextField";
import PrimaryButton from "../common/PrimaryButton";
import type { Moto } from "../../types/domain";
import { useTheme } from "../../theme";
import { useTranslation } from "../../i18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  defaultValues?: Partial<Moto>;
  onSubmit: (moto: Partial<Moto>) => void;
  submitLabel?: string;
}

export default function MotoForm({
  defaultValues,
  onSubmit,
  submitLabel = "Salvar",
}: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [modelo, setModelo] = React.useState(defaultValues?.modelo ?? "");
  const [placa, setPlaca] = React.useState(defaultValues?.placa ?? "");
  const [ultimoSetor, setUltimoSetor] = React.useState(
    defaultValues?.ultimoSetor ?? ""
  );
  const [ultimoSlot, setUltimoSlot] = React.useState(
    defaultValues?.ultimoSlot ?? ""
  );

  // validação simples
  const placaFmt = placa.toUpperCase().replace(/\s+/g, "");
  const modeloOk = modelo.trim().length >= 2;
  const placaOk = placaFmt.length >= 7;
  const canSubmit = modeloOk && placaOk;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.bgSecundary,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="motorbike"
          size={18}
          color={colors.primary}
        />
        <Text style={[styles.title, { color: colors.text }]}>
          {t("formulario.titulo") ?? "Nova moto"}
        </Text>
      </View>
      <Text style={[styles.subtitle, { color: colors.placeholder }]}>
        {t("formulario.sub") ??
          "Preencha os dados básicos para cadastrar a moto no pátio."}
      </Text>

      <View style={styles.sp16} />

      <TextField
        label={t("formulario.modelo") ?? "Modelo"}
        value={modelo}
        onChangeText={setModelo}
        placeholder={t("formulario.modelo_ph") ?? "Ex: Sport 110i"}
        placeholderTextColor={colors.placeholder}
        style={{ color: colors.primary }}
      />

      <View style={styles.sp8} />
      <TextField
        label={t("formulario.placa") ?? "Placa"}
        value={placaFmt}
        onChangeText={(v) => setPlaca(v.toUpperCase())}
        placeholder={t("formulario.placa_ph") ?? "Ex: ABC1D23"}
        autoCapitalize="characters"
        autoCorrect={false}
        placeholderTextColor={colors.placeholder}
        style={{ color: colors.primary }}
      />
      {!placaOk && placaFmt.length > 0 && (
        <Text style={[styles.helper, { color: colors.placeholder }]}>
          {t("formulario.placa_hint") ??
            "Use o padrão Mercosul (ex.: ABC1D23)."}
        </Text>
      )}

      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 6 }}>
          <TextField
            label={t("formulario.setor") ?? "Setor"}
            value={ultimoSetor}
            onChangeText={setUltimoSetor}
            placeholder={t("formulario.setor_ph") ?? "Ex: A"}
            placeholderTextColor={colors.placeholder}
            style={{ color: colors.primary }}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 6 }}>
          <TextField
            label={t("formulario.slot") ?? "Slot"}
            value={ultimoSlot}
            onChangeText={setUltimoSlot}
            placeholder={t("formulario.slot_ph") ?? "Ex: A-12"}
            placeholderTextColor={colors.placeholder}
            style={{ color: colors.primary }}
          />
        </View>
      </View>

      <View style={styles.sp12} />
      <PrimaryButton
        label={submitLabel}
        disabled={!canSubmit}
        onPress={() => {
          if (!canSubmit) return;
          onSubmit({
            modelo: modelo.trim(),
            placa: placaFmt,
            ultimoSetor: ultimoSetor.trim() || undefined,
            ultimoSlot: ultimoSlot.trim() || undefined,
          });
        }}
      />

      <View style={styles.sp8} />
      <Text style={[styles.foot, { color: colors.placeholder }]}>
        {t("formulario.dica") ??
          "Você pode ajustar setor/slot depois pela tela de Detalhes."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    elevation: 2,
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 18, fontWeight: "800" },
  subtitle: { fontSize: 12, marginTop: 2 },
  row: { flexDirection: "row", marginTop: 8 },
  helper: { fontSize: 12, marginTop: 4 },
  foot: { fontSize: 12, textAlign: "center" },
  sp8: { height: 8 },
  sp12: { height: 12 },
  sp16: { height: 16 },
});
