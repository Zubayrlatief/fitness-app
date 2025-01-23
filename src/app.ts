import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import foodRecognitionRoutes from './routes/foodRecognitionRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRecognitionRoutes);
app.use('/food-recognition', foodRecognitionRoutes);

export default app;
