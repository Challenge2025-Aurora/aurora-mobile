import { KeyboardAvoidingView, Platform } from "react-native";
import Screen from "../components/common/Screen";
import MotoForm from "../components/motos/MotoForm";
import useMotos from "../hooks/useMotos";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../navigation/types";
import { useTheme } from "../theme";
import { useTranslation } from "../i18n";

type Props = NativeStackScreenProps<MainStackParamList, "Formulario">;

export default function FormularioScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { add } = useMotos();

  return (
    <Screen backgroundColor={colors.bg} padded>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <MotoForm
          submitLabel={t("formulario.salvar")}
          onSubmit={async (m) => {
            await add(m);
            navigation.goBack();
          }}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
}
