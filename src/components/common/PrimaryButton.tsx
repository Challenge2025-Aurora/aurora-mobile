import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function PrimaryButton({
  label,
  onPress,
  style,
  disabled,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.btn, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#a27cf0",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  label: { color: "white", fontSize: 16, fontWeight: "600" },
});
