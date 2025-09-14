import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import type { OthersStackScreenProps } from "../navigation/types";
import Screen from "../components/common/Screen";
import { useTranslation } from "../i18n";

type Option = {
  key: "light" | "dark" | "system";
  title: string;
  subtitle?: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
};

export default function TemaScreen(_props: OthersStackScreenProps<"Tema">) {
  const { mode, set, colors } = useTheme();
  const { t } = useTranslation();

  const opts: Option[] = [
    {
      key: "system",
      title: t("tema.seguir_sistema"),
      subtitle: t("tema.ajusta_automaticamente"),
      icon: "theme-light-dark",
    },
    { key: "light", title: t("tema.claro"), icon: "white-balance-sunny" },
    { key: "dark", title: t("tema.escuro"), icon: "weather-night" },
  ];

  return (
    <Screen padded backgroundColor={colors.bg}>
      <View style={styles.section}>
        {opts.map((o, idx) => {
          const selected = mode === o.key;
          return (
            <TouchableOpacity
              key={o.key}
              onPress={() => set(o.key)}
              activeOpacity={0.85}
              style={[
                styles.row,
                {
                  backgroundColor: colors.bgSecundary,
                  borderColor: colors.border,
                  marginBottom: idx === opts.length - 1 ? 0 : 10,
                },
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
                  <Text style={[styles.title, { color: colors.text }]}>
                    {o.title}
                  </Text>
                  {o.subtitle ? (
                    <Text
                      style={[styles.subtitle, { color: colors.placeholder }]}
                    >
                      {o.subtitle}
                    </Text>
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
    justifyContent: "space-between",
  },
  left: { flexDirection: "row", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 12, marginTop: 2 },
  hint: { marginTop: 16, fontSize: 12, textAlign: "center" },
});
