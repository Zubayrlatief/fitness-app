import { Request, Response } from 'express';
import pool from '../models/db';
import multer from 'multer';
import axios from 'axios';

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
export const upload = multer({ storage });

// Function to fetch calories from API
const fetchCaloriesFromAPI = async (food: string): Promise<number> => {
    const apiKey = process.env.API_KEY; // Your API key
    const appId = process.env.APP_ID; // Your App ID
    if (!apiKey || !appId) {
        throw new Error('Missing API credentials. Please set API_KEY and APP_ID in environment variables.');
    }

    const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(food)}&app_id=${appId}&app_key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const foodItem = response.data.parsed?.[0]?.food;

        if (foodItem) {
            return foodItem.nutrients.ENERC_KCAL || 0; // Energy in kcal or 0 if not available
        } else {
            throw new Error('Food not found in API response.');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching calories:', error.message);
        }
        return 0; // Default to 0 if API call fails
    }
};

export const addFoodRecognitionRecord = async (req: Request, res: Response): Promise<void> => {
    const { userID, predictedFood, quantity } = req.body;
    const photoURL = req.file?.path;

    try {
        if (!userID || !predictedFood || !quantity) {
            res.status(400).json({ message: 'Missing required fields: userID, predictedFood, or quantity.' });
            return;
        }

        // Fetch calories for the predicted food
        const caloriesPerUnit = await fetchCaloriesFromAPI(predictedFood);
        const predictedCalories = caloriesPerUnit * parseFloat(quantity);

        // Insert the record into the database
        const [result] = await pool.query(
            'INSERT INTO FoodRecognition (photoURL, predictedFood, predictedCalories, userID) VALUES (?, ?, ?, ?)',
            [photoURL, predictedFood, predictedCalories, userID]
        );

        res.status(201).json({
            message: 'Food recognition record added successfully.',
            recordID: (result as any).insertId,
            predictedCalories,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error adding food recognition record.', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred while adding food recognition record.' });
        }
    }
};
