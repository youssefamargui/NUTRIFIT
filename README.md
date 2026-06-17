# 🥗💪 NUTRITFIRST — Backend

API REST pour **NUTRITFIRST**, une application web de coaching nutritionnel et sportif personnalisé.
L'utilisateur s'inscrit, renseigne son profil (taille, poids, âge, objectif), et reçoit
automatiquement ses besoins caloriques, un programme de nutrition et un programme d'entraînement adaptés.

## 🧱 Stack technique

| Couche | Technologie |
|---|---|
| Serveur | Node.js + Express |
| Base de données | MongoDB + Mongoose |
| Authentification | JWT + bcrypt |
| Variables d'env. | dotenv |
| API recettes | [Spoonacular](https://spoonacular.com/food-api) |
| API exercices | [Wger](https://wger.de/en/software/api) |

## 📁 Structure du projet

```
src/
├── controllers/   # logique des routes (auth, user, weight, nutrition, workout)
├── middlewares/   # authMiddleware (vérification JWT)
├── models/        # schémas Mongoose (User, WeightLog)
├── routes/        # définition des endpoints
├── services/      # calculs BMR/TDEE/macros + appels API externes
└── server.js      # point d'entrée
```

## ⚙️ Installation

### Prérequis
- Node.js v20+
- MongoDB (local ou Atlas)

### Étapes

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier .env (voir section ci-dessous)

# 3. Lancer en développement (auto-reload)
npm run dev

# 4. Ou lancer en production
npm start
```

Le serveur démarre sur `http://localhost:5000` (par défaut).

## 🔐 Variables d'environnement (`.env`)

Crée un fichier `.env` à la racine du projet :

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nutritfirst
JWT_SECRET=remplace_par_une_chaine_secrete
SPOONACULAR_API_KEY=ta_cle_spoonacular
```

> ⚠️ Le fichier `.env` ne doit **jamais** être versionné (ajoute-le au `.gitignore`).

### Obtenir les clés API

| Variable | Comment l'obtenir | Obligatoire |
|---|---|---|
| `SPOONACULAR_API_KEY` | Créer un compte gratuit sur [spoonacular.com/food-api](https://spoonacular.com/food-api/console) → onglet *Profile* → copier la clé. Quota gratuit : **150 requêtes/jour**. | ✅ Oui |
| *(Wger)* | **Aucune clé requise** — l'API Wger est publique et gratuite. | ❌ Non |

## 📡 API REST

Toutes les réponses sont en JSON. Les routes protégées exigent l'en-tête :
`Authorization: Bearer <token>`

### Authentification
| Méthode | Route | Description | Protégée |
|---|---|---|---|
| POST | `/api/auth/register` | Création de compte | Non |
| POST | `/api/auth/login` | Connexion + renvoi du token JWT | Non |

### Utilisateur
| Méthode | Route | Description | Protégée |
|---|---|---|---|
| GET | `/api/users/me` | Profil de l'utilisateur connecté | Oui |
| PUT | `/api/users/me` | Mise à jour du profil (recalcule BMR/TDEE/macros) | Oui |
| POST | `/api/users/me/weight` | Ajouter une pesée | Oui |
| GET | `/api/users/me/weight` | Historique des pesées | Oui |

### Nutrition (proxy Spoonacular)
| Méthode | Route | Description | Protégée |
|---|---|---|---|
| GET | `/api/nutrition/recipes` | Recettes adaptées aux calories cibles | Oui |
| GET | `/api/nutrition/recipes/:id` | Détail d'une recette | Oui |

### Entraînement (proxy Wger)
| Méthode | Route | Description | Protégée |
|---|---|---|---|
| GET | `/api/workouts/exercises` | Liste d'exercices selon l'objectif | Oui |
| GET | `/api/workouts/exercises/:id` | Détail d'un exercice | Oui |

## 🧮 Calculs (formule de Mifflin-St Jeor)

| Indicateur | Formule |
|---|---|
| BMR Homme | `10 × poids + 6,25 × taille − 5 × âge + 5` |
| BMR Femme | `10 × poids + 6,25 × taille − 5 × âge − 161` |
| TDEE | `BMR × coefficient d'activité` (1,2 → 1,725) |
| Calories cibles | `TDEE − 500` (perte) / `TDEE` (maintien) / `TDEE + 300` (prise) |
| Protéines | `1,8 g / kg` |
| Lipides | `1 g / kg` |
| Glucides | reste des calories |

## 🗄️ Modèle de données

- **users** : email, password (hashé), firstName, lastName, birthDate, gender, height,
  weight, activityLevel, goal, bmr, tdee, targetCalories, proteinTarget, fatTarget, carbTarget
- **weight_logs** : userId (ref), weight, date

## 🧪 Tester l'API

Utilise [Postman](https://www.postman.com/) ou `curl`. Exemple de flux :

```bash
# Inscription
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"sara@example.com","password":"123456"}'

# Connexion (récupère le token)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sara@example.com","password":"123456"}'

# Recettes (route protégée)
curl http://localhost:5000/api/nutrition/recipes \
  -H "Authorization: Bearer <TON_TOKEN>"
```
