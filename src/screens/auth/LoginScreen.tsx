import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase/firebaseConfig";
import { useTheme } from "../../theme";
import Screen from "../../components/common/Screen";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from "../../navigation/AuthStack";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { colors } = useTheme();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <Screen backgroundColor={colors.bg} padded>
      <Text style={[styles.title, { color: colors.primary }]}>Entrar</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.bgSecundary, color: colors.text },
        ]}
        placeholder="Email"
        placeholderTextColor={colors.placeholder}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.bgSecundary, color: colors.text },
        ]}
        placeholder="Senha"
        placeholderTextColor={colors.placeholder}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleLogin}
      >
        <Text style={[styles.buttonText, { color: colors.bg }]}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ color: colors.primary, marginTop: 12 }}>
          Criar uma conta
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "800", marginBottom: 16 },
  input: { borderRadius: 12, padding: 12, marginBottom: 12, fontSize: 16 },
  button: { borderRadius: 12, padding: 14, alignItems: "center", marginTop: 8 },
  buttonText: { fontSize: 16, fontWeight: "600" },
});
