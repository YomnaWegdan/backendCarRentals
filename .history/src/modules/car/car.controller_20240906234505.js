// import {carModel} from './car.model.js';

import { carModel } from "../../models/car.model.js";

// Get all cars
export const getCars = async (req, res) => {
    const cars = await carModel.find();
    res.json(cars);
};

// Get single car
export const getCarById = async (req, res) => {
    const car = await carModel.findById(req.params.id);
    if (car) {
        res.json(car);
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
};

// Create new car (Admin only)
export const createCar = async (req, res) => {
    const { brand, model, pricePerDay, availability } = req.body;
    const car = new carModel({ brand, model, pricePerDay, availability });

    let list =[]
    const customId = nanoid(5)
    for(const file of req.files.coverImages){
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path , { 
            folder:`Cars/brands/${brand}.customId}/subCategories/${subcategoryExist.customId}/products/${customId}/coverImages`,
        })
        list.push({secure_url , public_id})
    }

    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.image[0].path , {
        folder:`E-commerce/Categories/${categoryExist.customId}/subCategories/${subcategoryExist.customId}/products/${customId}/mainImage`,
    })


    const createdCar = await car.save();
    res.status(201).json(createdCar);
};

// Update car (Admin only)
export const updateCar = async (req, res) => {
    const car = await carModel.findById(req.params.id);

    if (car) {
        car.brand = req.body.brand || car.brand;
        car.model = req.body.model || car.model;
        car.pricePerDay = req.body.pricePerDay || car.pricePerDay;
        car.availability = req.body.availability ?? car.availability;

        const updatedCar = await car.save();
        res.json(updatedCar);
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
};

// Delete car (Admin only)
export const deleteCar = async (req, res) => {
    const car = await carModel.findById(req.params.id);

    if (car) {
        await car.remove();
        res.json({ message: 'Car removed' });
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
};
