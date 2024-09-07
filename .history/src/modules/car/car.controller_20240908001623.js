// import {carModel} from './car.model.js';

import { brandModel } from "../../models/brand.model.js";
import { carModel } from "../../models/car.model.js";
import { appError } from "../../utilities/appError.js";
import { catchError } from "../../middlewares/asyncHandlerError.js";
import { nanoid } from 'nanoid'
import cloudinary from '../../utilities/cloudinary.js'

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

export const createCar = async (req, res, next) => {
    const { brand, model, year, pricePerDay, availability } = req.body;

    // Check if the brand exists
    const brandExist = await brandModel.findById(brand);
    if (!brandExist) return next(new appError('Brand not found', 404));

    const customId = nanoid(5);

    // Upload cover images to Cloudinary
    let coverImageList = [];
    for (const file of req.files.coverImages) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
            folder: `Cars/brands/${brandExist.customId}/products/${customId}/coverImages`,
        });
        coverImageList.push({ secure_url, public_id });
    }

    // Upload main image to Cloudinary
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: `Cars/brands/${brandExist.customId}/products/${customId}/mainImage`,
    });

    // Create a new car
    const car = new carModel({
        brand,
        model,
        year,
        pricePerDay,
        availability,
        customId,
        image: { secure_url, public_id },
        coverImages: coverImageList
    });

    // Save the car to the database
    const createdCar = await car.save();

    // Add the new car's ID to the brand's cars array and update the brand
    brandExist.cars.push(createdCar._id);
    await brandExist.save();

    res.status(201).json(createdCar);
};

// Create new car (Admin only)
// export const createCar = async (req, res) => {
//     const {brand, model,year, pricePerDay, availability } = req.body;

//     const brandExist = await brandModel.findOne({_id:brand})
//     if(!brandExist) return next(new appError('brand not found' , 404))
    
   

//     let list =[]
//     const customId = nanoid(5)
//     for(const file of req.files.coverImages){
//         const { secure_url, public_id } = await cloudinary.uploader.upload(file.path , { 
//             folder:`Cars/brands/${brand.customId}/products/${customId}/coverImages`,
//         })
//         list.push({secure_url , public_id})
//     }

//     const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.image[0].path , {
//         folder:`Cars/brands/${brand.customId}/products/${customId}/mainImage`,
//     })
//     const car = new carModel({brand, model, year, pricePerDay, availability ,  customId , image:{secure_url , public_id} , coverImages:list  });



//     const createdCar = await car.save();
//     res.status(201).json(createdCar);
// };

// Update car (Admin only)
export const updateCar = async (req, res) => {
    const car = await carModel.findById(req.params.id);

    if (car) {
        car.name = req.body.name || car.name;

        car.brand = req.body.brand || car.brand;
        car.model = req.body.model || car.model;
        car.pricePerDay = req.body.pricePerDay || car.pricePerDay;
        car.availability = req.body.availability ?? car.availability;

        if(req.files){
            if(req.files?.image?.length){
                await cloudinary.uploader.destroy(car.image.public_id)
                const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.image[0].path , { 
                    folder:`Cars/brands/${brand.customId}/products/${customId}/mainImage`,
                })
                product.image = {secure_url , public_id}
            }
            if(req.files?.coverImages?.length){
    
                const list =[]
                for(const file of req.files.coverImages){
                    await cloudinary.api.delete_resources_by_prefix(`Cars/brands/${brand.customId}/products/${customId}/coverImages`)
                    const { secure_url, public_id } = await cloudinary.uploader.upload(file.path , { 
                        folder:`Cars/brands/${brand.customId}/products/${customId}/coverImages`,
                    })
                    list.push({secure_url , public_id})
                }
                car.coverImages = list
            }
        }

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

e getAvailableCars