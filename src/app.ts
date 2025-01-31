import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import mealRoutes from './routes/mealRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);

export default app;
