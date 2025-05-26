import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormularioScreen({ navigation }) {
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [patio, setPatio] = useState('');

  const salvar = async () => {
    if (!modelo || !placa || !patio) {
      Alert.alert('Preencha todos os campos!');
      return;
    }
    const novaMoto = { modelo, placa, patio };
    const dadosAntigos = await AsyncStorage.getItem('motos');
    let lista = dadosAntigos ? JSON.parse(dadosAntigos) : [];
    lista.push(novaMoto);
    await AsyncStorage.setItem('motos', JSON.stringify(lista));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.label}>Modelo:</Text>
      <TextInput style={styles.input} value={modelo} onChangeText={setModelo} placeholder="Ex: Sport 110i" placeholderTextColor="#bfaeeb" />
      <Text style={styles.label}>Placa:</Text>
      <TextInput style={styles.input} value={placa} onChangeText={setPlaca} placeholder="Ex: ABC-1234" placeholderTextColor="#bfaeeb" />
      <Text style={styles.label}>Pátio:</Text>
      <TextInput style={styles.input} value={patio} onChangeText={setPatio} placeholder="Ex: Centro-SP" placeholderTextColor="#bfaeeb" />
      <TouchableOpacity style={styles.btn} onPress={salvar}>
        <Text style={styles.btnText}>Salvar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f7ff', padding: 24 },
  label: { color: '#a27cf0', fontSize: 16, marginTop: 20, fontWeight: '600' },
  input: {
    backgroundColor: '#ede7ff',
    borderRadius: 14,
    padding: 12,
    marginTop: 6,
    fontSize: 16,
    color: '#5f4c8c',
    borderWidth: 1,
    borderColor: '#e0d5fd',
  },
  btn: {
    backgroundColor: '#a27cf0',
    borderRadius: 14,
    padding: 16,
    marginTop: 36,
    alignItems: 'center',
    shadowColor: '#a27cf0', shadowOpacity: 0.17, shadowRadius: 5, elevation: 2,
  },
  btnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});