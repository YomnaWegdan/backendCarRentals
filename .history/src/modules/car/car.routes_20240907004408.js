import { Router } from "express";
import * as CC from "./car.controller.js"
import {auth} from '../../middlewares/auth.js'
import {multerHost} from '../../middlewares/multerHost.js'
import {validExtensions} from '../../utilities/validExtensions.js'
import * as CV from "./car.validate.js"
import {validation} from "../../middlewares/validate.js"


const carRouter = Router()

carRouter.get('/', auth(['user','admin']), CC.getCars);
carRouter.get('/:id', auth(['user','admin']),CC.getCarById);

// Admin routes (protected)
carRouter.post('/',  multerHost(validExtensions.image).fields([{name : "image" , maxCount : 1} , {name:"coverImages" , maxCount : 3} ]) ,validation(CV.createCarValidation), auth(["admin"]), auth(['admin']), CC.createCar);
carRouter.put('/:id', multerHost(validExtensions.image).fields([{name : "image" , maxCount : 1} , {name:"coverImages" , maxCount : 3} ]) ,validation(CV.updateCarValidation), auth(["admin"]), auth(['admin']), CC.updateCar);
carRouter.delete('/:id', auth(['admin']), CC.deleteCar);

export default carRouter;

