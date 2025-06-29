"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDealer = exports.updateDealer = exports.getDealer = exports.getDealers = exports.createDealer = void 0;
const CarDealer_model_1 = __importDefault(require("../models/CarDealer.model"));
const http_status_1 = require("../utils/http-status");
const createDealer = async (req, res) => {
    try {
        const { name, email, city } = req.body;
        // تحقق من الحقول المطلوبة
        if (!name || !email || !city) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'Name, email, and city are required',
            });
            return;
        }
        const dealer = await CarDealer_model_1.default.create({
            name,
            email,
            city
        });
        res.status(http_status_1.CREATED).json({
            success: true,
            data: dealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create dealer',
        });
    }
};
exports.createDealer = createDealer;
const getDealers = async (req, res) => {
    try {
        const dealers = await CarDealer_model_1.default.find(); // جلب كل الديلرز
        res.status(http_status_1.OK).json({
            success: true,
            data: dealers,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch dealers',
        });
    }
};
exports.getDealers = getDealers;
const getDealer = async (req, res) => {
    try {
        const { id } = req.params;
        const dealer = await CarDealer_model_1.default.findById(id);
        if (!dealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car Dealer not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: dealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch dealer',
        });
    }
};
exports.getDealer = getDealer;
const updateDealer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, city } = req.body;
        const dealer = await CarDealer_model_1.default.findById(id);
        if (!dealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Dealer not found',
            });
            return;
        }
        // تحديث القيم إذا كانت موجودة في الطلب
        if (name !== undefined)
            dealer.name = name;
        if (email !== undefined)
            dealer.email = email;
        if (city !== undefined)
            dealer.city = city;
        res.status(http_status_1.OK).json({
            success: true,
            data: dealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update dealer',
        });
    }
};
exports.updateDealer = updateDealer;
const deleteDealer = async (req, res) => {
    try {
        const { id } = req.params;
        const cardealer = CarDealer_model_1.default.findById(id);
        if (!cardealer) {
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
            error: error instanceof Error ? error.message : 'Failed to delete Car Dealer',
        });
    }
};
exports.deleteDealer = deleteDealer;
