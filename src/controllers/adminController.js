const User = require("../models/User");


// GET /api/admin/users
// Liste de tous les utilisateurs (sans mot de passe)
exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET /api/admin/stats
// Statistiques globales pour le tableau de bord admin
exports.getStats = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();
        const admins = await User.countDocuments({ role: "admin" });

        // répartition par objectif
        const perte = await User.countDocuments({ goal: "perte" });
        const maintien = await User.countDocuments({ goal: "maintien" });
        const prise = await User.countDocuments({ goal: "prise" });

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                admins,
                goals: { perte, maintien, prise }
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// DELETE /api/admin/users/:id
// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {

    try {

        // empêcher l'admin de se supprimer lui-même
        if (req.params.id === req.user.id) {
            return res.status(400).json({
                message: "Vous ne pouvez pas supprimer votre propre compte"
            });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Utilisateur supprimé"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
