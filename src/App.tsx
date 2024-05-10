import { useEffect, useRef, useState } from "react";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import useFetch from "./Hooks/useFetch";

import { Card } from "./Components/Card/Card";
import Map from "./Components/Map/Map";

import MapPosition from "./Types/MapPosition";
import sortTypes from "./Types/SortTypes";
import sortCars from "./Utils/SortCars";
import Car from "./Types/Car";

import "./App.scss";

const url = "https://test.tspb.su/test-task/vehicles";

const initialMapPosition: MapPosition = {
  coords: [58.205267, 33.38558],
  zoomLvl: 5,
};

function App() {
  const { data, isLoading, error } = useFetch<Car[]>(url);
  const [cars, setCars] = useState<Car[] | null>(null);
  const [sort, setSort] = useState<sortTypes | null>(null);

  const [mapPosition, setMapPosition] =
    useState<MapPosition>(initialMapPosition);

  const mapPosRef = useRef<MapPosition>(initialMapPosition);

  useEffect(() => {
    if (data) {
      !cars && setCars(data);
    }
  }, [data, sort]);

  const sortByYear = () => {
    setSort(sort === "year_asc" ? "year_dsc" : "year_asc");
    setMapPosition(mapPosRef.current);
  };

  const sortByPrice = () => {
    setSort(sort === "price_asc" ? "price_dsc" : "price_asc");
    setMapPosition(mapPosRef.current);
  };

  const editCar = (newCar: Car) => {
    setCars(
      (cars) =>
        cars &&
        cars.map((car) => {
          if (car.id === newCar.id) {
            return newCar;
          }
          return car;
        })
    );
    setMapPosition(mapPosRef.current);
  };

  const centerCar = (car: Car) => {
    const coords: LatLngExpression = [car.latitude, car.longitude];
    setMapPosition({ coords, zoomLvl: 15 });
  };

  const onDelete = (car: Car) => {
    setCars((cars) => cars && cars.filter((c) => c.id !== car.id));
    setMapPosition(mapPosRef.current);
  };

  const setMapRef = (position: MapPosition) => {
    mapPosRef.current = position;
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="App">
      {cars && (
        <>
          <div className="cars-list-wrapper">
            <div className="cars-list">
              <div className="cars-list__sort">
                <button className="sort__btn" onClick={() => sortByYear()}>
                  Sort by year{" "}
                  {sort === "year_asc" ? "↑" : sort === "year_dsc" ? "↓" : ""}
                </button>

                <button className="sort__btn" onClick={() => sortByPrice()}>
                  Sort by price{" "}
                  {sort === "price_asc" ? "↑" : sort === "price_dsc" ? "↓" : ""}
                </button>
              </div>

              {sortCars(cars, sort).map((item) => (
                <Card
                  key={item.id}
                  car={item}
                  onDelete={onDelete}
                  centerCar={centerCar}
                  editCar={editCar}
                />
              ))}
            </div>
          </div>
          <Map
            cars={cars || []}
            mapPosition={mapPosition}
            setMapRef={setMapRef}
          />
        </>
      )}
    </div>
  );
}

export default App;
