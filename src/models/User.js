const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    firstName: String,

    lastName: String,

    birthDate: Date,

    gender: {
        type: String,
        enum: ["homme", "femme"]
    },

    height: Number,

    weight: Number,

    activityLevel: {
        type: String,
        enum: ["sedentaire", "leger", "modere", "actif"]
    },

    goal: {
        type: String,
        enum: ["perte", "maintien", "prise"]
    },

    bmr: Number,

    tdee: Number,

    targetCalories: Number,
    proteinTarget: Number,

fatTarget: Number,
carbTarget: Number

    

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);