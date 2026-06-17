const nutritionApi = require("../services/nutritionApiService");
const User = require("../models/User");


// GET RECIPES FOR USER
// GET /api/nutrition/recipes
exports.getUserMeals = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        // calories cibles par repas (3 repas par jour)
        const maxCalories = user.targetCalories
            ? Math.round(user.targetCalories / 3)
            : 600;

        const recipes = await nutritionApi.getRecipesByCalories(maxCalories, 8);

        // 🔥 CLEAN DATA
        const cleanMeals = recipes.map(r => ({
            id: r.id,
            title: r.title,
            image: r.image,
            calories: nutritionApi.getCalories(r)
        }));

        res.status(200).json({
            success: true,
            targetCalories: user.targetCalories,
            maxCaloriesPerMeal: maxCalories,
            meals: cleanMeals
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET RECIPE DETAIL BY ID
// GET /api/nutrition/recipes/:id
exports.getMealById = async (req, res) => {

    try {

        const recipe = await nutritionApi.getRecipeById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recette introuvable"
            });
        }

        // 🔥 INGREDIENTS
        const ingredients = (recipe.extendedIngredients || [])
            .map(i => i.original);

        // 🔥 CLEAN DATA
        const cleanMeal = {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            servings: recipe.servings,
            readyInMinutes: recipe.readyInMinutes,
            calories: nutritionApi.getCalories(recipe),
            instructions: recipe.instructions,
            ingredients
        };

        res.status(200).json({
            success: true,
            meal: cleanMeal
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
