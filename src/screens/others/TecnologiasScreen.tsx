import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import Screen from "../../components/common/Screen";

type MaterialCommunityIconName =
  | "cellphone"
  | "server"
  | "database"
  | "cloud-outline";

const tecnologias: {
  icon: MaterialCommunityIconName;
  title: string;
  list: string[];
}[] = [
  {
    icon: "cellphone",
    title: "Mobile App",
    list: ["React Native + Expo", "Firebase Auth", "React Navigation"],
  },
  {
    icon: "server",
    title: "API Java",
    list: ["Java 18 + Spring Boot", "Spring Security", "Swagger", "Flyway"],
  },
  {
    icon: "database",
    title: "Banco de Dados",
    list: ["H2 Database", "Oracle", "JPA + Hibernate"],
  },
  {
    icon: "cloud-outline",
    title: "DevOps & Cloud",
    list: [
      "Docker & Compose",
      "Azure CLI / ACI / AppService",
      "CI/CD com Azure DevOps",
    ],
  },
];

export default function TecnologiasScreen() {
  const { colors } = useTheme();

  return (
    <Screen padded backgroundColor={colors.bg}>
      <View style={styles.section}>
        {tecnologias.map((t, idx) => (
          <View
            key={t.title}
            style={[
              styles.card,
              {
                backgroundColor: colors.bgSecundary,
                borderColor: colors.border,
                marginBottom: idx === tecnologias.length - 1 ? 0 : 10,
              },
            ]}
          >
            <View style={styles.left}>
              <MaterialCommunityIcons
                name={t.icon}
                size={22}
                color={colors.placeholder}
                style={{ marginRight: 10 }}
              />
              <Text style={[styles.title, { color: colors.text }]}>
                {t.title}
              </Text>
            </View>
            {t.list.map((item, i) => (
              <Text
                key={i}
                style={[styles.item, { color: colors.placeholder }]}
              >
                • {item}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { gap: 0 },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  left: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  title: { fontSize: 16, fontWeight: "600" },
  item: { fontSize: 13, marginLeft: 32, marginTop: 4 },
});
