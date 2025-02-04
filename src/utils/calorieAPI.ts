import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const CALORIE_API_URL = 'https://api.calorieninjas.com/v1/nutrition';
const API_KEY = process.env.FOOD_API_APP_KEY as string; // Read from .env

if (!API_KEY) {
    throw new Error('Missing FOOD_API_APP_KEY in .env');
}

export const fetchCalories = async (food: string): Promise<any> => {
    try {
        const response = await axios.get(`${CALORIE_API_URL}?query=${food}`, {
            headers: { 'X-Api-Key': API_KEY }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching calorie data:', error);
        throw new Error('Failed to fetch calorie data');
    }
};
