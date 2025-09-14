import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStackOptions } from './useStackOptions';
import type { MainStackParamList } from './types';

import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import FormularioScreen from '../screens/FormularioScreen';
import DetalhesScreen from '../screens/DetalhesScreen';
import MapaScreen from '../screens/MapaScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function HomeStack() {
  const screenOptions = useStackOptions();
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Aurora' }} />
      <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Câmera' }} />
      <Stack.Screen name="Formulario" component={FormularioScreen} options={{ title: 'Cadastrar Moto' }} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ title: 'Visualizar Motos' }} />
      <Stack.Screen name="Mapa" component={MapaScreen} options={{ title: 'Mapa do Pátio' }} />
    </Stack.Navigator>
  );
}
