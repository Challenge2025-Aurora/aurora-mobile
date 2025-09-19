import * as React from "react";
import { View } from "react-native";
import Screen from "../../components/common/Screen";
import EmptyState from "../../components/common/EmptyState";
import { useTheme } from "../../theme";
import { useTranslation } from "../../i18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../../navigation/types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function MapaScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const title = (t("mapa.em_breve_titulo") as string) ?? "Em breve";
  const subtitle =
    (t("mapa.em_breve_subtitulo") as string) ??
    "Estamos construindo esta funcionalidade. Volte mais tarde!";

  return (
    <Screen backgroundColor={colors.bg} padded>
      <EmptyState
        title={title}
        subtitle={subtitle}
        iconName="clock-outline"
      />

      <View style={{ marginTop: 16, alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={[
            styles.btn,
            { backgroundColor: colors.accent, shadowColor: colors.shadow },
          ]}
          activeOpacity={0.9}
        >
          <MaterialCommunityIcons name="home-variant-outline" size={18} color={colors.bgSecundary} />
          <Text style={[styles.btnText, { color: colors.bgSecundary }]}>
            {(t("comum.voltar_home") as string) ?? "Ir para a Home"}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  btnText: { fontWeight: "800" },
});
