import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../theme';

export function useTabOptions() {
  const { colors } = useTheme();
  return {
    headerShown: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.text,
    tabBarStyle: { backgroundColor: colors.bgSecundary, borderTopColor: colors.border },
    tabBarLabelStyle: { fontWeight: '600' },
  } as const;
}

export const makeIcon =
  (name: React.ComponentProps<typeof MaterialCommunityIcons>['name']) =>
  ({ color, size }: { color: string; size: number }) =>
    <MaterialCommunityIcons name={name} color={color} size={size} />;
