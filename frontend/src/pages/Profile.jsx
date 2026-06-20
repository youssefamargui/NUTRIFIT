import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

// formate une date ISO -> "yyyy-mm-dd" pour l'input date
const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    birthDate: toDateInput(user?.birthDate),
    gender: user?.gender || "homme",
    height: user?.height || "",
    weight: user?.weight || "",
    activityLevel: user?.activityLevel || "sedentaire",
    goal: user?.goal || "maintien",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await api.put("/users/me", form);
      updateUser(res.data.user); // recalcule BMR/TDEE/macros côté backend
      setMessage("Profil enregistré. Vos besoins ont été recalculés.");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur d'enregistrement");
    }
  };

  return (
    <div className="page">
      <h1>Mon profil</h1>
      <p className="muted">
        Renseigne tes informations pour calculer tes besoins (F3 / F4 / F9).
      </p>

      <form className="panel" onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div>
            <label>Prénom</label>
            <input name="firstName" value={form.firstName} onChange={onChange} />
          </div>
          <div>
            <label>Nom</label>
            <input name="lastName" value={form.lastName} onChange={onChange} />
          </div>
          <div>
            <label>Date de naissance</label>
            <input type="date" name="birthDate" value={form.birthDate} onChange={onChange} />
          </div>
          <div>
            <label>Sexe</label>
            <select name="gender" value={form.gender} onChange={onChange}>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </div>
          <div>
            <label>Taille (cm)</label>
            <input type="number" name="height" value={form.height} onChange={onChange} />
          </div>
          <div>
            <label>Poids (kg)</label>
            <input type="number" name="weight" value={form.weight} onChange={onChange} />
          </div>
          <div>
            <label>Niveau d'activité</label>
            <select name="activityLevel" value={form.activityLevel} onChange={onChange}>
              <option value="sedentaire">Sédentaire</option>
              <option value="leger">Léger</option>
              <option value="modere">Modéré</option>
              <option value="actif">Actif</option>
            </select>
          </div>
          <div>
            <label>Objectif</label>
            <select name="goal" value={form.goal} onChange={onChange}>
              <option value="perte">Perte de poids</option>
              <option value="maintien">Maintien</option>
              <option value="prise">Prise de muscle</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: "1.2rem" }}>
          <button type="submit">Enregistrer</button>
        </div>

        {message && <p style={{ color: "var(--violet-light)", marginTop: "0.8rem" }}>{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
