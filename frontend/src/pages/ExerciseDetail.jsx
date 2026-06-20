import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function ExerciseDetail() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/workouts/exercises/${id}`)
      .then((res) => setWorkout(res.data.workout))
      .catch((err) =>
        setError(err.response?.data?.message || "Exercice introuvable")
      )
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="page">
      <Link to="/workouts" className="muted">← Retour aux exercices</Link>

      {loading && <p className="muted">Chargement…</p>}
      {error && <p className="error">{error}</p>}

      {workout && (
        <>
          <h1 style={{ marginTop: "1rem" }}>{workout.name || "Exercice"}</h1>
          <div className="row" style={{ flexWrap: "wrap", margin: "0.6rem 0 1.5rem" }}>
            {workout.bodyPart && <span className="badge">{workout.bodyPart}</span>}
            {workout.equipment && <span className="badge">{workout.equipment}</span>}
          </div>

          <div className="grid grid-2">
            {workout.image ? (
              <img
                src={workout.image}
                alt={workout.name}
                style={{ width: "100%", borderRadius: "var(--radius)" }}
              />
            ) : (
              <div className="panel muted">Pas d'image disponible.</div>
            )}

            <div className="panel">
              <h2 style={{ marginBottom: "0.8rem" }}>Muscles ciblés</h2>
              {workout.muscles && workout.muscles.length > 0 ? (
                <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.8 }}>
                  {workout.muscles.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Non renseignés.</p>
              )}
            </div>
          </div>

          {workout.description && (
            <>
              <h2 className="section-title">Description</h2>
              <div
                className="panel"
                style={{ lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: workout.description }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
