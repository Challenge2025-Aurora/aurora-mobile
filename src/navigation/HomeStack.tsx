import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStackOptions } from './useStackOptions';
import type { MainStackParamList } from './types';

import HomeScreen from '../screens/home/HomeScreen';
import CameraScreen from '../screens/home/CameraScreen';
import FormularioScreen from '../screens/home/FormularioScreen';
import DetalhesScreen from '../screens/home/DetalhesScreen';
import MapaScreen from '../screens/home/MapaScreen';

import AlertasScreen from '../screens/home/AlertasScreen';
import OperacaoScreen from '../screens/home/OperacaoScreen';
import InventarioScreen from '../screens/home/InventarioScreen';
import CheckinCheckoutScreen from '../screens/home/CheckinCheckoutScreen';
import EventosScreen from '../screens/home/EventosScreen';
import EditorPlantaScreen from '../screens/home/EditorPlantaScreen';


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
      <Stack.Screen name="Operacao" component={OperacaoScreen} options={{ title: 'Operação' }} />
      <Stack.Screen name="Alertas" component={AlertasScreen} options={{ title: 'Alertas' }} />
      <Stack.Screen name="Inventario" component={InventarioScreen} options={{ title: 'Inventário' }} />
      <Stack.Screen name="CheckinCheckout" component={CheckinCheckoutScreen} options={{ title: 'Check-in/Check-out' }} />
      <Stack.Screen name="Eventos" component={EventosScreen} options={{ title: 'Eventos' }} />
      <Stack.Screen name="EditorPlanta" component={EditorPlantaScreen} options={{ title: 'Editor de Planta' }} />
    </Stack.Navigator>
  );
}
