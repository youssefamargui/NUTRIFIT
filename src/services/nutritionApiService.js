const axios = require("axios");

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";


// 🔥 GET RANDOM RECIPES
exports.getRandomMeals = async () => {

    const response = await axios.get(`${BASE_URL}/search.php?s=`);

    return response.data.meals;
};


// 🔥 SEARCH BY NAME
exports.searchMeals = async (name) => {

    const response = await axios.get(`${BASE_URL}/search.php?s=${name}`);

    return response.data.meals;
};


// 🔥 FILTER SIMPLE (calories mock)
exports.filterByCalories = (meals, maxCalories) => {

    if (!meals) return [];

    return meals.filter(meal => {

        // TheMealDB n'a pas calories → on simule
        return Math.random() * 800 <= maxCalories;
    });
};