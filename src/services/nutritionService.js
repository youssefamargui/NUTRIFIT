exports.calculateBMR = (weight, height, age, gender) => {

    if (gender === "homme") {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    }

    return 10 * weight + 6.25 * height - 5 * age - 161;
};


exports.calculateTDEE = (bmr, activityLevel) => {

    const levels = {
        sedentaire: 1.2,
        leger: 1.375,
        modere: 1.55,
        actif: 1.725
    };

    return bmr * (levels[activityLevel] || 1.2);
};


exports.calculateCalories = (tdee, goal) => {

    if (goal === "perte") return tdee - 500;
    if (goal === "prise") return tdee + 300;
    return tdee;
};


// 🔥 NOUVEAU : MACROS
exports.calculateMacros = (calories, weight) => {

    // PROTEINES
    const protein = 1.8 * weight; // g

    // LIPIDES
    const fat = 1 * weight; // g

    // calories protéines + lipides
    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;

    // glucides = reste
    const carbsCalories = calories - (proteinCalories + fatCalories);
    const carbs = carbsCalories / 4;

    return {
        protein: Math.round(protein),
        fat: Math.round(fat),
        carbs: Math.round(carbs)
    };
};