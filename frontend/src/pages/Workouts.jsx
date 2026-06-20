import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Workouts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/workouts/exercises")
      .then((res) => setData(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Impossible de charger les exercices")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1>Programme d'entraînement</h1>
      <p className="muted">Exercices adaptés à ton objectif (F6).</p>

      {data && (
        <p className="badge" style={{ marginBottom: "1rem" }}>
          Objectif : {data.goal}
        </p>
      )}

      {loading && <p className="muted">Chargement des exercices…</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="grid grid-3">
          {data.workouts.map((ex) => (
            <Link className="media-card" key={ex.id} to={`/workouts/${ex.id}`}>
              {ex.image && <img src={ex.image} alt={ex.name} />}
              <div className="body">
                <h3>{ex.name || "Exercice"}</h3>
                {ex.bodyPart && <span className="badge">{ex.bodyPart}</span>}
                {ex.equipment && (
                  <p className="muted" style={{ marginTop: "0.4rem", fontSize: "0.8rem" }}>
                    {ex.equipment}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {data && data.workouts.length === 0 && (
        <p className="muted">Aucun exercice trouvé.</p>
      )}
    </div>
  );
}
