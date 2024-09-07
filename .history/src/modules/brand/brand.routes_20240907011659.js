import { Router } from "express";
import * as BC from "./brand.controller.js"
import {auth} from '../../middlewares/auth.js'

const brandRouter = Router()



brandRouter.post('/',auth(['admin']), ,  BC.createBrand);
brandRouter.get('/', auth(['admin', 'user']) ,BC.getAllBrands);
brandRouter.get('/:id',auth(['admin']), BC.getBrandById);
brandRouter.put('/:id',auth(['admin']), BC.updateBrand);
brandRouter.delete('/:id',auth(['admin']), BC.deleteBrand);

export default brandRouter;