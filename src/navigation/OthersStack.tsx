import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { OthersStackParamList } from './types';
import { useStackOptions } from './useStackOptions';
import OutrosScreen from '../screens/OutrosScreen';

const Stack = createNativeStackNavigator<OthersStackParamList>();

export default function OthersStack() {
  const screenOptions = useStackOptions();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="OutrosHome" component={OutrosScreen} options={{ title: 'Outros' }} />
    </Stack.Navigator>
  );
}
