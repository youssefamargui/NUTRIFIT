import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Stat({ value, label }) {
  return (
    <div className="stat">
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);

  // recharge le profil au montage (besoins toujours à jour)
  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => updateUser(res.data.user))
      .catch(() => {})
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profilComplet = user?.targetCalories;

  return (
    <div className="page">
      <h1>Bonjour {user?.firstName || ""}</h1>
      <p className="muted">Vue d'ensemble de ta journée (F7).</p>

      {loading && <p className="muted">Chargement…</p>}

      {!loading && !profilComplet && (
        <div className="panel">
          <h3>Complète ton profil pour démarrer</h3>
          <p className="muted" style={{ margin: "0.6rem 0 1rem" }}>
            On a besoin de ta taille, ton poids et ton objectif pour calculer
            tes besoins caloriques.
          </p>
          <Link className="btn" to="/profile">Remplir mon profil</Link>
        </div>
      )}

      {!loading && profilComplet && (
        <>
          <div className="grid grid-4">
            <Stat value={Math.round(user.bmr)} label="BMR (kcal)" />
            <Stat value={Math.round(user.tdee)} label="TDEE (kcal)" />
            <Stat value={Math.round(user.targetCalories)} label="Calories cibles / jour" />
            <Stat value={user.goal} label="Objectif" />
          </div>

          <h2 className="section-title">Macronutriments visés</h2>
          <div className="grid grid-3">
            <Stat value={`${Math.round(user.proteinTarget)} g`} label="Protéines" />
            <Stat value={`${Math.round(user.carbTarget)} g`} label="Glucides" />
            <Stat value={`${Math.round(user.fatTarget)} g`} label="Lipides" />
          </div>

          <h2 className="section-title">Accès rapide</h2>
          <div className="grid grid-3">
            <Link className="panel" to="/nutrition">
              <h3>Repas du jour</h3>
              <p className="muted">Recettes adaptées à tes calories.</p>
            </Link>
            <Link className="panel" to="/workouts">
              <h3>Séance du jour</h3>
              <p className="muted">Exercices selon ton objectif.</p>
            </Link>
            <Link className="panel" to="/weight">
              <h3>Suivi du poids</h3>
              <p className="muted">Enregistre et suis ta progression.</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
