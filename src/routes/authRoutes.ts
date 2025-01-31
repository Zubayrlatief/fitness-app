import express from 'express';
import { loginUser } from '../controllers/authController';

const router = express.Router();

// Updated to handle async/await properly
router.post('/login', async (req, res) => {
    return loginUser(req, res); // Ensure it returns a valid response object
});

export default router;
