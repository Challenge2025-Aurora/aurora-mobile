import { View } from "react-native";
import { useState } from "react";
import TextField from "../common/TextField";
import PrimaryButton from "../common/PrimaryButton";
import type { Moto } from "../../types/domain";

interface Props {
  defaultValues?: Partial<Moto>;
  onSubmit: (moto: Moto) => void;
  submitLabel?: string;
}

export default function MotoForm({
  defaultValues,
  onSubmit,
  submitLabel = "Salvar",
}: Props) {
  const [modelo, setModelo] = useState(defaultValues?.modelo ?? "");
  const [placa, setPlaca] = useState(defaultValues?.placa ?? "");
  const [patio, setPatio] = useState(defaultValues?.patio ?? "");

  return (
    <View>
      <TextField
        label="Modelo"
        value={modelo}
        onChangeText={setModelo}
        placeholder="Ex: Sport 110i"
      />
      <TextField
        label="Placa"
        value={placa}
        onChangeText={setPlaca}
        placeholder="Ex: ABC-1234"
      />
      <TextField
        label="Pátio"
        value={patio}
        onChangeText={setPatio}
        placeholder="Ex: Centro-SP"
      />
      <PrimaryButton
        label={submitLabel}
        onPress={() => onSubmit({ modelo, placa, patio })}
      />
    </View>
  );
}
