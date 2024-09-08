import { Router } from "express";
import * as BC from "./brand.controller.js"
import {auth} from '../../middlewares/auth.js'
import { validation } from "../../middlewares/validate.js";
import * as BV from "./brand.validate.js"

const brandRouter = Router()



brandRouter.post('/',auth(['admin']), validation(BV.createBrandValidation) ,  BC.createBrand);
brandRouter.get('/' ,BC.getAllBrands);
brandRouter.get('/:id', BC.getBrandById);
brandRouter.put('/:id',auth(['admin']), validation(BV.updateBrandValidation) , BC.updateBrand);
brandRouter.delete('/:id',auth(['admin']), BC.deleteBrand);

export default brandRouter;
