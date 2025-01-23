import express from 'express';
import { addFoodRecognitionRecord, upload } from '../controllers/foodRecognitionController';

const router = express.Router();

// Route for adding a food recognition record
router.post('/food-recognition/add', upload.single('photo'), addFoodRecognitionRecord);

export default router;
