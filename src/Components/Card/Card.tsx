import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Car from "../../Types/Car";

import "./Card.scss";

type TProps = {
  car: Car;
  onDelete: (car: Car) => void;
  centerCar: (car: Car) => void;
  editCar: (car: Car) => void;
};

type FormInputs = {
  name: string;
  model: string;
  price: number;
};

function Card({ car, onDelete, centerCar, editCar }: TProps) {
  const [edit, setEdit] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setEdit(false);
    editCar({
      ...car,
      ...data,
    });
  };

  return (
    <div className="card">
      <span>{car.year}</span>
      {edit ? (
        <form onSubmit={handleSubmit(onSubmit)} className="card__form">
          <input
            className="card__input"
            defaultValue={car.name}
            {...register("name")}
            type="text"
          />
          <input
            className="card__input"
            defaultValue={car.model}
            {...register("model")}
            type="text"
          />
          <input
            className="card__input"
            pattern="\d*"
            defaultValue={car.price}
            {...register("price", { valueAsNumber: true })}
            type="number"
          />
        </form>
      ) : (
        <>
          <span>{car.name}</span>
          <span>{car.model}</span>
          <span>{car.price}$</span>
        </>
      )}

      <div className="card__btn_block">
        <button className="card__btn" onClick={() => centerCar(car)}>
          Show on map
        </button>

        {edit ? (
          <button onClick={handleSubmit(onSubmit)}>Submit</button>
        ) : (
          <button onClick={() => setEdit(true)}>Edit</button>
        )}

        <button className="card__btn" onClick={() => onDelete(car)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export { Card };
