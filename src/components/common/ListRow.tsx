import * as React from "react";
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme";

type Props = {
  title: string;
  onPress?: () => void;
  leftIcon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  style?: ViewStyle;
};

export default function ListRow({ title, onPress, leftIcon, style }: Props) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.row,
        { backgroundColor: colors.bgSecundary, borderColor: colors.border },
        style,
      ]}
    >
      <View style={styles.left}>
        {leftIcon && (
          <MaterialCommunityIcons
            name={leftIcon}
            size={22}
            color={colors.placeholder}
            style={{ marginRight: 10 }}
          />
        )}
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>

      <MaterialCommunityIcons name="chevron-right" size={22} color={colors.placeholder} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: { flexDirection: "row", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "500" },
});
