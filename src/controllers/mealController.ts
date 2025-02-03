import { Request, Response } from 'express';
import { Meal } from '../models/mealModel'; // Ensure you have the Meal interface defined
import db from '../config/db'; // Database connection
import { ResultSetHeader, RowDataPacket } from 'mysql2'; // Correct types from mysql2

// Add a new meal
export const addMeal = async (req: Request, res: Response): Promise<Response> => {
    try {
        const mealData: Meal = req.body; // Explicitly type the request body as Meal

        // Insert meal into the database
        const [result] = await db.execute<ResultSetHeader>(
            'INSERT INTO meals (name, description, calories) VALUES (?, ?, ?)', 
            [mealData.name, mealData.description, mealData.calories]
        );

        // Get the insert ID
        const insertId = result.insertId;

        // Fetch the newly inserted meal using the insertId
        const [addedMeal] = await db.execute<RowDataPacket[]>(
            'SELECT * FROM meals WHERE id = ?', 
            [insertId]
        );

        return res.status(201).json({ message: 'Meal added successfully', meal: addedMeal[0] });
    } catch (error) {
        console.error('Error adding meal:', error);
        return res.status(500).json({ message: 'Failed to add meal' });
    }
};

// Get all meals
export const getMeals = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Fetch meals from the database
        const [meals] = await db.execute<RowDataPacket[]>('SELECT * FROM meals');

        return res.status(200).json(meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        return res.status(500).json({ message: 'Failed to fetch meals' });
    }
};

