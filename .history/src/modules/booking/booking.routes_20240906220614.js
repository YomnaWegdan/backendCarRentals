import { Router } from "express";
import * as BC from "./car.controller.js"
import {auth} from '../../middlewares/auth.js'

export const carRouter = Router()

carRouter.get('/', auth(['user','admin']), CC.getCars);
router.post('/', protect, BC.createBooking);  // Create a new booking
router.get('/', protect, BC.getUserBookings); // Get all bookings for a user
router.get('/:id', protect, BC.getBookingById); // Get details of a specific booking
router.put('/:id/cancel', protect, BC.cancelBooking);

// import express from 'express';
// import {
//     createBooking,
//     getUserBookings,
//     getBookingById,
//     cancelBooking,
// } from '../controllers/bookingController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Routes for managing bookings
// router.post('/', protect, createBooking);  // Create a new booking
// router.get('/', protect, getUserBookings); // Get all bookings for a user
// router.get('/:id', protect, getBookingById); // Get details of a specific booking
// router.put('/:id/cancel', protect, cancelBooking); // Cancel a booking

// export default router;
