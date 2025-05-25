import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="camera" size={48} color="black" />
      <Text>Função de câmera (em construção)</Text>
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
