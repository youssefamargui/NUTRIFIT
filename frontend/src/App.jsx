import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Nutrition from "./pages/Nutrition";
import Workouts from "./pages/Workouts";
import Weight from "./pages/Weight";
import Admin from "./pages/Admin";
import RecipeDetail from "./pages/RecipeDetail";
import ExerciseDetail from "./pages/ExerciseDetail";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Pages publiques */}
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

      {/* Pages protégées (nécessitent une connexion) */}
      {user ? (
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutrition/:id" element={<RecipeDetail />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:id" element={<ExerciseDetail />} />
          <Route path="/weight" element={<Weight />} />
          <Route
            path="/admin"
            element={user.role === "admin" ? <Admin /> : <Navigate to="/" />}
          />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}
