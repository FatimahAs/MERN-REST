"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CarMake_controller_1 = require("../controllers/CarMake.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(CarMake_controller_1.getCarMakes)
    .post(CarMake_controller_1.createCarMake);
router.route('/:id')
    .get(CarMake_controller_1.getCarMake)
    .put(CarMake_controller_1.updateCarMakes)
    .delete(CarMake_controller_1.deleteCarMake);
exports.default = router;
