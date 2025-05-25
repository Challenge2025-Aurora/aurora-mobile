import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormularioScreen() {
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');

  const salvar = async () => {
    await AsyncStorage.setItem('moto', JSON.stringify({ modelo, placa }));
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Modelo" value={modelo} onChangeText={setModelo} />
      <TextInput style={styles.input} placeholder="Placa" value={placa} onChangeText={setPlaca} />
      <Button title="Salvar" onPress={salvar} />
      <Text>{modelo} - {placa}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 12,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
  },
});