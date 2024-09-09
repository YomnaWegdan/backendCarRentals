
import { carModel } from "../../models/car.model.js";
import { bookingModel } from "../../models/booking.model.js";

export const createBooking = async (req, res) => {
    const { car, startDate, endDate } = req.body;

    try {
        // Find the car to calculate total price and check availability
        const carDetails = await carModel.findById(car);
        if (!carDetails) return res.status(404).json({ message: 'Car not found' });

        // Check if the car is already booked within the selected dates
        const existingBooking = await bookingModel.findOne({
            car,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
            ]
        });

        if (existingBooking) return res.status(400).json({ message: 'Car is already booked for the selected dates' });

        // Calculate total price
        const daysRented = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24); // Calculate rental period in days
        const totalPrice = daysRented * carDetails.pricePerDay;

        // Update car availability
        carDetails.availability = false;
        await carDetails.save();

        // Create a new booking
        const booking = new bookingModel({
            car,
            user: req.user._id,
            startDate,
            endDate,
            totalPrice,
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);

    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// Get all bookings for a user
export const getUserBookings = async (req, res) => {
    const bookings = await bookingModel.find({ user: req.user._id }).populate('car', 'brand model pricePerDay');
    res.json(bookings);
};

// Get a single booking by ID
export const getBookingById = async (req, res) => {
    const booking = await bookingModel.findById(req.params.id).populate('car', 'brand model pricePerDay');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.json(booking);
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'Cancelled';
    const cancelledBooking = await booking.save();

    res.json(cancelledBooking);
};
