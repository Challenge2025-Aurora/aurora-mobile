import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function IconButton({
  icon,
  onPress,
  style,
  disabled,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.btn, style]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
