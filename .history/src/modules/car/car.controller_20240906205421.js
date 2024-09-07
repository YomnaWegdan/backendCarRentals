import carMode from '../models/Car.js';

// Get all cars
export const getCars = async (req, res) => {
    const cars = await Car.find();
    res.json(cars);
};

// Get single car
export const getCarById = async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (car) {
        res.json(car);
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
};

// Create new car (Admin only)
export const createCar = async (req, res) => {
    const { brand, model, pricePerDay, availability } = req.body;
    const car = new Car({ brand, model, pricePerDay, availability });

    const createdCar = await car.save();
    res.status(201).json(createdCar);
};

// Update car (Admin only)
export const updateCar = async (req, res) => {
    const car = await Car.findById(req.params.id);

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
    const car = await Car.findById(req.params.id);

    if (car) {
        await car.remove();
        res.json({ message: 'Car removed' });
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
};
