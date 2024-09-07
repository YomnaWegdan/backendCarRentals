import mongoose, { Schema } from "mongoose";

const brandSchema  = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    cars:


} , {timestamps: true , versionKey: false})

export const brandModel = mongoose.model('brand', brandSchema)