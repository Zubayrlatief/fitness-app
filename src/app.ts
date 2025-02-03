import express from 'express';
import { addMeal, getMeals } from '../controllers/mealController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Route for adding a new meal
router.post('/add', authMiddleware, addMeal);

// Route for fetching all meals
router.get('/', authMiddleware, getMeals);

export default router;
