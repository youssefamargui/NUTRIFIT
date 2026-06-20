import { useEffect, useState } from "react";
import api from "../services/api";

function Stat({ value, label }) {
  return (
    <div className="stat">
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  );
}

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    Promise.all([api.get("/admin/stats"), api.get("/admin/users")])
      .then(([s, u]) => {
        setStats(s.data.stats);
        setUsers(u.data.users);
      })
      .catch((err) =>
        setError(err.response?.data?.message || "Erreur de chargement")
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Suppression impossible");
    }
  };

  return (
    <div className="page">
      <h1>Espace administrateur</h1>
      <p className="muted">Gestion des utilisateurs et statistiques globales.</p>

      {loading && <p className="muted">Chargement…</p>}
      {error && <p className="error">{error}</p>}

      {stats && (
        <>
          <div className="grid grid-4">
            <Stat value={stats.totalUsers} label="Utilisateurs" />
            <Stat value={stats.admins} label="Administrateurs" />
            <Stat value={stats.goals.perte} label="Objectif perte" />
            <Stat value={stats.goals.prise} label="Objectif prise" />
          </div>

          <h2 className="section-title">Utilisateurs ({users.length})</h2>
          <div className="panel" style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nom</th>
                  <th>Rôle</th>
                  <th>Objectif</th>
                  <th>Poids</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.email}</td>
                    <td>
                      {(u.firstName || u.lastName)
                        ? `${u.firstName || ""} ${u.lastName || ""}`.trim()
                        : "—"}
                    </td>
                    <td>
                      <span className="badge">{u.role}</span>
                    </td>
                    <td>{u.goal || "—"}</td>
                    <td>{u.weight ? `${u.weight} kg` : "—"}</td>
                    <td>
                      {u.role !== "admin" && (
                        <button
                          className="btn-ghost"
                          onClick={() => handleDelete(u._id)}
                        >
                          Supprimer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
