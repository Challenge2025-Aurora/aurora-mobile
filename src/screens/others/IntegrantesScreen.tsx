import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import Screen from "../../components/common/Screen";

type Member = {
  name: string;
  rm: string;
  turma: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
};

const members: Member[] = [
  { name: "Felipe Prometti", rm: "RM555174", turma: "2TDSPM", icon: "account" },
  { name: "Maria Eduarda Pires", rm: "RM558976", turma: "2TDSPZ", icon: "account" },
  { name: "Samuel Damasceno", rm: "RM558876", turma: "2TDSPM", icon: "account" },
];

export default function IntegrantesScreen() {
  const { colors } = useTheme();

  return (
    <Screen padded backgroundColor={colors.bg}>
      <View style={styles.section}>
        {members.map((m, idx) => (
          <View
            key={m.rm}
            style={[
              styles.card,
              {
                backgroundColor: colors.bgSecundary,
                borderColor: colors.border,
                marginBottom: idx === members.length - 1 ? 0 : 10,
              },
            ]}
          >
            <View style={styles.left}>
              <MaterialCommunityIcons
                name={m.icon}
                size={22}
                color={colors.placeholder}
                style={{ marginRight: 10 }}
              />
              <View>
                <Text style={[styles.title, { color: colors.text }]}>{m.name}</Text>
                <Text style={[styles.subtitle, { color: colors.placeholder }]}>
                  {m.rm} - {m.turma}
                </Text>
              </View>
            </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: { flexDirection: "row", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 12, marginTop: 2 },
});
