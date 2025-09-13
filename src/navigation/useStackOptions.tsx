import { useCallback } from "react";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useTheme } from "../theme";
import ThemeToggleButton from "../components/ThemeToggleButton";

export function useStackOptions() {
  const { colors } = useTheme();

  return useCallback((): NativeStackNavigationOptions => ({
    headerStyle: { backgroundColor: colors.navBg },
    headerTintColor: colors.navText,
    headerTitleStyle: { fontWeight: "bold" },
    headerRight: () => <ThemeToggleButton />,
  }), [colors.navBg, colors.navText]);
}
