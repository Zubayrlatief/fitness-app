import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes';
import foodRecognitionRoutes from './routes/foodRecognitionRoutes';

dotenv.config();  // Call dotenv.config() once here

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(foodRecognitionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
