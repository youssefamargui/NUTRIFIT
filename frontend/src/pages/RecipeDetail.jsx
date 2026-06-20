import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function RecipeDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/nutrition/recipes/${id}`)
      .then((res) => setMeal(res.data.meal))
      .catch((err) =>
        setError(err.response?.data?.message || "Recette introuvable")
      )
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="page">
      <Link to="/nutrition" className="muted">← Retour aux recettes</Link>

      {loading && <p className="muted">Chargement…</p>}
      {error && <p className="error">{error}</p>}

      {meal && (
        <>
          <h1 style={{ marginTop: "1rem" }}>{meal.title}</h1>
          <div className="row" style={{ flexWrap: "wrap", margin: "0.6rem 0 1.5rem" }}>
            {meal.calories != null && (
              <span className="badge">{Math.round(meal.calories)} kcal</span>
            )}
            {meal.servings != null && (
              <span className="badge">{meal.servings} portions</span>
            )}
            {meal.readyInMinutes != null && (
              <span className="badge">{meal.readyInMinutes} min</span>
            )}
          </div>

          <div className="grid grid-2">
            <img
              src={meal.image}
              alt={meal.title}
              style={{ width: "100%", borderRadius: "var(--radius)" }}
            />

            <div className="panel">
              <h2 style={{ marginBottom: "0.8rem" }}>Ingrédients</h2>
              {meal.ingredients && meal.ingredients.length > 0 ? (
                <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.8 }}>
                  {meal.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Aucun ingrédient renseigné.</p>
              )}
            </div>
          </div>

          {meal.instructions && (
            <>
              <h2 className="section-title">Préparation</h2>
              <div
                className="panel"
                style={{ lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: meal.instructions }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
