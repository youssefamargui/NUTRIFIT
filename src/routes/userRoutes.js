const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const userController = require("../controllers/userController");


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

module.exports = router;