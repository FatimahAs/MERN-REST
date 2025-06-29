"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Car_controller_1 = require("../controllers/Car.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(Car_controller_1.getCars)
    .post(Car_controller_1.createCar);
router.route('/:id')
    .get(Car_controller_1.getCar)
    .put(Car_controller_1.updateCar)
    .delete(Car_controller_1.deleteCar);
exports.default = router;
