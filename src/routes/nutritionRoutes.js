const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const nutritionController = require("../controllers/nutritionController");


// GET meals for user
router.get(
    "/meals",
    authMiddleware,
    nutritionController.getUserMeals
);

module.exports = router;