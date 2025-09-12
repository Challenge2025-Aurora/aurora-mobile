import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import FormularioScreen from '../screens/FormularioScreen';
import DetalhesScreen from '../screens/DetalhesScreen';
import MapaScreen from '../screens/MapaScreen';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Formulario: undefined;
  Detalhes: undefined;
  Mapa: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#a27cf0' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Pátio Mottu" }} />
      <Stack.Screen name="Camera" component={CameraScreen} options={{ title: "Câmera" }} />
      <Stack.Screen name="Formulario" component={FormularioScreen} options={{ title: "Cadastrar Moto" }} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ title: "Visualizar Motos" }} />
      <Stack.Screen name="Mapa" component={MapaScreen} options={{ title: "Mapa do Pátio" }} />
    </Stack.Navigator>
  );
}
