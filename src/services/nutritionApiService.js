require("dotenv").config();
const axios = require("axios");

const BASE_URL = "https://api.spoonacular.com";
const API_KEY = process.env.SPOONACULAR_API_KEY;


// 🔥 GET RECIPES FILTERED BY CALORIES (complexSearch)
exports.getRecipesByCalories = async (maxCalories, number = 8) => {

    const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
        params: {
            apiKey: API_KEY,
            maxCalories,
            number,
            addRecipeNutrition: true
        }
    });

    return response.data.results;
};


// 🔥 GET RECIPE DETAIL BY ID
exports.getRecipeById = async (id) => {

    const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
        params: {
            apiKey: API_KEY,
            includeNutrition: true
        }
    });

    return response.data;
};


// 🔥 EXTRACT CALORIES FROM NUTRITION
exports.getCalories = (recipe) => {

    const nutrients = recipe.nutrition ? recipe.nutrition.nutrients : [];

    const calories = nutrients.find(n => n.name === "Calories");

    return calories ? Math.round(calories.amount) : null;
};
