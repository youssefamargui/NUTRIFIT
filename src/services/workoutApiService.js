const axios = require("axios");

const BASE_URL = "https://wger.de/api/v2";


// 🔥 GET ALL EXERCISES (Wger, anglais)
exports.getAllExercises = async () => {

    const response = await axios.get(`${BASE_URL}/exerciseinfo/`, {
        params: {
            language: 2,
            limit: 100
        }
    });

    return response.data.results;
};


// 🔥 GET EXERCISE DETAIL BY ID
exports.getExerciseById = async (id) => {

    const response = await axios.get(`${BASE_URL}/exerciseinfo/${id}/`);

    return response.data;
};


// 🔥 NOM ANGLAIS (translations : language 2 = anglais)
exports.getName = (ex) => {

    const tr = (ex.translations || []).find(t => t.language === 2)
        || (ex.translations || [])[0]
        || {};

    return tr.name;
};


// 🔥 IMAGE PRINCIPALE
exports.getImage = (ex) => {

    const img = (ex.images || []).find(i => i.is_main)
        || (ex.images || [])[0];

    return img ? img.image : null;
};
