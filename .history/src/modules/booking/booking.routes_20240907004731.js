import { Router } from "express";
import * as BC from "./booking.controller.js"
import {auth} from '../../middlewares/auth.js'

const bookingRouter = Router()

bookingRouter.post('/', auth(['user','admin']), validation(CV.createBookingValidation), BC.createBooking);  
bookingRouter.get('/', auth(['user','admin']), BC.getUserBookings); 
bookingRouter.get('/:id', auth(['user','admin']),validation(CV.createCarValidation) BC.getBookingById); 
bookingRouter.put('/:id/cancel', auth(['user','admin']), BC.cancelBooking);



export default bookingRouter;
