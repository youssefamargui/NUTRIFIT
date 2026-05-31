const WeightLog = require("../models/WeightLog");


// POST /api/users/me/weight
exports.addWeight = async (req, res) => {

    try {

        const weightLog = await WeightLog.create({

            userId: req.user.id,
            weight: req.body.weight

        });

        res.status(201).json({
            success: true,
            weightLog
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};


// GET /api/users/me/weight
exports.getWeightHistory = async (req, res) => {

    try {

        const logs = await WeightLog.find({

            userId: req.user.id

        }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            logs
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};
