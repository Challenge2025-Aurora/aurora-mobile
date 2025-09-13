import { useEffect, useState } from "react";
import {
  View, FlatList, StyleSheet, Text, TouchableOpacity, Modal, TextInput, Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import MotoCard from "../components/MotoCard";
import type { Moto } from "../types/moto";
import { useTheme } from "../context/ThemeContext";

export default function DetalhesScreen() {
  const { colors } = useTheme();
  const [motos, setMotos] = useState<Moto[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [patio, setPatio] = useState("");

  useEffect(() => { void carregarMotos(); }, []);
  const carregarMotos = async () => {
    const data = await AsyncStorage.getItem("motos");
    setMotos(data ? JSON.parse(data) : []);
  };

  const apagarMoto = async (idx: number) => {
    const novasMotos = motos.filter((_, i) => i !== idx);
    await AsyncStorage.setItem("motos", JSON.stringify(novasMotos));
    setMotos(novasMotos);
  };

  const abrirEditar = (item: Moto, idx: number) => {
    setModelo(item.modelo); setPlaca(item.placa); setPatio(item.patio);
    setEditIndex(idx); setModalVisible(true);
  };

  const salvarEdicao = async () => {
    if (!modelo || !placa || !patio || editIndex == null) {
      Alert.alert("Preencha todos os campos!"); return;
    }
    const novasMotos = motos.map((m, idx) => idx === editIndex ? { modelo, placa, patio } : m);
    await AsyncStorage.setItem("motos", JSON.stringify(novasMotos));
    setMotos(novasMotos); setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <FlatList
        data={motos}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemRow}>
            <MotoCard moto={item} />
            <View style={styles.btns}>
              <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.bgSecundary }]} onPress={() => abrirEditar(item, index)}>
                <Feather name="edit-3" size={22} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.bgSecundary }]} onPress={() => apagarMoto(index)}>
                <MaterialCommunityIcons name="trash-can-outline" size={22} color={colors.accent} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.primary }]}>
            Nenhuma moto cadastrada ainda.
          </Text>
        }
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={[styles.modalBg, { backgroundColor: colors.modalOverlay }]}>
          <View style={[styles.modal, { backgroundColor: colors.bgSecundary }]}>
            <Text style={[styles.modalTitle, { color: colors.primary }]}>Editar Moto</Text>

            <TextInput
              style={[styles.input, { backgroundColor: colors.bgSecundary, color: colors.text, borderColor: colors.border }]}
              value={modelo} onChangeText={setModelo} placeholder="Modelo" placeholderTextColor={colors.placeholder}
            />
            <TextInput
              style={[styles.input, { backgroundColor: colors.bgSecundary, color: colors.text, borderColor: colors.border }]}
              value={placa} onChangeText={setPlaca} placeholder="Placa" placeholderTextColor={colors.placeholder}
            />
            <TextInput
              style={[styles.input, { backgroundColor: colors.bgSecundary, color: colors.text, borderColor: colors.border }]}
              value={patio} onChangeText={setPatio} placeholder="Pátio" placeholderTextColor={colors.placeholder}
            />

            <View style={styles.modalBtns}>
              <TouchableOpacity style={[styles.btnSave, { backgroundColor: colors.primary }] } onPress={salvarEdicao}>
                <Text style={[styles.btnSaveText, { color: colors.textOnPrimary }]}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnCancel, { backgroundColor: colors.accent }]} onPress={() => setModalVisible(false)}>
                <Text style={[styles.btnCancelText, { color: colors.primary }]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyText: { textAlign: "center", marginTop: 60, fontWeight: "500", fontSize: 16 },
  itemRow: { marginBottom: 8, marginTop: 4 },
  btns: { flexDirection: "row", position: "absolute", top: 25, right: 35 },
  iconBtn: { marginLeft: 18, borderRadius: 10, padding: 7 },
  modalBg: { flex: 1, justifyContent: "center", alignItems: "center" },
  modal: { padding: 26, borderRadius: 16, width: "88%", elevation: 6, alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 18 },
  input: { borderRadius: 10, padding: 10, marginTop: 9, width: "100%", fontSize: 15, borderWidth: 1 },
  modalBtns: { flexDirection: "row", justifyContent: "center", marginTop: 22 },
  btnSave: { borderRadius: 10, paddingVertical: 10, paddingHorizontal: 28, marginRight: 18 },
  btnSaveText: { fontSize: 16, fontWeight: "bold" },
  btnCancel: { borderRadius: 10, paddingVertical: 10, paddingHorizontal: 22 },
  btnCancelText: { fontSize: 16, fontWeight: "bold" },
});
