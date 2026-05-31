const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try {

        // récupérer token
        const authHeader = req.headers.authorization;

        // vérifier token existe
        if(!authHeader){
            return res.status(401).json({
                message: "Accès refusé, token manquant"
            });
        }

        // format : Bearer TOKEN
        const token = authHeader.split(" ")[1];

        // vérifier token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // stocker user id
        req.user = decoded;

        next();

    } catch(error){

        return res.status(401).json({
            message: "Token invalide"
        });

    }

};

module.exports = authMiddleware;