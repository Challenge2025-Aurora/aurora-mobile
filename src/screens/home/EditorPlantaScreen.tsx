import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../theme";
import { useTranslation } from "../../i18n";

export default function EditorPlantaScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Screen backgroundColor={colors.bg} padded>
      <Text style={[styles.title, { color: colors.primary }]}>{t("editorplanta.titulo")}</Text>
      <View style={[styles.card, { backgroundColor: colors.bgSecundary, borderColor: colors.border }]}>
        <Text style={{ color: colors.text, fontWeight: "800", marginBottom: 6 }}>
          {t("editorplanta.em_breve")}
        </Text>
        <Text style={{ color: colors.navText }}>
          {t("editorplanta.roadmap")}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  card: { borderWidth: 1, borderRadius: 12, padding: 12 },
});
