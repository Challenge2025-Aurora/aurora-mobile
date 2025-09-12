import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MotoCard({ moto, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <MaterialCommunityIcons name="motorbike" size={36} color="#ffd86b" />
        <View style={styles.info}>
          <Text style={styles.titulo}>{moto.modelo}</Text>
          <Text style={styles.placa}>{moto.placa}</Text>
        </View>
      </View>
      <Text style={styles.localizacao}>Pátio: {moto.patio}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ede7ff',
    padding: 18,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#a27cf0',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  info: { marginLeft: 16 },
  titulo: { fontSize: 20, color: '#a27cf0', fontWeight: 'bold' },
  placa: { fontSize: 14, color: '#888', marginTop: 4 },
  localizacao: { color: '#bfaeeb', marginTop: 10, fontSize: 12, fontWeight: '500' }
});