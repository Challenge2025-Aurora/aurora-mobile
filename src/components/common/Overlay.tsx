import { View, StyleSheet, ViewProps } from "react-native";
import { ReactNode } from "react";

interface OverlayProps extends ViewProps {
  children: ReactNode;
  bottom?: boolean;
  top?: boolean;
}

export default function Overlay({
  children,
  bottom,
  top,
  style,
  ...rest
}: OverlayProps) {
  return (
    <View
      style={[styles.base, bottom && styles.bottom, top && styles.top, style]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { position: "absolute", left: 0, right: 0, alignItems: "center" },
  bottom: { bottom: 40 },
  top: { top: 40 },
});
