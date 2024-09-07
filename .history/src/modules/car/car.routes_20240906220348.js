import { Router } from "express";
import * as CC from "./user.controller.js"
import {auth} from '../../middlewares/auth.js'

export const carRouter = Router()

carRouter.post('/signup' , CC.signUP)
carRouter.get('/', auth(['user','admin']), getCars);
carRouter.get('/:id', auth(['user','admin']),getCarById);

// Admin routes (protected)
carRouter.post('/', auth(['admin']), createCar);
carRouter.put('/:id', auth(['admin']), updateCar);
carRouter.delete('/:id', auth(['admin']), deleteCar);
