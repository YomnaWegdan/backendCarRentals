import { carModel } from "../../models/car.model.js";
import { brandModel } from "../../models/brand.model.js";
import { appError } from "../../utilities/appError.js";
import { catchError } from "../../middlewares/asyncHandlerError.js";
import { nanoid } from 'nanoid';
import cloudinary from '../../utilities/cloudinary.js';

// Get all cars with detailed brand information
export const getCars = async (req, res, next) => {
    try {
        const cars = await carModel.find().populate('brand', 'name'); // Populates the brand field with only the name
        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
};

// Get single car by ID with detailed brand information
export const getCarById = async (req, res, next) => {
    try {
        const car = await carModel.findById(req.params.id).populate('brand', 'name'); // Populates the brand field with only the name
        if (car) {
            res.status(200).json(car);
        } else {
            next(new appError('Car not found', 404));
        }
    } catch (error) {
        next(error);
    }
};

// Create a new car
export const createCar = async (req, res, next) => {
    const { brand, model, year, pricePerDay, availability } = req.body;

    try {
        // Check if the brand exists
        const brandExist = await brandModel.findById(brand);
        if (!brandExist) return next(new appError('Brand not found', 404));

        const customId = nanoid(5);

        // Upload cover images to Cloudinary
        let coverImageList = [];
        if (req.files.coverImages) {
            for (const file of req.files.coverImages) {
                const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                    folder: `Cars/${customId}/coverImages`,
                });
                coverImageList.push({ secure_url, public_id });
            }
        }

        // Upload main image to Cloudinary
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.image[0].path, {
            folder: `Cars/${customId}/mainImage`,
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
            coverImages: coverImageList,
        });

        // Save the car to the database
        const createdCar = await car.save();

        // Add the new car's ID to the brand's cars array and update the brand
        brandExist.cars.push(createdCar._id);
        await brandExist.save();

        res.status(201).json(createdCar);
    } catch (error) {
        next(error);
    }
};

export const updateCar = async (req, res, next) => {
    try {
        const car = await carModel.findById(req.params.id);
        if (!car) return next(new appError('Car not found', 404));

        // Update car fields
        car.model = req.body.model || car.model;
        car.year = req.body.year || car.year;
        car.pricePerDay = req.body.pricePerDay || car.pricePerDay;
        car.availability = req.body.availability ?? car.availability;
        car.brand = req.body.brand || car.brand;

        // Handle image uploads
        if (req.files) {
            // Check if main image is provided
            if (req.files.image && req.files.image.length > 0) {
                try {
                    await cloudinary.uploader.destroy(car.image.public_id); // Remove old image
                    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.image[0].path, {
                        folder: `Cars/${car.customId}/mainImage`,
                    });
                    car.image = { secure_url, public_id }; // Update image info
                } catch (err) {
                    console.error("Error uploading main image:", err);
                    return next(new appError("Failed to upload main image", 500));
                }
            }

            // Handle cover images
            if (req.files.coverImages && req.files.coverImages.length > 0) {
                try {
                    await cloudinary.api.delete_resources_by_prefix(`Cars/${car.customId}/coverImages`); // Remove old cover images

                    const coverImageList = [];
                    for (const file of req.files.coverImages) {
                        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                            folder: `Cars/${car.customId}/coverImages`,
                        });
                        coverImageList.push({ secure_url, public_id });
                    }
                    car.coverImages = coverImageList; // Update cover images
                } catch (err) {
                    console.error("Error uploading cover images:", err);
                    return next(new appError("Failed to upload cover images", 500));
                }
            }
        }

        // Save updated car
        const updatedCar = await car.save();
        res.status(200).json(updatedCar);
    } catch (error) {
        console.error("Error in updateCar:", error);
        next(error);
    }
};


export const deleteCar = async (req, res, next) => {
    try {
        const car = await carModel.findById(req.params.id);
        if (!car) return next(new appError('Car not found', 404));

        // Remove car from brand's cars array
        const brand = await brandModel.findById(car.brand);
        if (brand) {
            brand.cars.pull(car._id);
            await brand.save();
        }

        // Remove images from Cloudinary
        await cloudinary.uploader.destroy(car.image.public_id);
        for (const coverImage of car.coverImages) {
            await cloudinary.uploader.destroy(coverImage.public_id);
        }

        // Delete car using findByIdAndDelete
        await carModel.findByIdAndDelete(req.params.id); // Use this instead
        res.status(200).json({ message: 'Car removed' });
    } catch (error) {
        next(error);
    }
};


// Get available cars
export const getAvailableCars = async (req, res, next) => {
    try {
        const cars = await carModel.find({ availability: true }).populate('brand', 'name');
        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
};

// Get available cars by brand
export const getAvailableCarsByBrand = async (req, res, next) => {
    try {
        const cars = await carModel.find({ brand: req.params.brand, availability: true }).populate('brand', 'name');
        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
};

