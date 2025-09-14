import { View, Text, StyleSheet } from "react-native";
import { ReactNode, useEffect } from "react";

interface PermissionGateProps {
  granted?: boolean;
  onRequest: () => Promise<void>;
  children: ReactNode;
  deniedMessage?: string;
}

export default function PermissionGate({
  granted,
  onRequest,
  children,
  deniedMessage = "Permissão negada",
}: PermissionGateProps) {
  useEffect(() => {
    if (!granted) void onRequest();
  }, [granted, onRequest]);

  if (!granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>{deniedMessage}</Text>
      </View>
    );
  }
  return <>{children}</>;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 16, color: "#a27cf0", textAlign: "center" },
});
