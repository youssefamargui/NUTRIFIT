import { useEffect, useState } from "react";
import api from "../services/api";

export default function Weight() {
  const [logs, setLogs] = useState([]);
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const load = () => {
    api
      .get("/users/me/weight")
      .then((res) => setLogs(res.data.logs))
      .catch(() => {});
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/users/me/weight", { weight: Number(weight) });
      setWeight("");
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur d'enregistrement");
    }
  };

  // ordre chronologique pour le graphique (l'API renvoie du plus récent au plus ancien)
  const chrono = [...logs].reverse();
  const max = Math.max(...chrono.map((l) => l.weight), 1);
  const min = Math.min(...chrono.map((l) => l.weight), 0);
  const range = max - min || 1;

  return (
    <div className="page">
      <h1>Suivi du poids</h1>
      <p className="muted">Enregistre ton poids et suis ton évolution (F8).</p>

      <form className="panel row" onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
        <input
          type="number"
          step="0.1"
          placeholder="Poids du jour (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <button type="submit" style={{ whiteSpace: "nowrap" }}>Ajouter</button>
      </form>
      {error && <p className="error">{error}</p>}

      {chrono.length > 0 ? (
        <div className="panel">
          <h3 style={{ marginBottom: "0.5rem" }}>Évolution</h3>
          <div className="chart">
            {chrono.map((l) => {
              const h = 20 + ((l.weight - min) / range) * 70; // 20%..90%
              return (
                <div className="bar" key={l._id} style={{ height: `${h}%` }}>
                  <span>{l.weight}</span>
                  <small>{new Date(l.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}</small>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="muted">Aucune pesée enregistrée pour le moment.</p>
      )}
    </div>
  );
}
