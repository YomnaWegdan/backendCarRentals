import mongoose, { Schema } from "mongoose";

const bookingSchema  = new Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Car', // References the Car model
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // References the User model
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Booked', 'Cancelled'],
        default: 'Booked',
    },

} , {timestamps: true , versionKey: false})

export const bookingModel = mongoose.model('booking', bookingSchema)