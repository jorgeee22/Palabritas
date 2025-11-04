import { loginUser } from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 👇 Llamada centralizada al backend
      
      const data = await loginUser(email, password);

      // Guarda token y datos del usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);

      alert(`Bienvenido, ${data.name}`);
      navigate("/"); // redirige al home
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales inválidas o error del servidor.");
    } finally {
      setLoading(false);
    }
  };

  test

  
  return (
    <div className="login-container">
      <div className="login-box">
        <img
          alt="Palabritas"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="login-logo"
        />
        <h2>Inicia sesión en tu cuenta</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="register-link">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
        <a style={{ position: "absolute", top: "10px" }} href="/">
  Ir al juego </a>
      </div>
    </div>
   
  )
}