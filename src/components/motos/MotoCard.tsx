import { View, Text, StyleSheet } from "react-native";
import type { Moto } from "../../types/moto";
import { useTheme } from "../../theme";

interface Props {
  moto: Moto;
}
export default function MotoCard({ moto }: Props) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.bgSecundary }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        Modelo: {moto.modelo}
      </Text>
      <Text style={[styles.text, { color: colors.text }]}>
        Placa: {moto.placa}
      </Text>
      <Text style={[styles.text, { color: colors.text }]}>
        Pátio: {moto.patio}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, marginBottom: 6, elevation: 2 },
  text: { fontSize: 15, marginBottom: 4 },
});
