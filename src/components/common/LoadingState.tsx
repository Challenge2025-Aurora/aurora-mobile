import { ActivityIndicator, View, StyleSheet, Text } from "react-native";

interface LoadingStateProps {
  title?: string;
}

export default function LoadingState({ title }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#a27cf0" />
      {title && <Text style={styles.text}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { marginTop: 12, fontSize: 16, color: "#444" },
});
