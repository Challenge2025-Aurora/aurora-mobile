import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export default function EmptyState({
  title,
  subtitle,
  iconName,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {iconName && (
        <MaterialCommunityIcons name={iconName} size={48} color="#aaa" />
      )}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 12,
  },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginTop: 6 },
});
