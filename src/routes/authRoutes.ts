import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = express.Router();

// Register Route
router.post('/register', async (req, res, next) => {
    try {
        await registerUser(req, res);
    } catch (error) {
        next(error);
    }
});

// Login Route
router.post('/login', async (req, res, next) => {
    try {
        await loginUser(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
