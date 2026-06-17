const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const workoutController = require("../controllers/workoutController");


// GET liste d'exercices selon l'objectif
router.get(
    "/exercises",
    authMiddleware,
    workoutController.getUserWorkouts
);


// GET détail d'un exercice avec GIF
router.get(
    "/exercises/:id",
    authMiddleware,
    workoutController.getExerciseById
);

module.exports = router;
