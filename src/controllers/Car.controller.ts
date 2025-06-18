import { Request, Response } from 'express';
import  Car  from '../models/Car.model';
import  CarDealer  from '../models/CarDealer.model';
import CarMake from '../models/CarMake.model'
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';



export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      dealerId,
      carMakeId,
      name,
      price,
      year,
      color,
      wheelsCount
    } = req.body;

    // التحقق من الحقول المطلوبة
    if (!dealerId || !carMakeId || !name || !price || !year || !color || !wheelsCount) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: ' All are required ',
      });
      return;
    }

    // تحقق من وجود التاجر
    const dealer = await CarDealer.findById(dealerId);
    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car dealer not found ',
      });
      return;
    }

    // تحقق من وجود الشركة المصنعة
    const make = await CarMake.findById(carMakeId);
    if (!make) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car make not found',
      });
      return;
    }

    // إنشاء السيارة
    const car = await Car.create({
      dealerId,
      carMakeId,
      name,
      price,
      year,
      color,
      wheelsCount
    });

    res.status(CREATED).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : ' Failed to create Car  ',
    });
  }
};


export const getCars = async (_req: Request, res: Response): Promise<void> => {
  try {
    const cars =Car.find();
    res.status(OK).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Cars',
    });
  }
};

export const getCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);
    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch car',
    });
  }
};


export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // يرجع العنصر المحدث + يفعل التحقق
    );

    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update Car',
    });
  }
};


export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const car = Car.findById(id);
    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
      });
      return;
    }

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete Car ',
    });
  }
}; 