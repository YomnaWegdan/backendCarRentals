import mongoose, { Schema } from "mongoose";

const bookingSchema  = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },

} , {timestamps: true , versionKey: false})

export const bookingModel = mongoose.model('booking', bookingSchema)