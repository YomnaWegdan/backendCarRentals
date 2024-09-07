import { Router } from "express";
import * as CC from "./car.controller.js"
import {auth} from '../../middlewares/auth.js'

export const carRouter = Router()

carRouter.get('/', auth(['user','admin']), CC.getCars);
carRouter.get('/:id', auth(['user','admin']),CC.getCarById);

// Admin routes (protected)
carRouter.post('/', auth(['admin']), CCcreateCar);
carRouter.put('/:id', auth(['admin']), updateCar);
carRouter.delete('/:id', auth(['admin']), deleteCar);
