import { FlatList, Text, StyleSheet } from "react-native";
import type { Moto } from "../../types/moto";
import MotoListItem from "./MotoListItem";
import EmptyState from "../common/EmptyState";

interface Props {
  data: Moto[];
  onEdit: (moto: Moto, idx: number) => void;
  onDelete: (idx: number) => void;
}

export default function MotoList({ data, onEdit, onDelete }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.placa}
      renderItem={({ item, index }) => (
        <MotoListItem
          moto={item}
          onEdit={() => onEdit(item, index)}
          onDelete={() => onDelete(index)}
        />
      )}
      ListEmptyComponent={
        <EmptyState
          title="Nenhuma moto cadastrada ainda."
          iconName="motorbike"
        />
      }
      contentContainerStyle={data.length === 0 && styles.empty}
    />
  );
}

const styles = StyleSheet.create({
  empty: { flexGrow: 1, justifyContent: "center" },
});
