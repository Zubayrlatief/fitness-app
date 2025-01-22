import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import foodRecognitionRoutes from './routes/foodRecognitionRoutes';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRecognitionRoutes);

export default app;
