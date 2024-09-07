import { Router } from "express";
import * as CC from "./car.controller.js"
import {auth} from '../../middlewares/auth.js'
import {multerHost} from '../../middlewares/multerHost.js'
import {validExtensions} from '../../utilities/validExtensions.js'


const carRouter = Router()

carRouter.get('/', auth(['user','admin']), CC.getCars);
carRouter.get('/:id', auth(['user','admin']),CC.getCarById);

// Admin routes (protected)
carRouter.post('/',vali createCarValidation,  multerHost(validExtensions.image).fields([{name : "image" , maxCount : 1} , {name:"coverImages" , maxCount : 3} ]) , auth(['admin']), CC.createCar);
carRouter.put('/:id', multerHost(validExtensions.image).fields([{name : "image" , maxCount : 1} , {name:"coverImages" , maxCount : 3} ]) , auth(['admin']), CC.updateCar);
carRouter.delete('/:id', auth(['admin']), CC.deleteCar);

export default carRouter;

