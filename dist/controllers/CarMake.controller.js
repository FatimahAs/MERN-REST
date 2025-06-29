"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarMake = exports.updateCarMakes = exports.getCarMake = exports.getCarMakes = exports.createCarMake = void 0;
const CarMake_model_1 = __importDefault(require("../models/CarMake.model"));
const http_status_1 = require("../utils/http-status");
const createCarMake = async (req, res) => {
    try {
        const { country, brand } = req.body;
        // تحقق من الحقول المطلوبة
        if (!country || !brand) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'Country and Brand  are required',
            });
            return;
        }
        const make = await CarMake_model_1.default.create({
            country,
            brand
        });
        res.status(http_status_1.CREATED).json({
            success: true,
            data: make,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create Make',
        });
    }
};
exports.createCarMake = createCarMake;
const getCarMakes = async (req, res) => {
    try {
        const makes = await CarMake_model_1.default.find(); // جلب كل car makes
        res.status(http_status_1.OK).json({
            success: true,
            data: makes,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch Makes',
        });
    }
};
exports.getCarMakes = getCarMakes;
const getCarMake = async (req, res) => {
    try {
        const { id } = req.params;
        const make = await CarMake_model_1.default.findById(id);
        if (!make) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car Make not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: make,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch Make',
        });
    }
};
exports.getCarMake = getCarMake;
const updateCarMakes = async (req, res) => {
    try {
        const { id } = req.params;
        const { country, brand } = req.body;
        const make = await CarMake_model_1.default.findById(id);
        if (!make) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Dealer not found',
            });
            return;
        }
        // تحديث القيم إذا كانت موجودة في الطلب
        if (country !== undefined)
            make.country = country;
        if (brand !== undefined)
            make.brand = brand;
        res.status(http_status_1.OK).json({
            success: true,
            data: make,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update Make',
        });
    }
};
exports.updateCarMakes = updateCarMakes;
const deleteCarMake = async (req, res) => {
    try {
        const { id } = req.params;
        const carmake = CarMake_model_1.default.findById(id);
        if (!carmake) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car Dealer not found',
            });
            return;
        }
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete Car Make',
        });
    }
};
exports.deleteCarMake = deleteCarMake;
