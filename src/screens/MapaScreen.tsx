import Screen from "../components/common/Screen";
import LoadingState from "../components/common/LoadingState";
import EmptyState from "../components/common/EmptyState";
import CurrentLocationMap from "../components/map/CurrentLocationMap";
import useCurrentLocation from "../hooks/useCurrentLocation";
import { useTheme } from "../theme";
import { useTranslation } from "../i18n";

export default function MapaScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { coords, loading, error } = useCurrentLocation();

  return (
    <Screen backgroundColor={colors.bg}>
      {loading ? (
        <LoadingState title={t("mapa.carregando_localizacao")} />
      ) : coords ? (
        <CurrentLocationMap
          coords={{ latitude: coords.latitude, longitude: coords.longitude }}
        />
      ) : (
        <EmptyState
          title={t("mapa.sem_localizacao")}
          subtitle={error ?? t("mapa.tente_novamente")}
          iconName="map-marker-off"
        />
      )}
    </Screen>
  );
}
