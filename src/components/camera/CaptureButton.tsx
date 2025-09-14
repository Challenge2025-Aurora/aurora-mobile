import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CaptureButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function CaptureButton({
  onPress,
  disabled,
  loading,
}: CaptureButtonProps) {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#ffd86b" />
      ) : (
        <MaterialCommunityIcons name="camera-iris" size={44} color="#ffd86b" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#a27cf0",
    borderRadius: 50,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
