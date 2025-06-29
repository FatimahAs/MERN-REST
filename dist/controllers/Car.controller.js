"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.getCar = exports.getCars = exports.createCar = void 0;
const Car_model_1 = __importDefault(require("../models/Car.model"));
const CarDealer_model_1 = __importDefault(require("../models/CarDealer.model"));
const CarMake_model_1 = __importDefault(require("../models/CarMake.model"));
const http_status_1 = require("../utils/http-status");
const createCar = async (req, res) => {
    try {
        const { dealerId, carMakeId, name, price, year, color, wheelsCount } = req.body;
        // التحقق من الحقول المطلوبة
        if (!dealerId || !carMakeId || !name || !price || !year || !color || !wheelsCount) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: ' All are required ',
            });
            return;
        }
        // تحقق من وجود التاجر
        const dealer = await CarDealer_model_1.default.findById(dealerId);
        if (!dealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car dealer not found ',
            });
            return;
        }
        // تحقق من وجود الشركة المصنعة
        const make = await CarMake_model_1.default.findById(carMakeId);
        if (!make) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car make not found',
            });
            return;
        }
        // إنشاء السيارة
        const car = await Car_model_1.default.create({
            dealerId,
            carMakeId,
            name,
            price,
            year,
            color,
            wheelsCount
        });
        res.status(http_status_1.CREATED).json({
            success: true,
            data: car,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : ' Failed to create Car  ',
        });
    }
};
exports.createCar = createCar;
const getCars = async (_req, res) => {
    try {
        const cars = await Car_model_1.default.find();
        res.status(http_status_1.OK).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch Cars',
        });
    }
};
exports.getCars = getCars;
const getCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car_model_1.default.findById(id);
        if (!car) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: car,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch car',
        });
    }
};
exports.getCar = getCar;
const updateCar = async (req, res) => {
    try {
        const car = await Car_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true } // يرجع العنصر المحدث + يفعل التحقق
        );
        if (!car) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: car,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update Car',
        });
    }
};
exports.updateCar = updateCar;
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = Car_model_1.default.findById(id);
        if (!car) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car not found',
            });
            return;
        }
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete Car ',
        });
    }
};
exports.deleteCar = deleteCar;
