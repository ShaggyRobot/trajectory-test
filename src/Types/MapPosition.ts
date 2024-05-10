import { LatLngExpression } from "leaflet";

type MapPosition = {
  coords: LatLngExpression;
  zoomLvl: number;
};

export default MapPosition