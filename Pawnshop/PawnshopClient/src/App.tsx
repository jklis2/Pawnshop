import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";

export default function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </AlertProvider>
  );
}
