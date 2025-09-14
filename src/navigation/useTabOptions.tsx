import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useTabOptions() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const baseHeight = 60;
  const extraHeight = insets.bottom;
  const totalHeight = baseHeight + extraHeight;

  return {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.text,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      backgroundColor: colors.bgSecundary,
      borderTopColor: colors.border,
      height: totalHeight,
      paddingBottom: Math.max(extraHeight, 8),
      paddingTop: 6,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 5,
    },
  } as const;
}

export const makeIcon =
  (name: React.ComponentProps<typeof MaterialCommunityIcons>["name"]) =>
  ({ color, size }: { color: string; size: number }) =>
    <MaterialCommunityIcons name={name} color={color} size={size} />;
