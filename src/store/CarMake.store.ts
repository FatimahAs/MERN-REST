import { CarMake } from "../models/CarMake.model";
import { generateId } from "../utils/generate-id";

const carmakes: Map<string, CarMake> = new Map();

const create = (data: Omit<CarMake, 'id' | 'createdAt' | 'updatedAt'>): CarMake => {
  const id = generateId();
  const now = new Date();
  const carmake: CarMake = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  
  carmakes.set(id, carmake);
  return carmake;
}

const findAll = (): CarMake[] => {
  return Array.from(carmakes.values());
}

const findById = (id: string): CarMake | undefined => {
  return carmakes.get(id);
}

const update = (id: string, data: Partial<Omit<CarMake, 'id' | 'createdAt'>>): CarMake | undefined => {
  const carmake = carmakes.get(id);
  if (!carmake) return undefined;

  const updatedcarmake: CarMake = {
    ...carmake,
    ...data,
    updatedAt: new Date(),
  };

  carmakes.set(id, updatedcarmake);
  return updatedcarmake;
}

const deletecarmake = (id: string): boolean => {
  return carmakes.delete(id);
}

export const carmakeStore = {
  create,
  findAll,
  findById,
  update,
  delete: deletecarmake,
};