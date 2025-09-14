import { useState } from "react";
import Screen from "../components/common/Screen";
import LoadingState from "../components/common/LoadingState";
import ConfirmDialog from "../components/common/ConfirmDialog";
import MotoList from "../components/motos/MotoList";
import EditMotoModal from "../components/motos/EditMotoModal";
import useMotos from "../hooks/useMotos";
import useBoolean from "../hooks/useBoolean";
import type { Moto } from "../types/moto";
import { useTheme } from "../theme";

export default function DetalhesScreen() {
  const { colors } = useTheme();
  const { motos, loading, update, remove } = useMotos();

  const editOpen = useBoolean(false);
  const confirmOpen = useBoolean(false);
  const [editing, setEditing] = useState<{ idx?: number; moto?: Moto }>({});
  const [toDelete, setToDelete] = useState<number | null>(null);

  return (
    <Screen backgroundColor={colors.bg} padded>
      {loading ? (
        <LoadingState title="Carregando..." />
      ) : (
        <MotoList
          data={motos}
          onEdit={(m, idx) => {
            setEditing({ idx, moto: m });
            editOpen.setTrue();
          }}
          onDelete={(idx) => {
            setToDelete(idx);
            confirmOpen.setTrue();
          }}
        />
      )}

      <EditMotoModal
        visible={editOpen.value}
        initialMoto={editing.moto}
        onClose={editOpen.setFalse}
        onSave={(m) => {
          if (editing.idx != null) update(editing.idx, m);
        }}
      />

      <ConfirmDialog
        visible={confirmOpen.value}
        title="Excluir moto"
        message="Tem certeza que deseja excluir esta moto?"
        onCancel={() => {
          confirmOpen.setFalse();
          setToDelete(null);
        }}
        onConfirm={() => {
          if (toDelete != null) remove(toDelete);
          confirmOpen.setFalse();
          setToDelete(null);
        }}
      />
    </Screen>
  );
}
