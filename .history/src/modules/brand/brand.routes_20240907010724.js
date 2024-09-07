import { Router } from "express";
import * as BC from "./brand.controller.js"
import {auth} from '../../middlewares/auth.js'

const brandRouter = Router()



brandRouter.post('/',auth(['admin']), BC.createBrand);
brandRouter.get('/', auth(['admin', 'user']) ,getAllBrands);
brandRouter.get('/:id',auth(['admin']), getBrandById);
brandRouter.put('/:id',auth(['admin']), updateBrand);
brandRouter.delete('/:id',auth(['admin']), deleteBrand);

export default brandRouter;