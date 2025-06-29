"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CarDealer_controller_1 = require("../controllers/CarDealer.controller");
const router = (0, express_1.Router)({ mergeParams: true });
router.route('/')
    .get(CarDealer_controller_1.getDealers)
    .post(CarDealer_controller_1.createDealer);
router.route('/:id')
    .get(CarDealer_controller_1.getDealer)
    .put(CarDealer_controller_1.updateDealer)
    .delete(CarDealer_controller_1.deleteDealer);
exports.default = router;
