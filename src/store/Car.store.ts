import { Car } from "../models/Car.model";
import { generateId } from "../utils/generate-id";

const cars: Map<string, Car> = new Map();

const create = (data: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Car => {
  const id = generateId();
  const now = new Date();
  const car: Car = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  
  cars.set(id, car);
  return car;
}

const findAll = (): Car[] => {
  return Array.from(cars.values());
}

const findById = (id: string): Car | undefined => {
  return cars.get(id);
}

const update = (id: string, data: Partial<Omit<Car, 'id' | 'createdAt'>>): Car | undefined => {
  const car = cars.get(id);
  if (!car) return undefined;

  const updatedCar: Car = {
    ...car,
    ...data,
    updatedAt: new Date(),
  };

  cars.set(id, updatedCar);
  return updatedCar;
}

const deleteCar = (id: string): boolean => {
  return cars.delete(id);
}

export const CarStore = {
  create,
  findAll,
  findById,
  update,
  delete: deleteCar,
};