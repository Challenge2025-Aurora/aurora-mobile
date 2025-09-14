import { Modal, View, StyleSheet } from "react-native";
import MotoForm from "./MotoForm";
import type { Moto } from "../../types/moto";

interface Props {
  visible: boolean;
  initialMoto?: Moto;
  onClose: () => void;
  onSave: (moto: Moto) => void;
}

export default function EditMotoModal({
  visible,
  initialMoto,
  onClose,
  onSave,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <MotoForm
            defaultValues={initialMoto}
            onSubmit={(m) => {
              onSave(m);
              onClose();
            }}
            submitLabel="Salvar"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    width: "88%",
    borderRadius: 16,
    backgroundColor: "white",
    padding: 20,
    elevation: 6,
  },
});
