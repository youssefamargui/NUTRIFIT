const workoutApi = require("../services/workoutApiService");
const User = require("../models/User");


// GET WORKOUTS FOR USER
exports.getUserWorkouts = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        const exercises = await workoutApi.getAllExercises();

        let filtered = exercises;

        // 🔥 FILTRAGE SELON OBJECTIF
        if (user.goal === "perte") {
            filtered = exercises.filter(ex =>
                ex.bodyPart === "cardio" ||
                ex.target === "abs"
            );
        }

        if (user.goal === "prise") {
            filtered = exercises.filter(ex =>
                ex.bodyPart === "chest" ||
                ex.bodyPart === "back"
            );
        }

        if (user.goal === "maintien") {
            filtered = exercises.slice(0, 20);
        }

        // 🔥 CLEAN DATA
        const cleanWorkouts = filtered.slice(0, 10).map(ex => ({
            id: ex.id,
            name: ex.name,
            bodyPart: ex.bodyPart,
            equipment: ex.equipment,
            gif: ex.gifUrl
        }));

        res.status(200).json({
            success: true,
            goal: user.goal,
            workouts: cleanWorkouts
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};