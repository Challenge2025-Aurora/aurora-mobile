import { KeyboardAvoidingView, Platform, ScrollView, View, Text, StyleSheet } from "react-native";
import Screen from "../../components/common/Screen";
import MotoForm from "../../components/motos/MotoForm";
import useMotos from "../../hooks/useMotos";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../../navigation/types";
import { useTheme } from "../../theme";
import { useTranslation } from "../../i18n";
import { registrarEvento } from "../../api/eventos";
import type { Moto } from "../../types/domain";

type Props = NativeStackScreenProps<MainStackParamList, "Formulario">;

export default function FormularioScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { add } = useMotos();

  return (
    <Screen backgroundColor={colors.bg} padded>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
          <Text style={[styles.title, { color: colors.primary }]}>{t("formulario.titulo") ?? "Cadastrar moto"}</Text>
          <Text style={[styles.sub, { color: colors.placeholder }]}>
            {t("formulario.sub") ?? "Informe modelo, placa e (opcional) setor/slot inicial."}
          </Text>

          <View style={{ height: 12 }} />

          <MotoForm
            submitLabel={t("formulario.salvar")}
            onSubmit={async (m: Partial<Moto>) => {
              const now = new Date().toISOString();
              const novo = await add({
                placa: (m.placa ?? "").toUpperCase(),
                modelo: m.modelo ?? "Desconhecido",
                status: (m.status as Moto["status"]) ?? "DISPONIVEL",
                ultimoSetor: m.ultimoSetor,
                ultimoSlot: m.ultimoSlot,
                fotoUrl: m.fotoUrl,
                atualizadoEm: now,
                id: "" as any,
              } as unknown as Moto);

              await registrarEvento({
                motoId: novo.id,
                tipo: "CHECKIN",
                payload: {
                  setor: novo.ultimoSetor ?? null,
                  slot: novo.ultimoSlot ?? null,
                },
              });

              navigation.goBack();
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "800" },
  sub: { fontSize: 12, marginTop: 4 },
});
