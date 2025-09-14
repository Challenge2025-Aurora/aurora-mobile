import { StyleSheet, ViewProps } from "react-native";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps extends ViewProps {
  children: ReactNode;
  backgroundColor?: string;
  padded?: boolean;
}

export default function Screen({ children, style, backgroundColor, padded, ...rest }: ScreenProps) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }, padded && styles.padded, style]} {...rest}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  padded: { padding: 16 },
});