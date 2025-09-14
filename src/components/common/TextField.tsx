import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function TextField({
  label,
  error,
  style,
  ...rest
}: TextFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={[styles.input, style]} {...rest} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginVertical: 8 },
  label: { fontSize: 14, marginBottom: 4, fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  error: { color: "#d33", fontSize: 13, marginTop: 4 },
});
