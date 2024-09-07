import { brandModel } from "../../models/brand.model";

// Create a new brand
export const createBrand = async (req, res) => {
    const { name } = req.body;

    try {
        const newBrand = new brandModel({ name });
        const savedBrand = await newBrand.save();
        res.status(201).json(savedBrand);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all brands
export const getAllBrands = async (req, res) => {
    try {
        const brands = await brandModel.find();
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single brand by ID
export const getBrandById = async (req, res) => {
    try {
        const brand = await brandModel.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a brand
export const updateBrand = async (req, res) => {
    const { name } = req.body;

    try {
        const brand = await brandModel.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        brand.name = name || brand.name;

        const updatedBrand = await brand.save();
        res.json(updatedBrand);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a brand
export const deleteBrand = async (req, res) => {
    try {
        const brand = await brandModel.findByIdAndDelete(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.json({ message: 'Brand deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
