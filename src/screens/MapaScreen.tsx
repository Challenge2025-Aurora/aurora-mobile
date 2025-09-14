import Screen from "../components/common/Screen";
import LoadingState from "../components/common/LoadingState";
import EmptyState from "../components/common/EmptyState";
import CurrentLocationMap from "../components/map/CurrentLocationMap";
import useCurrentLocation from "../hooks/useCurrentLocation";
import { useTheme } from "../theme";

export default function MapaScreen() {
  const { colors } = useTheme();
  const { coords, loading, error } = useCurrentLocation();

  return (
    <Screen backgroundColor={colors.bg}>
      {loading ? (
        <LoadingState title="Carregando localização..." />
      ) : coords ? (
        <CurrentLocationMap coords={{ latitude: coords.latitude, longitude: coords.longitude }} />
      ) : (
        <EmptyState title="Sem localização" subtitle={error ?? "Tente novamente"} iconName="map-marker-off" />
      )}
    </Screen>
  );
}
