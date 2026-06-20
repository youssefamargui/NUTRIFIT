import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Barre de navigation + zone de contenu (commune à toutes les pages connectées)
export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <>
      <header className="navbar">
        <span className="logo">NUTRITFIRST</span>
        <nav>
          <NavLink to="/" end>Tableau de bord</NavLink>
          <NavLink to="/nutrition">Nutrition</NavLink>
          <NavLink to="/workouts">Entraînement</NavLink>
          <NavLink to="/weight">Suivi du poids</NavLink>
          <NavLink to="/profile">Profil</NavLink>
          {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
        </nav>
        <button className="btn-ghost" onClick={logout}>Déconnexion</button>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
