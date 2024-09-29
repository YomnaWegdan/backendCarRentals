import { Router } from "express";
import * as CC from "./car.controller.js";
import { auth } from '../../middlewares/auth.js';
import * as CV from "./car.validate.js";
import { validation } from "../../middlewares/validate.js";
import { multerHost, validExtensions } from "../../middlewares/multer.js";

const carRouter = Router();

// Get all cars or by ID
carRouter.get('/', CC.getCars);
carRouter.get('/:id', CC.getCarById);

// Admin routes (protected)
carRouter.post(
  '/',  
  multerHost(validExtensions.image).fields([
    { name: 'image', maxCount: 1 },
    { name: 'coverImages', maxCount: 3 }
  ]), 
  // validation(CV.createCarValidation),  // Validate car creation data
  auth(['admin']),  // Ensure only admins can create cars
  CC.createCar
);

carRouter.get('/availableCars' , CC.getAvailableCars)
carRouter.get('/availableCarsByBrand' , CC.getAvailableCarsByBrand)



carRouter.put(
  '/:id',
  multerHost(validExtensions.image).fields([
    { name: 'image', maxCount: 1 },
    { name: 'coverImages', maxCount: 3 }
  ]), 
  validation(CV.updateCarValidation),  // Validate car update data
  auth(['admin']),  // Ensure only admins can update cars
  CC.updateCar
);

carRouter.delete('/:id', auth(['admin']), CC.deleteCar);  // Ensure only admins can delete cars
carRouter.get('/count',auth(['admin', 'user']), CC.getCarCount);

export default carRouter;



