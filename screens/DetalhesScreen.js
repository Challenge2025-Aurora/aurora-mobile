import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetalhesScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="information-circle" size={48} color="black" />
      <Text>Detalhes da moto selecionada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
