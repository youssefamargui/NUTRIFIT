const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// REGISTER
exports.register = async (req, res) => {

    try {

        const { email, password } = req.body;

        // vérifier si utilisateur existe
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({
                message: "Utilisateur existe déjà"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // créer utilisateur
        const user = await User.create({
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            user
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};


// LOGIN
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // chercher utilisateur
        const user = await User.findOne({ email });

        // vérifier utilisateur
        if(!user){
            return res.status(400).json({
                message: "Utilisateur introuvable"
            });
        }

        // vérifier mot de passe
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(400).json({
                message: "Mot de passe incorrect"
            });
        }

        // générer token JWT
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // réponse
        res.status(200).json({
            success: true,
            token,
            user: {
        id: user._id,
        email: user.email
    }
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};