import { Router } from "express";
import * as BC from "./brand.controller.js"
import {auth} from '../../middlewares/auth.js'
import { validation } from "../../middlewares/validate.js";

const brandRouter = Router()



brandRouter.post('/',auth(['admin']), validation(BV.createBrandValidation) ,  BC.createBrand);
brandRouter.get('/', auth(['admin', 'user']) ,BC.getAllBrands);
brandRouter.get('/:id',auth(['admin']), BC.getBrandById);
brandRouter.put('/:id',auth(['admin']), validation(BV.updateBrandValidation) , BC.updateBrand);
brandRouter.delete('/:id',auth(['admin']), BC.deleteBrand);

export default brandRouter;