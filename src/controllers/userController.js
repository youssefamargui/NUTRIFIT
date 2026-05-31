const User = require("../models/User");
const nutritionService = require("../services/nutritionService");


// GET /api/users/me
exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// PUT /api/users/me
exports.updateProfile = async (req, res) => {

    try {

        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        // mise à jour des champs
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.birthDate = req.body.birthDate || user.birthDate;
        user.gender = req.body.gender || user.gender;
        user.height = req.body.height || user.height;
        user.weight = req.body.weight || user.weight;
        user.activityLevel = req.body.activityLevel || user.activityLevel;
        user.goal = req.body.goal || user.goal;

        // calcul âge
        const age = user.birthDate
            ? new Date().getFullYear() - new Date(user.birthDate).getFullYear()
            : 25;

        // BMR
        const bmr = nutritionService.calculateBMR(
            user.weight,
            user.height,
            age,
            user.gender
        );

        // TDEE
        const tdee = nutritionService.calculateTDEE(
            bmr,
            user.activityLevel
        );

        // calories objectif
        const targetCalories = nutritionService.calculateCalories(
            tdee,
            user.goal
        );
        // macros
        const macros = nutritionService.calculateMacros(
            targetCalories,
            user.weight
        );

        // save calculs
        user.bmr = bmr;
        user.tdee = tdee;
        user.targetCalories = targetCalories;
        user.proteinTarget = macros.protein;
        user.fatTarget = macros.fat;
        user.carbTarget = macros.carbs;


        await user.save();

        // IMPORTANT: enlever password proprement
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            user: userResponse
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};