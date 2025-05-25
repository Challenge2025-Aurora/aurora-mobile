import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Ver Mapa" onPress={() => navigation.navigate('Mapa')} />
      <Button title="Formulário" onPress={() => navigation.navigate('Formulário')} />
      <Button title="Abrir Câmera" onPress={() => navigation.navigate('Camera')} />
      <Button title="Detalhes da Moto" onPress={() => navigation.navigate('Detalhes')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    padding: 20,
  },
});