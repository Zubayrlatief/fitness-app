"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mealController_1 = require("../controllers/mealController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Route for adding a new meal
router.post('/add', authMiddleware_1.authMiddleware, mealController_1.addMeal);
// Route for fetching all meals
router.get('/', authMiddleware_1.authMiddleware, mealController_1.getMeals);
exports.default = router;
