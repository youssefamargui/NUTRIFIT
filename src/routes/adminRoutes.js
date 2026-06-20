const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const adminController = require("../controllers/adminController");


// Toutes les routes admin nécessitent : connexion + rôle admin
router.use(authMiddleware, adminMiddleware);


// Liste des utilisateurs
router.get("/users", adminController.getAllUsers);

// Statistiques globales
router.get("/stats", adminController.getStats);

// Supprimer un utilisateur
router.delete("/users/:id", adminController.deleteUser);

module.exports = router;
