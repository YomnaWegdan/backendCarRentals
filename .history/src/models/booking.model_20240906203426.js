import mongoose, { Schema } from "mongoose";

const bookingSchema  = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    availability: { type: Boolean, default: true },

} , {timestamps: true , versionKey: false})

export const bookingModel = mongoose.model('car', bookingSchema)