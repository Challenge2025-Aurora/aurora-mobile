import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import Screen from '../../components/common/Screen';
import { useAuth } from '../../auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export default function PerfilScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

  return (
    <Screen backgroundColor={colors.bg} padded>
      <Text style={[styles.title, { color: colors.primary }]}>Olá, {user?.displayName || 'usuário'}</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>{user?.email}</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('EditarPerfil')}
      >
        <Text style={[styles.buttonText, { color: colors.bg }]}>Editar informações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => signOut(auth)}
      >
        <Text style={[styles.buttonText, { color: colors.bg }]}>Sair</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '800', marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  button: { borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 12 },
  buttonText: { fontSize: 16, fontWeight: '600' },
});