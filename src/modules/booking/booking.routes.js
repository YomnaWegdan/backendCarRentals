
import { Router } from "express";
import bookingController from "./booking.controller.js";
import { auth } from '../../middlewares/auth.js';
import { validation } from "../../middlewares/validate.js";
import * as CV from "./booking.validate.js";

const bookingRouter = Router();

bookingRouter.post("/", auth(['user', 'admin']), validation(CV.createBookingValidation), bookingController.createBooking); // Add a booking
bookingRouter.get("/", auth(['user', 'admin']), bookingController.getUserBookings); // Get all bookings for the user
bookingRouter.get("/:id", auth(['user', 'admin']), bookingController.getBookingById); // Get a single booking by ID
bookingRouter.put("/:id", auth(['user', 'admin']), bookingController.updateBooking); // Update a booking by ID
bookingRouter.delete("/:id", auth(['user', 'admin']), bookingController.deleteBooking); // Delete a booking by ID
bookingRouter.put("/:id/cancel", auth(['user', 'admin']), bookingController.cancelBooking); // Cancel a booking by ID

export default bookingRouter;
