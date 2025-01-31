import express from 'express';
import { addMeal, getMeals } from '../controllers/mealController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Updated to handle async/await properly
router.post('/add', authMiddleware, async (req, res) => {
    await addMeal(req, res); // Ensure async function returns a valid response
});
router.get('/', authMiddleware, async (req, res) => {
    await getMeals(req, res); // Ensure async function returns a valid response
});

export default router;

