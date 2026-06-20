const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const adminRoutes = require("./routes/adminRoutes");

// config dotenv
dotenv.config();

// init app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/admin", adminRoutes);

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
