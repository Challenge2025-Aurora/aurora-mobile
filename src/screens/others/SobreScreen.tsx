import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import Screen from "../../components/common/Screen";

export default function SobreScreen() {
  const { colors } = useTheme();

  return (
    <Screen padded backgroundColor={colors.bg}>
      <View
        style={[
          styles.card,
          { backgroundColor: colors.bgSecundary, borderColor: colors.border },
        ]}
      >
        <View style={styles.left}>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={22}
            color={colors.placeholder}
            style={{ marginRight: 10 }}
          />
          <Text style={[styles.title, { color: colors.text }]}>Sobre o Projeto</Text>
        </View>
        <Text style={[styles.text, { color: colors.text }]}>
          O AuroraTrace foi desenvolvido como parte do Challenge FIAP 2025 em parceria com a startup Mottu. A solução propõe uma plataforma completa de rastreamento e controle de motos em pátios, utilizando visão computacional, sensores IoT e uma interface web/mobile moderna. Com isso, a operação de mais de 100 filiais se torna mais escalável, ágil e segura.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  left: { flexDirection: "row", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "600" },
  text: { fontSize: 14 },
});
