import { Router } from "express";
import * as BC from "./booking.controller.js"
import {auth} from '../../middlewares/auth.js'

const carRouter = Router()

bookingRouter.post('/', auth(['user','admin']), BC.createBooking);  
bookingRouter.get('/', auth(['user','admin']), BC.getUserBookings); 
bookingRouter.get('/:id', auth(['user','admin']), BC.getBookingById); 
bookingRouter.put('/:id/cancel', auth(['user','admin']), BC.cancelBooking);



export default router;
