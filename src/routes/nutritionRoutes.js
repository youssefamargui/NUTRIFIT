const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const nutritionController = require("../controllers/nutritionController");


// GET recettes adaptées aux calories cibles
router.get(
    "/recipes",
    authMiddleware,
    nutritionController.getUserMeals
);


// GET détail d'une recette
router.get(
    "/recipes/:id",
    authMiddleware,
    nutritionController.getMealById
);

module.exports = router;
