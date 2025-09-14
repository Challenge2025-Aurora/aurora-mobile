import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export default function IdiomaScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.wrap, { backgroundColor: colors.bg }]}>
      <Text style={{ color: colors.text, fontSize: 16 }}>Tela de Idioma (placeholder)</Text>
    </View>
  );
}
const styles = StyleSheet.create({ wrap: { flex: 1, alignItems: 'center', justifyContent: 'center' }});
