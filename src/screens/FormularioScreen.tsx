import { KeyboardAvoidingView, Platform } from "react-native";
import Screen from "../components/common/Screen";
import MotoForm from "../components/motos/MotoForm";
import useMotos from "../hooks/useMotos";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../navigation/types";
import { useTheme } from "../theme";

type Props = NativeStackScreenProps<MainStackParamList, "Formulario">;

export default function FormularioScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { add } = useMotos();

  return (
    <Screen backgroundColor={colors.bg} padded>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <MotoForm
          submitLabel="Salvar"
          onSubmit={async (m) => {
            await add(m);
            navigation.goBack();
          }}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
}