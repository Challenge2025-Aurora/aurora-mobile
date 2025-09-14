import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from './types';
import HomeStack from './HomeStack';
import ProfileStack from './PerfilStack';
import OthersStack from './OthersStack';
import { useTabOptions, makeIcon } from './useTabOptions';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  const screenOptions = useTabOptions();

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Main"
        component={HomeStack}
        options={{ title: 'Início', tabBarIcon: makeIcon('home-variant-outline') }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={{ title: 'Perfil', tabBarIcon: makeIcon('account-circle-outline') }}
      />
      <Tab.Screen
        name="Outros"
        component={OthersStack}
        options={{ title: 'Outros', tabBarIcon: makeIcon('dots-horizontal-circle-outline') }}
      />
    </Tab.Navigator>
  );
}
