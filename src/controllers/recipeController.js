const Recipe = require("../models/Recipe");


// CREATE RECIPE
exports.createRecipe = async (req, res) => {

    try {

        const recipe = await Recipe.create({

            title: req.body.title,

            description: req.body.description,

            calories: req.body.calories,

            image: req.file
                ? req.file.filename
                : null,

            user: req.user.id
        });

        res.status(201).json({
            success: true,
            recipe
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};


// GET ALL RECIPES
exports.getRecipes = async (req, res) => {

    try {

        const recipes = await Recipe.find()
        .populate("user", "email");

        res.status(200).json({
            success: true,
            recipes
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};
// UPDATE RECIPE
exports.updateRecipe = async (req, res) => {

    try {

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recette introuvable"
            });
        }

        // vérifier propriétaire
        if (recipe.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Accès refusé"
            });
        }

        // update champs texte
        recipe.title = req.body.title || recipe.title;
        recipe.description = req.body.description || recipe.description;
        recipe.calories = req.body.calories || recipe.calories;

        // 🔥 UPDATE IMAGE ICI (IMPORTANT)
        if (req.file) {
            recipe.image = req.file.filename;
        }

        await recipe.save();

        res.status(200).json({
            success: true,
            recipe
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
// DELETE RECIPE
exports.deleteRecipe = async (req, res) => {

    try {

        const recipe = await Recipe.findById(req.params.id);

        // vérifier recette existe
        if(!recipe){
            return res.status(404).json({
                message: "Recette introuvable"
            });
        }

        // vérifier propriétaire
        if(recipe.user.toString() !== req.user.id){
            return res.status(403).json({
                message: "Accès refusé"
            });
        }

        // supprimer
        await recipe.deleteOne();

        res.status(200).json({
            success: true,
            message: "Recette supprimée"
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};
// GET RECIPE BY ID
exports.getRecipeById = async (req, res) => {

    try {

        const recipe = await Recipe.findById(req.params.id)
        .populate("user", "email");

        if(!recipe){
            return res.status(404).json({
                message: "Recette introuvable"
            });
        }

        res.status(200).json({
            success: true,
            recipe
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};