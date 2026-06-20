import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Nutrition() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/nutrition/recipes")
      .then((res) => setData(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Impossible de charger les recettes")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1>Programme nutrition</h1>
      <p className="muted">Recettes filtrées selon tes calories cibles (F5).</p>

      {data && (
        <p className="badge" style={{ marginBottom: "1rem" }}>
          Objectif : {Math.round(data.targetCalories)} kcal/jour · ~
          {data.maxCaloriesPerMeal} kcal/repas
        </p>
      )}

      {loading && <p className="muted">Chargement des recettes…</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="grid grid-3">
          {data.meals.map((meal) => (
            <Link className="media-card" key={meal.id} to={`/nutrition/${meal.id}`}>
              <img src={meal.image} alt={meal.title} />
              <div className="body">
                <h3>{meal.title}</h3>
                {meal.calories != null && (
                  <span className="badge">{Math.round(meal.calories)} kcal</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {data && data.meals.length === 0 && (
        <p className="muted">Aucune recette trouvée.</p>
      )}
    </div>
  );
}
