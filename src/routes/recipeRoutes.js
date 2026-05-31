const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipeController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");


// CREATE RECIPE
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    recipeController.createRecipe
);


// GET ALL RECIPES
router.get(
    "/",
    recipeController.getRecipes
);


// GET RECIPE BY ID
router.get(
    "/:id",
    recipeController.getRecipeById
);


// UPDATE RECIPE
router.put(
    "/:id",
    authMiddleware,
    upload.single("image"),
    recipeController.updateRecipe
);


// DELETE RECIPE
router.delete(
    "/:id",
    authMiddleware,
    recipeController.deleteRecipe
);


module.exports = router;