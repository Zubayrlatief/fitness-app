"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeals = exports.addMeal = void 0;
const db_1 = __importDefault(require("../config/db")); // Database connection
// Add a new meal
const addMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mealData = req.body; // Explicitly type the request body as Meal
        // Insert meal into the database
        const [result] = yield db_1.default.execute('INSERT INTO meals (name, description, calories) VALUES (?, ?, ?)', [mealData.name, mealData.description, mealData.calories]);
        // Get the insert ID
        const insertId = result.insertId;
        // Fetch the newly inserted meal using the insertId
        const [addedMeal] = yield db_1.default.execute('SELECT * FROM meals WHERE id = ?', [insertId]);
        return res.status(201).json({ message: 'Meal added successfully', meal: addedMeal[0] });
    }
    catch (error) {
        console.error('Error adding meal:', error);
        return res.status(500).json({ message: 'Failed to add meal' });
    }
});
exports.addMeal = addMeal;
// Get all meals
const getMeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch meals from the database
        const [meals] = yield db_1.default.execute('SELECT * FROM meals');
        return res.status(200).json(meals);
    }
    catch (error) {
        console.error('Error fetching meals:', error);
        return res.status(500).json({ message: 'Failed to fetch meals' });
    }
});
exports.getMeals = getMeals;
