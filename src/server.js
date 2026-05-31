const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const weightRoutes = require("./routes/weightRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

// config dotenv
dotenv.config();

// init app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files (images uploads)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// routes API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/weights", weightRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/workouts", workoutRoutes);

// test route
app.get("/", (req, res) => {
    res.send("Backend NUTRITFIRST fonctionne 🚀");
});

// connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connecté"))
.catch((err) => console.log(err));

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});