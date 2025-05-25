import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="map" size={48} color="black" />
      <Text>Mapa das Motos (mock)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
