import { useState } from "react";
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import type { Moto } from "../types/moto";

import { useTheme } from "../theme/index";

type Props = NativeStackScreenProps<RootStackParamList, "Formulario">;

export default function FormularioScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [patio, setPatio] = useState("");

  const salvar = async () => {
    if (!modelo || !placa || !patio) {
      Alert.alert("Preencha todos os campos!");
      return;
    }
    const novaMoto: Moto = { modelo, placa, patio };
    const dadosAntigos = await AsyncStorage.getItem("motos");
    const lista: Moto[] = dadosAntigos ? JSON.parse(dadosAntigos) : [];
    lista.push(novaMoto);
    await AsyncStorage.setItem("motos", JSON.stringify(lista));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={[styles.label, { color: colors.primary }]}>Modelo:</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.bgSecundary, color: colors.text, borderColor: colors.border }
        ]}
        value={modelo}
        onChangeText={setModelo}
        placeholder="Ex: Sport 110i"
        placeholderTextColor={colors.placeholder}
      />

      <Text style={[styles.label, { color: colors.primary }]}>Placa:</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.bgSecundary, color: colors.text, borderColor: colors.border }
        ]}
        value={placa}
        onChangeText={setPlaca}
        placeholder="Ex: ABC-1234"
        placeholderTextColor={colors.placeholder}
      />

      <Text style={[styles.label, { color: colors.primary }]}>Pátio:</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.bgSecundary, color: colors.text, borderColor: colors.border }
        ]}
        value={patio}
        onChangeText={setPatio}
        placeholder="Ex: Centro-SP"
        placeholderTextColor={colors.placeholder}
      />

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: colors.primary, shadowColor: colors.shadow }]}
        onPress={salvar}
      >
        <Text style={[styles.btnText, { color: colors.textOnPrimary }]}>Salvar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  label: { fontSize: 16, marginTop: 20, fontWeight: "600" },
  input: {
    borderRadius: 14,
    padding: 12,
    marginTop: 6,
    fontSize: 16,
    borderWidth: 1,
  },
  btn: {
    borderRadius: 14,
    padding: 16,
    marginTop: 36,
    alignItems: "center",
    shadowOpacity: 0.17,
    shadowRadius: 5,
    elevation: 2,
  },
  btnText: { fontSize: 17, fontWeight: "bold" },
});
