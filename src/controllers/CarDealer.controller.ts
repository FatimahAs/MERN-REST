import { Request, Response } from 'express';
import { cardealerStore } from '../store/CarDealer.store';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';


export const createDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, city } = req.body;

    // تحقق من الحقول المطلوبة
    if (!name || !email || !city) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'Name, email, and city are required',
      });
      return;
    }

    const dealer = await cardealerStore.create({
      name,
      email,
      city
    });

    res.status(CREATED).json({
      success: true,
      data: dealer,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create dealer',
    });
  }
};



export const getDealers = async (req: Request, res: Response): Promise<void> => {
  try {
    const dealers = await cardealerStore.findAll(); // جلب كل الديلرز

    res.status(OK).json({
      success: true,
      data: dealers,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch dealers',
    });
  }
};


export const getDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const dealer = await cardealerStore.findById(id);
    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car Dealer not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: dealer,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch dealer',
    });
  }
};



export const updateDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, city } = req.body;

    const dealer = await cardealerStore.findById(id);
    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Dealer not found',
      });
      return;
    }

    // تحديث القيم إذا كانت موجودة في الطلب
    if (name !== undefined) dealer.name = name;
    if (email !== undefined) dealer.email = email;
    if (city !== undefined) dealer.city = city;

  

    res.status(OK).json({
      success: true,
      data: dealer,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update dealer',
    });
  }
};


export const deleteDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cardealer = cardealerStore.findById(id);
    if (!cardealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car Dealer not found',
      });
      return;
    }

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete Car Dealer',
    });
  }
}; 