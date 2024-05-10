import Car from "../Types/Car";
import sortTypes from "../Types/SortTypes";

const sortCars = (cars: Car[], sortingCriteria: sortTypes | null): Car[] => {
  switch (sortingCriteria) {
    case "price_asc":
      return cars.sort((a, b) => a.price - b.price);

    case "price_dsc":
      return cars.sort((a, b) => b.price - a.price);

    case "year_asc":
      return cars.sort((a, b) => a.year - b.year);

    case "year_dsc":
      return cars.sort((a, b) => b.year - a.year);

    default:
      return cars;
  }
};

export default sortCars;
