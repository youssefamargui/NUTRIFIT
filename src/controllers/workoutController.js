const workoutApi = require("../services/workoutApiService");
const User = require("../models/User");


// GET WORKOUTS FOR USER
// GET /api/workouts/exercises
exports.getUserWorkouts = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        const exercises = await workoutApi.getAllExercises();

        let filtered = exercises;

        // 🔥 FILTRAGE SELON OBJECTIF (catégories Wger)
        if (user.goal === "perte") {
            filtered = exercises.filter(ex =>
                ex.category &&
                (ex.category.name === "Cardio" || ex.category.name === "Abs")
            );
        }

        if (user.goal === "prise") {
            filtered = exercises.filter(ex =>
                ex.category &&
                (ex.category.name === "Chest" || ex.category.name === "Back")
            );
        }

        if (user.goal === "maintien") {
            filtered = exercises.slice(0, 20);
        }

        // 🔥 CLEAN DATA
        const cleanWorkouts = filtered.slice(0, 10).map(ex => ({
            id: ex.id,
            name: workoutApi.getName(ex),
            bodyPart: ex.category ? ex.category.name : null,
            equipment: (ex.equipment || []).map(e => e.name).join(", "),
            image: workoutApi.getImage(ex)
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


// GET EXERCISE DETAIL BY ID
// GET /api/workouts/exercises/:id
exports.getExerciseById = async (req, res) => {

    try {

        const ex = await workoutApi.getExerciseById(req.params.id);

        if (!ex || !ex.id) {
            return res.status(404).json({
                message: "Exercice introuvable"
            });
        }

        const tr = (ex.translations || []).find(t => t.language === 2)
            || (ex.translations || [])[0]
            || {};

        // 🔥 CLEAN DATA
        const cleanWorkout = {
            id: ex.id,
            name: tr.name,
            bodyPart: ex.category ? ex.category.name : null,
            equipment: (ex.equipment || []).map(e => e.name).join(", "),
            muscles: (ex.muscles || []).map(m => m.name),
            image: workoutApi.getImage(ex),
            description: tr.description
        };

        res.status(200).json({
            success: true,
            workout: cleanWorkout
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
