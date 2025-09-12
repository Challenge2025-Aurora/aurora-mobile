import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapaScreen() {
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        Alert.alert("Permissão negada para acessar localização");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setCoords(loc.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {coords ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: coords.latitude,
              longitude: coords.longitude,
            }}
            title="Você está aqui"
          />
        </MapView>
      ) : (
        <View style={styles.center}>
          <Text style={styles.text}>Carregando localização...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f7ff" },
  map: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { color: "#a27cf0", fontSize: 18, fontWeight: "bold" },
});
