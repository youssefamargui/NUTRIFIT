const nutritionApi = require("../services/nutritionApiService");
const User = require("../models/User");


// GET RECIPES FOR USER
exports.getUserMeals = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        const meals = await nutritionApi.getRandomMeals();

        const filtered = nutritionApi.filterByCalories(
            meals,
            user.targetCalories
        );

        // 🔥 CLEAN DATA + LIMIT 8 RECIPES
        const cleanMeals = filtered
            .slice(0, 8)
            .map(meal => ({
                id: meal.idMeal,
                title: meal.strMeal,
                category: meal.strCategory,
                image: meal.strMealThumb
            }));

        res.status(200).json({
            success: true,
            targetCalories: user.targetCalories,
            meals: cleanMeals
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};