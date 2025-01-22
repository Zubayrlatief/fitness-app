import { Router } from 'express';
import { addFoodRecognitionRecord, getUserFoodRecords, upload } from '../controllers/foodRecognitionController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/add', authenticate, upload.single('photo'), addFoodRecognitionRecord);
router.get('/:userID', authenticate, getUserFoodRecords);

export default router;
