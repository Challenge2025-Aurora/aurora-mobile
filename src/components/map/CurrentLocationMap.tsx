import MapView, { Marker } from "react-native-maps";

interface Props {
  coords: { latitude: number; longitude: number };
}

export default function CurrentLocationMap({ coords }: Props) {
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
      <Marker coordinate={coords} title="Você está aqui" />
    </MapView>
  );
}
