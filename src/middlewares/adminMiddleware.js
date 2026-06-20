// Vérifie que l'utilisateur connecté est administrateur.
// À utiliser APRÈS authMiddleware (qui remplit req.user à partir du token).
const adminMiddleware = (req, res, next) => {

    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "Accès réservé à l'administrateur"
        });
    }

    next();

};

module.exports = adminMiddleware;
