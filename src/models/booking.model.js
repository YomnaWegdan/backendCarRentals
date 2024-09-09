import mongoose, { Schema } from "mongoose";

const bookingSchema  = new Schema({
    car: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'car', 
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user', 
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
    },
    status: {
        type: String,
        enum: ['Booked', 'Cancelled'],
        default: 'Booked',
    },

} , {timestamps: true , versionKey: false})

export const bookingModel = mongoose.model('booking', bookingSchema)
