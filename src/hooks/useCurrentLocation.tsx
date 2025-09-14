import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function useCurrentLocation() {
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== Location.PermissionStatus.GRANTED) {
          setError("Permissão negada para acessar localização");
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setCoords(loc.coords);
      } catch (e) {
        setError("Erro ao obter localização");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { coords, loading, error };
}
