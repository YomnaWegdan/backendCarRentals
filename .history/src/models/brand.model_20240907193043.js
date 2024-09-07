import mongoose, { Schema } from "mongoose";

const brandSchema  = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    cars: [{ type: Schema.Types.ObjectId, ref: 'car' }],


} , {timestamps: true , versionKey: false})

export const brandModel = mongoose.model('brand', brandSchema)