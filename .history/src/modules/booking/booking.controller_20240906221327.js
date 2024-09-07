import Booking from '../models/Booking.js';
import Car from '../models/Car.js';

// Create a new booking
export const createBooking = async (req, res) => {
    const { car, startDate, endDate } = req.body;

    // Find the car to calculate total price
    const carDetails = await Car.findById(car);
    if (!carDetails) return res.status(404).json({ message: 'Car not found' });

    const daysRented = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24); // Calculate rental period in days
    const totalPrice = daysRented * carDetails.pricePerDay;

    const bookingModel = new bookingModel({
        car,
        user: req.user._id,  // Assuming user is authenticated
        startDate,
        endDate,
        totalPrice,
    });

    const createdBooking = await bookingModel.save();
    res.status(201).json(createdBooking);
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
    const bookings = await bookingModel.find({ user: req.user._id }).populate('car', 'brand model pricePerDay');
    res.json(bookingModel);
};

// Get a single booking by ID
export const getBookingById = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('car', 'brand model pricePerDay');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.json(booking);
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'Cancelled';
    const cancelledBooking = await booking.save();

    res.json(cancelledBooking);
};
