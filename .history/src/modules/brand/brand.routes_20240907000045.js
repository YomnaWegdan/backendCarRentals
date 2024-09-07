import { Router } from "express";
import * as CC from "./car.controller.js"
import {auth} from '../../middlewares/auth.js'

const carRouter = Router()

carRouter.get('/', auth(['user','admin']), CC.getCars);
carRouter.get('/:id', auth(['user','admin']),CC.getCarById);

// Admin routes (protected)
carRouter.post('/', auth(['admin']), CC.createCar);
carRouter.put('/:id', auth(['admin']), CC.updateCar);
carRouter.delete('/:id', auth(['admin']), CC.deleteCar);

export default carRouter;