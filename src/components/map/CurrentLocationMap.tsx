import MapView, { Marker } from "react-native-maps";
import { useTranslation } from "../../i18n";

interface Props {
  coords: { latitude: number; longitude: number };
}

export default function CurrentLocationMap({ coords }: Props) {
  const { t } = useTranslation();
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={coords} title={t("mapa.voce_esta_aqui")} />
    </MapView>
  );
}
