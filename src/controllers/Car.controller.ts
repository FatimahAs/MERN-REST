import { Request, Response } from 'express';
import { CarStore } from '../store/Car.store';
import { cardealerStore } from '../store/CarDealer.store';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';

export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description = '' } = req.body;

    if (!title) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'Title is required',
      });
      return;
    }

    const car = CarStore.create({ title, description });
    res.status(CREATED).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create list',
    });
  }
};

export const getCars = async (_req: Request, res: Response): Promise<void> => {
  try {
    const lists = listStore.findAll();
    res.status(OK).json({
      success: true,
      data: lists,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch lists',
    });
  }
};

export const getCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = listStore.findById(req.params.id);
    if (!list) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'List not found',
      });
      return;
    }

    const items = itemStore.findByListId(list.id);
    res.status(OK).json({
      success: true,
      data: {
        ...list,
        items,
      },
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch list',
    });
  }
};

export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = listStore.update(req.params.id, req.body);
    if (!list) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'List not found',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: list,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update list',
    });
  }
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = listStore.delete(req.params.id);
    if (!deleted) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'List not found',
      });
      return;
    }

    // Delete all items in the list
    itemStore.deleteByListId(req.params.id);

    res.status(OK).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete list',
    });
  }
}; 