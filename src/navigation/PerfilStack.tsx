import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from './types';
import { useStackOptions } from './useStackOptions';
import PerfilScreen from '../screens/profile/PerfilScreen';
import EditarPerfilScreen from '../screens/profile/EditarPerfilScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  const screenOptions = useStackOptions();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="PerfilHome" component={PerfilScreen} options={{ title: 'Perfil' }} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} options={{ title: 'Editar Perfil' }} />
    </Stack.Navigator>
  );
}
