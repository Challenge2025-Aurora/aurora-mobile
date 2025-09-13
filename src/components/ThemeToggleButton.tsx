import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme";

export default function ThemeToggleButton() {
  const { mode, colors, toggle } = useTheme();
  return (
    <TouchableOpacity onPress={toggle} style={{ paddingHorizontal: 8 }}>
      <MaterialCommunityIcons
        name={mode === "light" ? "weather-night" : "white-balance-sunny"}
        size={22}
        color={colors.navText}
      />
    </TouchableOpacity>
  );
}
