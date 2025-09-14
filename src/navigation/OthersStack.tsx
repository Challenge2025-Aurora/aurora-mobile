import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { OthersStackParamList } from './types';
import { useStackOptions } from './useStackOptions';

import OutrosScreen from '../screens/OutrosScreen';
import IdiomaScreen from '../screens/IdiomaScreen';
import TemaScreen from '../screens/TemaScreen';
import SobreScreen from '../screens/SobreScreen';
import IntegrantesScreen from '../screens/IntegrantesScreen';
import TecnologiasScreen from '../screens/TecnologiasScreen';

const Stack = createNativeStackNavigator<OthersStackParamList>();

export default function OthersStack() {
  const screenOptions = useStackOptions();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="OutrosHome" component={OutrosScreen} options={{ title: 'Outros' }} />
      <Stack.Screen name="Idioma" component={IdiomaScreen} options={{ title: 'Idioma' }} />
      <Stack.Screen name="Tema" component={TemaScreen} options={{ title: 'Tema' }} />
      <Stack.Screen name="Sobre" component={SobreScreen} options={{ title: 'Sobre o projeto' }} />
      <Stack.Screen name="Integrantes" component={IntegrantesScreen} options={{ title: 'Integrantes' }} />
      <Stack.Screen name="Tecnologias" component={TecnologiasScreen} options={{ title: 'Tecnologias' }} />
    </Stack.Navigator>
  );
}
