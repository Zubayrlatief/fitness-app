import express from 'express'
import { addLog, getLogs} from '../controllers/foodLogsController';

const router = express.Router();

router.post('/', addLog);
router.get('/:userID', getLogs):

export default router;

