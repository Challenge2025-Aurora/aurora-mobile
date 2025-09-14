import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export default function IntegrantesScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.wrap, { backgroundColor: colors.bg, padding: 16 }]}>
      <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 8 }}>
        Integrantes (placeholder)
      </Text>
      <Text style={{ color: colors.text }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur ratione ad quis rerum. Deserunt, nesciunt distinctio? Quod, rem aperiam nobis, sit officiis velit totam iure architecto provident esse itaque quasi!
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({ wrap: { flex: 1 }});
