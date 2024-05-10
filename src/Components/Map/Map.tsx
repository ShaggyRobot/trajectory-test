import { renderToString } from "react-dom/server";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { LatLngExpression } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import CarSvg from "./CarSvg";

import Car from "../../Types/Car";
import MapPosition from "../../Types/MapPosition";

import "./Map.scss";

type TProps = {
  cars: Car[];
  mapPosition: MapPosition;
  setMapRef: (position: MapPosition) => void;
};

export default function Map({ cars, mapPosition, setMapRef }: TProps) {
  const { coords, zoomLvl } = mapPosition;

  const SetCoords = ({ coords }: { coords: LatLngExpression }) => {
    const map = useMap();
    map.setView(coords, zoomLvl);

    return null;
  };

  const MapEvtHandlers = () => {
    const mapEvents = useMapEvents({
      moveend: () => {
        setMapRef({
          coords: mapEvents.getCenter(),
          zoomLvl: mapEvents.getZoom(),
        });
      },
    });

    return null;
  };

  return (
    <div className="map-wrapper">
      <MapContainer center={coords}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup chunkedLoading>
          {cars.map((car) => (
            <Marker
              key={car.id}
              position={[car.latitude, car.longitude]}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
              }}
              icon={L.divIcon({
                className: "car-icon",
                html: renderToString(<CarSvg color={car.color} />),
              })}
            >
              <Popup>
                {`${car.year} ${car.color} ${car.name} ${car.model}`}
                <br />
                {`${car.price}$`}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        <SetCoords coords={coords} />
        <MapEvtHandlers />
      </MapContainer>
    </div>
  );
}
