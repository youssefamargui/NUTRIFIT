import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

// petite page d'accueil après connexion (preuve que l'auth fonctionne)
function Home() {
  const { user, logout } = useAuth();
  return (
    <div className="card">
      <h1>Bienvenue 🎉</h1>
      <p>Connecté en tant que : <strong>{user?.email}</strong></p>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
}
