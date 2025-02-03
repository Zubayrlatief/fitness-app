import express from 'express';
import { loginUser } from '../controllers/authController';

const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        await loginUser(req, res);
    } catch (error) {
        next(error); // Pass errors to Express error handler
    }
});

export default router;
