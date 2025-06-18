import { Request, Response } from 'express';
import { carmakeStore } from '../store/CarMake.store';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';


export const createMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country, brand } = req.body;

    // تحقق من الحقول المطلوبة
    if (!country || !brand ) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'Country and Brand  are required',
      });
      return;
    }

    const make = await carmakeStore.create({
      country,
      brand
    });

    res.status(CREATED).json({
      success: true,
      data: make,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create Make',
    });
  }
};



export const getMakes = async (req: Request, res: Response): Promise<void> => {
  try {
    const makes = await carmakeStore.findAll(); // جلب كل car makes

    res.status(OK).json({
      success: true,
      data: makes,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Makes',
    });
  }
};


export const getMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const make = await carmakeStore.findById(id);
    if (!make) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car Make not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: make,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Make',
    });
  }
};



export const updateMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { country, brand } = req.body;

    const make = await carmakeStore.findById(id);
    if (!make) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Dealer not found',
      });
      return;
    }

    // تحديث القيم إذا كانت موجودة في الطلب
    if (country !== undefined) make.country = country;
    if (brand !== undefined) make.brand = brand;
  

  

    res.status(OK).json({
      success: true,
      data: make,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update Make',
    });
  }
};


export const deleteMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const carmake = carmakeStore.findById(id);
    if (!carmake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car Dealer not found',
      });
      return;
    }

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete Car Make',
    });
  }
}; 