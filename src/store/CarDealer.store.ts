import { CarDealer } from "../models/CarDealer.model";
import { generateId } from "../utils/generate-id";

const cardealers: Map<string, CarDealer> = new Map();

const create = (data: Omit<CarDealer, 'id' | 'createdAt' | 'updatedAt'>): CarDealer => {
  const id = generateId();
  const now = new Date();
  const cardealer: CarDealer = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  
  cardealers.set(id, cardealer);
  return cardealer;
}

const findAll = (): CarDealer[] => {
  return Array.from(cardealers.values());
}

const findById = (id: string): CarDealer | undefined => {
  return cardealers.get(id);
}

const findByCarDealerId = (cardealerId: string): CarDealer[] => {
  return findAll().filter(cardealer => cardealer.id === cardealerId);
}

const update = (id: string, data: Partial<Omit<CarDealer, 'id' | 'cardealerId' | 'createdAt'>>): CarDealer | undefined => {
  const cardealer = cardealers.get(id);
  if (!cardealer) return undefined;

  const updatedCarDealer: CarDealer = {
    ...cardealer,
    ...data,
    updatedAt: new Date(),
  };

  cardealers.set(id, updatedCarDealer);
  return updatedCarDealer;
}

const deleteCarDealers = (id: string): boolean => {
  return cardealers.delete(id);
}


const deleteByCarDealersId = (cardealerId: string): void => {
  const cardealerToDelete = findByCarDealerId(cardealerId);
  cardealerToDelete.forEach(cardealer => cardealers.delete(cardealer.id));
}

export const cardealerStore = {
  create,
  findAll,
  findById,
  findByCarDealerId,
  update,
  delete: deleteCarDealers,
  deleteByCarDealersId,
};