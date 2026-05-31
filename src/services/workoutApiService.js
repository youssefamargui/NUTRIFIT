require("dotenv").config();
const axios = require("axios");
console.log("API KEY =", process.env.RAPID_API_KEY);

const BASE_URL = "https://exercisedb.p.rapidapi.com";

const options = {
    headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
    }
};


// 🔥 GET ALL EXERCISES
exports.getAllExercises = async () => {

    const response = await axios.get(`${BASE_URL}/exercises`, options);

    return response.data;
};