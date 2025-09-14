import * as React from "react";
import { SectionList, Text, View, StyleSheet } from "react-native";

import type { OthersStackScreenProps, OthersStackParamList } from "../navigation/types";
import { useTheme } from "../theme";

import Screen from "../components/common/Screen";
import Overlay from "../components/common/Overlay";
import ListRow from "../components/common/ListRow";
import PrimaryButton from "../components/common/PrimaryButton";
import ConfirmDialog from "../components/common/ConfirmDialog";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type RouteName = keyof OthersStackParamList;
type Item = { 
  key: string; 
  title: string;
  route: RouteName; 
  icon: string
};

export default function OutrosScreen({ navigation }: OthersStackScreenProps<"OutrosHome">) {
  const { colors } = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const [logged, setLogged] = React.useState<boolean>(true);
  const [confirmVisible, setConfirmVisible] = React.useState(false);

  const sections: Array<{ title: string; data: Item[] }> = [
    {
      title: "Preferências",
      data: [
        { key: "idioma", title: "Mudar idioma", route: "Idioma", icon: "translate" },
        { key: "tema", title: "Mudar tema", route: "Tema", icon: "theme-light-dark" },
      ],
    },
    {
      title: "Sobre",
      data: [
        { key: "sobre", title: "Sobre o projeto", route: "Sobre", icon: "information-outline" },
        { key: "integrantes", title: "Integrantes", route: "Integrantes", icon: "account-group-outline" },
        { key: "tecnologias", title: "Tecnologias usadas", route: "Tecnologias", icon: "tools" },
      ],
    },
  ];

  const onPressLoginLogout = () => {
    if (logged) setConfirmVisible(true);
    else setLogged(true);
  };
  const confirmLogout = () => {
    setConfirmVisible(false);
    setLogged(false);
  };

  const bottomOffset = Math.max(12, tabBarHeight + insets.bottom + 12);
  const buttonHeight = 56;
  const listPaddingBottom = bottomOffset + buttonHeight + 24;

  return (
    <Screen padded backgroundColor={colors.bg}>
      <SectionList<Item>
        sections={sections}
        keyExtractor={(item) => item.key}
        contentContainerStyle={[styles.listContent, { paddingBottom: listPaddingBottom }]}
        renderSectionHeader={({ section }) => (
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <ListRow
            title={item.title}
            leftIcon={item.icon as any}
            onPress={() => navigation.navigate(item.route)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
      />

      <Overlay style={{ bottom: bottomOffset }}>
        <PrimaryButton
          label={logged ? "Sair da conta" : "Entrar"}
          onPress={onPressLoginLogout}
          style={{ width: "90%", backgroundColor: colors.primary }}
        />
      </Overlay>

      <ConfirmDialog
        visible={confirmVisible}
        title="Confirmar logout"
        message="Você tem certeza que deseja sair da sua conta?"
        onConfirm={confirmLogout}
        onCancel={() => setConfirmVisible(false)}
        confirmLabel="Sair"
        cancelLabel="Cancelar"
        icon={<MaterialCommunityIcons name="logout" size={28} color={colors.primary} />}

        overlayColor={colors.modalOverlay}
        dialogBgColor={colors.bgSecundary}
        cancelBgColor={colors.bg}
        confirmBgColor={colors.primary}
        titleColor={colors.text}
        messageColor={colors.text}
        confirmTextColor={colors.textOnPrimary}
        cancelTextColor={colors.text}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  listContent: {},
  sectionTitle: { fontSize: 13, fontWeight: "600", marginBottom: 8 },
});
