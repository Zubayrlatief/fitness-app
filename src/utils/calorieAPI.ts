import axios from 'axios';

const CALORIE_API_URL = 'https://api.calorieninjas.com/v1/nutrition';
const API_KEY = 'your-api-key-here'; // Replace with actual API key

// Ensure fetchCalories is properly exported
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

