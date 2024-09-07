import { Router } from "express";
import * as UC from "./user.controller.js"
import {auth} from '../../middlewares/auth.js'

export const carRouter = Router()

carRouter.post('/signup' , UC.signUP)
carRouter.get('/', getCars);
router.get('/:id', getCarById);

// Admin routes (protected)
router.post('/', protect, createCar);
router.put('/:id', protect, updateCar);
router.delete('/:id', protect, deleteCar);
