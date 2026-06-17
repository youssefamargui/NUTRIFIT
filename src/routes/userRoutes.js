const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const userController = require("../controllers/userController");
const weightController = require("../controllers/weightController");


// GET profil
router.get(
    "/me",
    authMiddleware,
    userController.getProfile
);


// UPDATE profil
router.put(
    "/me",
    authMiddleware,
    userController.updateProfile
);


// Ajouter une pesée (cahier : POST /api/users/me/weight)
router.post(
    "/me/weight",
    authMiddleware,
    weightController.addWeight
);


// Historique des pesées (cahier : GET /api/users/me/weight)
router.get(
    "/me/weight",
    authMiddleware,
    weightController.getWeightHistory
);

module.exports = router;
