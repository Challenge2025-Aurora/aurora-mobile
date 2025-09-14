import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme";

export default function SobreScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.wrap, { backgroundColor: colors.bg, padding: 16 }]}>
      <Text
        style={{
          color: colors.text,
          fontSize: 16,
          fontWeight: "700",
          marginBottom: 8,
        }}
      >
        Sobre o projeto (placeholder)
      </Text>
      <Text style={{ color: colors.text }}>
        Coloque aqui um resumo quando for implementar de verdade.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({ wrap: { flex: 1 } });
