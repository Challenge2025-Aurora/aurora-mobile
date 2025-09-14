import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ReactNode } from "react";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: ReactNode;
}

export default function ConfirmDialog({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  icon,
}: ConfirmDialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {icon}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.btn, styles.cancel]}
              onPress={onCancel}
            >
              <Text style={styles.btnText}>{cancelLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.confirm]}
              onPress={onConfirm}
            >
              <Text style={[styles.btnText, styles.confirmText]}>
                {confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
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
  dialog: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: { fontSize: 15, textAlign: "center", marginBottom: 20 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  btn: {
    flex: 1,
    padding: 12,
    marginHorizontal: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  cancel: { backgroundColor: "#eee" },
  confirm: { backgroundColor: "#a27cf0" },
  btnText: { fontSize: 15, fontWeight: "500" },
  confirmText: { color: "white" },
});
