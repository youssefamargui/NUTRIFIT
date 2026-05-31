const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const weightController = require("../controllers/weightController");

// Ajouter un poids
router.post(
    "/",
    authMiddleware,
    weightController.addWeight
);

// Historique des poids
router.get(
    "/",
    authMiddleware,
    weightController.getWeightHistory
);

module.exports = router;