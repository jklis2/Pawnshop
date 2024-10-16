import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginBackground from "../assets/LoginBackground.svg";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authLogin(login, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid login or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url(${LoginBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-30 p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center">Employee Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Login</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 w-full mb-4 rounded hover:bg-teal-800 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
