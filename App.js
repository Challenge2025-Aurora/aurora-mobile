import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MapaScreen from './screens/MapaScreen';
import FormularioScreen from './screens/FormularioScreen';
import CameraScreen from './screens/CameraScreen';
import DetalhesScreen from './screens/DetalhesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mapa" component={MapaScreen} />
        <Stack.Screen name="Formulário" component={FormularioScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
