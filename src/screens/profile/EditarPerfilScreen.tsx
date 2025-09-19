import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../theme';
import Screen from '../../components/common/Screen';
import { useAuth } from '../../auth/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export default function EditarPerfilScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [nome, setNome] = useState(user?.displayName || '');

  const handleSave = async () => {
    try {
      await updateProfile(auth.currentUser!, { displayName: nome });
      Alert.alert('Sucesso', 'Nome atualizado com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <Screen backgroundColor={colors.bg} padded>
      <Text style={[styles.title, { color: colors.primary }]}>Editar Nome</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.bgSecundary, color: colors.text }]}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor={colors.placeholder}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleSave}
      >
        <Text style={[styles.buttonText, { color: colors.bg }]}>Salvar</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '800', marginBottom: 16 },
  input: { borderRadius: 12, padding: 12, marginBottom: 12, fontSize: 16 },
  button: { borderRadius: 12, padding: 14, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: '600' },
});
