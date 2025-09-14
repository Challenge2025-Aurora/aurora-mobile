import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import Screen from "../components/common/Screen";
import type { OthersStackScreenProps } from "../navigation/types";
import { useLanguage, useTranslation } from "../i18n";

type Option = {
  key: "pt" | "en" | "es";
  title: string;
  subtitle?: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
};

export default function IdiomaScreen(_props: OthersStackScreenProps<"Idioma">) {
  const { colors } = useTheme();
  const { lang, setLang } = useLanguage();
  const { t } = useTranslation();

  const opts: Option[] = [
    { key: "pt", title: t("language.pt"), icon: "alpha-p-circle-outline" },
    { key: "en", title: t("language.en"), icon: "alpha-e-circle-outline" },
    { key: "es", title: t("language.es"), icon: "alpha-s-circle-outline" }
  ];

  return (
    <Screen padded backgroundColor={colors.bg}>
      <View style={styles.section}>
        {opts.map((o, idx) => {
          const selected = lang === o.key;
          return (
            <TouchableOpacity
              key={o.key}
              onPress={() => setLang(o.key)}
              activeOpacity={0.85}
              style={[
                styles.row,
                {
                  backgroundColor: colors.bgSecundary,
                  borderColor: colors.border,
                  marginBottom: idx === opts.length - 1 ? 0 : 10
                }
              ]}
            >
              <View style={styles.left}>
                <MaterialCommunityIcons
                  name={o.icon}
                  size={22}
                  color={colors.placeholder}
                  style={{ marginRight: 10 }}
                />
                <View>
                  <Text style={[styles.title, { color: colors.text }]}>{o.title}</Text>
                  {o.subtitle ? (
                    <Text style={[styles.subtitle, { color: colors.placeholder }]}>{o.subtitle}</Text>
                  ) : null}
                </View>
              </View>

              <MaterialCommunityIcons
                name={selected ? "radiobox-marked" : "radiobox-blank"}
                size={22}
                color={selected ? colors.primary : colors.placeholder}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { gap: 0 },
  row: {
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  left: { flexDirection: "row", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 12, marginTop: 2 }
});
