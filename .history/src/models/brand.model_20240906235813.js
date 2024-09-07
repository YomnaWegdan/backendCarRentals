import mongoose, { Schema } from "mongoose";

const carSchema  = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    // image:{ type: String, required: true },
    image:{
        secure_url: String,
        public_id: String
    },
    coverImages:[{
        secure_url: String,
        public_id: String
    }],
    customId:String,
    pricePerDay: { type: Number, required: true },
    availability: { type: Boolean, default: true },

} , {timestamps: true , versionKey: false})

export const carModel = mongoose.model('car', carSchema)