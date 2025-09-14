import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme";

export default function TecnologiasScreen() {
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
        Tecnologias usadas (placeholder)
      </Text>
      <Text style={{ color: colors.text }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ut non nesciunt tempora, repellendus dicta doloribus placeat amet doloremque voluptates inventore exercitationem quo. Dolorum consequatur aperiam, commodi iusto blanditiis quas?
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({ wrap: { flex: 1 } });
