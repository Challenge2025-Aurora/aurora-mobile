import { View, StyleSheet } from "react-native";
import IconButton from "../common/IconButton";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import MotoCard from "./MotoCard";
import type { Moto } from "../../types/moto";
import { useTheme } from "../../theme";

interface Props {
  moto: Moto;
  onEdit: () => void;
  onDelete: () => void;
}

export default function MotoListItem({ moto, onEdit, onDelete }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.row}>
      <MotoCard moto={moto} />
      <View style={styles.actions}>
        <IconButton
          icon={<Feather name="edit-3" size={22} color={colors.primary} />}
          onPress={onEdit}
          style={{ backgroundColor: colors.bgSecundary }}
        />
        <IconButton
          icon={
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={22}
              color={colors.accent}
            />
          }
          onPress={onDelete}
          style={{ backgroundColor: colors.bgSecundary, marginLeft: 12 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { marginVertical: 4 },
  actions: { flexDirection: "row", position: "absolute", right: 30, top: 24 },
});
