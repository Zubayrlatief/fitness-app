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
exports.fetchCalories = void 0;
const axios_1 = __importDefault(require("axios"));
const CALORIE_API_URL = 'https://api.calorieninjas.com/v1/nutrition';
const API_KEY = 'your-api-key-here'; // Replace with actual API key
// Ensure fetchCalories is properly exported
const fetchCalories = (food) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${CALORIE_API_URL}?query=${food}`, {
            headers: { 'X-Api-Key': API_KEY }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching calorie data:', error);
        throw new Error('Failed to fetch calorie data');
    }
});
exports.fetchCalories = fetchCalories;
