import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import AddEmployee from './routes/AddEmployee';
import Employees from './routes/Employees';

export default function App() {
  return (
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
        <Route
          path="/dashboard/add-employee"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddEmployee/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/employees"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Employees/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
