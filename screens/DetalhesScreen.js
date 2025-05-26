import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import MotoCard from '../components/MotoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function DetalhesScreen() {
  const [motos, setMotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [patio, setPatio] = useState('');

  useEffect(() => {
    carregarMotos();
  }, []);

  const carregarMotos = async () => {
    const data = await AsyncStorage.getItem('motos');
    setMotos(data ? JSON.parse(data) : []);
  };

  const apagarMoto = async (idx) => {
    const novasMotos = motos.filter((_, i) => i !== idx);
    await AsyncStorage.setItem('motos', JSON.stringify(novasMotos));
    setMotos(novasMotos);
  };

  const abrirEditar = (item, idx) => {
    setModelo(item.modelo);
    setPlaca(item.placa);
    setPatio(item.patio);
    setEditIndex(idx);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    if (!modelo || !placa || !patio) {
      Alert.alert('Preencha todos os campos!');
      return;
    }
    const novasMotos = motos.map((m, idx) => idx === editIndex ? { modelo, placa, patio } : m);
    await AsyncStorage.setItem('motos', JSON.stringify(novasMotos));
    setMotos(novasMotos);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={motos}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemRow}>
            <MotoCard moto={item} />
            <View style={styles.btns}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => abrirEditar(item, index)}>
                <Feather name="edit-3" size={22} color="#a27cf0" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={() => apagarMoto(index)}>
                <MaterialCommunityIcons name="trash-can-outline" size={22} color="#ffd86b" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma moto cadastrada ainda.</Text>
        }
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Editar Moto</Text>
            <TextInput style={styles.input} value={modelo} onChangeText={setModelo} placeholder="Modelo" placeholderTextColor="#bfaeeb" />
            <TextInput style={styles.input} value={placa} onChangeText={setPlaca} placeholder="Placa" placeholderTextColor="#bfaeeb" />
            <TextInput style={styles.input} value={patio} onChangeText={setPatio} placeholder="Pátio" placeholderTextColor="#bfaeeb" />
            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.btnSave} onPress={salvarEdicao}>
                <Text style={styles.btnSaveText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnCancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f7ff' },
  emptyText: { textAlign: 'center', marginTop: 60, color: '#a27cf0', fontWeight: '500', fontSize: 16 },
  itemRow: { marginBottom: 8, marginTop: 4 },
  btns: { flexDirection: 'row', position: 'absolute', top: 25, right: 35 },
  iconBtn: { marginLeft: 18, backgroundColor: '#ede7ff', borderRadius: 10, padding: 7 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.15)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', padding: 26, borderRadius: 16, width: '88%', elevation: 6, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#a27cf0', marginBottom: 18 },
  input: {
    backgroundColor: '#ede7ff',
    borderRadius: 10,
    padding: 10,
    marginTop: 9,
    width: '100%',
    fontSize: 15,
    color: '#5f4c8c',
    borderWidth: 1,
    borderColor: '#e0d5fd',
  },
  modalBtns: { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
  btnSave: { backgroundColor: '#a27cf0', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 28, marginRight: 18 },
  btnSaveText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  btnCancel: { backgroundColor: '#ffd86b', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 22 },
  btnCancelText: { color: '#a27cf0', fontSize: 16, fontWeight: 'bold' },
});