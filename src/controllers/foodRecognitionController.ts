import { Request, Response } from 'express';
import pool from '../models/db';
import multer from 'multer';

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
export const upload = multer({ storage });

export const addFoodRecognitionRecord = async (req: Request, res: Response): Promise<void> => {
    const { userID, predictedFood, predictedCalories } = req.body;
    const photoURL = req.file?.path;

    try {
        const [result] = await pool.query(
            'INSERT INTO FoodRecognition (photoURL, predictedFood, predictedCalories, userID) VALUES (?, ?, ?, ?)',
            [photoURL, predictedFood, predictedCalories, userID]
        );

        res.status(201).json({ message: 'Food recognition record added', recordID: (result as any).insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error adding food recognition record', error });
    }
};

export const getUserFoodRecords = async (req: Request, res: Response): Promise<void> => {
    const { userID } = req.params;

    try {
        const [rows] = await pool.query('SELECT * FROM FoodRecognition WHERE userID = ?', [userID]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user food records', error });
    }
};
