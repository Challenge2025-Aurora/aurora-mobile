import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão de Motos - Pátio Mottu</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#ede7ff' }]}
          onPress={() => navigation.navigate('Formulario')}
        >
          <Feather name="plus-circle" size={32} color="#a27cf0" />
          <Text style={styles.label}>Cadastrar Moto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#ffd86b' }]}
          onPress={() => navigation.navigate('Mapa')}
        >
          <MaterialCommunityIcons name="map-marker-radius-outline" size={32} color="#a27cf0" />
          <Text style={styles.label}>Mapa do Pátio</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#ede7ff' }]}
          onPress={() => navigation.navigate('Camera')}
        >
          <MaterialCommunityIcons name="camera-outline" size={32} color="#a27cf0" />
          <Text style={styles.label}>Câmera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#ffd86b' }]}
          onPress={() => navigation.navigate('Detalhes')}
        >
          <Entypo name="list" size={32} color="#a27cf0" />
          <Text style={styles.label}>Visualizar Motos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f7ff', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#a27cf0', marginBottom: 36, textAlign: 'center' },
  row: { flexDirection: 'row', marginBottom: 24 },
  card: {
    flex: 1,
    height: 130,
    marginHorizontal: 14,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#a27cf0',
    shadowOpacity: 0.14,
    shadowRadius: 6,
    minWidth: 150,
    maxWidth: 180,
  },
  label: { marginTop: 12, fontSize: 16, fontWeight: '600', color: '#5f4c8c' },
});