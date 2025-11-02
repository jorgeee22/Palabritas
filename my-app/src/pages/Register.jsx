import { useState, useEffect } from "react";
import { registerUser } from "../utils/api"; 
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Register() {
  const [name, setName] = useState("");
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
      const data = await registerUser(name, email, password); // 👈 llamada a la API
      
      // Guarda token y nombre del usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);

      alert(`Usuario ${data.name} registrado correctamente`);
      navigate("/login"); // Redirige al login
    } catch (err) {
      setError("Error al registrar el usuario. Puede que el correo ya exista.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          alt="Palabritas"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="login-logo"
        />
        <h2>Crear cuenta</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="register-link">
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
        <a style={{ position: "absolute", top: "10px" }} href="/">
  Ir al juego </a>
      </div>
    </div>

    
  );
}
