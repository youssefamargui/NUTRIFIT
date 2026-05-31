const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const workoutController = require("../controllers/workoutController");


// GET workouts
router.get(
    "/",
    authMiddleware,
    workoutController.getUserWorkouts
);

module.exports = router;