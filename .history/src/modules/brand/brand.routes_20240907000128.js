import { Router } from "express";
import * as BC from "./brand.controller.js"
import {auth} from '../../middlewares/auth.js'

const brandRouter = Router()

carRouter.get('/', auth(['user','admin']), CC.getCars);
carRouter.get('/:id', auth(['user','admin']),CC.getCarById);

// Admin routes (protected)
carRouter.post('/', auth(['admin']), CC.createCar);
carRouter.put('/:id', auth(['admin']), CC.updateCar);
carRouter.delete('/:id', auth(['admin']), CC.deleteCar);


router.post('/', createBrand);
router.get('/', getAllBrands);
router.get('/:id', getBrandById);
router.put('/:id', updateBrand);
router.delete('/:id', deleteBrand);

export default carRouter;