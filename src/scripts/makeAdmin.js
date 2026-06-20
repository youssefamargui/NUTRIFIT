// Promeut un utilisateur existant en administrateur.
// Usage : node src/scripts/makeAdmin.js email@exemple.com
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const email = process.argv[2];

if (!email) {
    console.error("❌ Usage : node src/scripts/makeAdmin.js <email>");
    process.exit(1);
}

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const user = await User.findOneAndUpdate(
            { email },
            { role: "admin" },
            { new: true }
        );

        if (!user) {
            console.error(`❌ Aucun utilisateur avec l'email : ${email}`);
        } else {
            console.log(`✅ ${email} est maintenant administrateur.`);
        }
    } catch (err) {
        console.error(err.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
})();
