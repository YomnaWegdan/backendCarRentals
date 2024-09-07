import { Router } from "express";
import * as UC from "./user.controller.js"
import {auth} from '../../middlewares/auth.js'

export const carRouter = Router()

carRouter.post('/signup' , UC.signUP)
carRouter.get('/', auth(['user','admin']), getCars);
carRouter.get('/:id', getCarById);

// Admin routes (protected)
carRouter.post('/', protect, createCar);
carRouter.put('/:id', protect, updateCar);
carRouter.delete('/:id', protect, deleteCar);
