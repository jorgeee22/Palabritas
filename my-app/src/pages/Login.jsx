import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import "../styles/login.css";
import Navbar from "../components/Navbar";

export default function Login() {
  // 👇 sin TypeScript; solo JS
  const [step, setStep] = useState("email"); // "email" | "password"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const passwordRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/profile");
  }, [navigate]);

  // Validación básica (solo front)
  const isEmailValid = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());

  const proceedToPassword = () => {
    if (!isEmailValid(email)) {
      setError("Ingresa un correo válido.");
      return;
    }
    setError("");
    setStep("password");
    // foco en password cuando aparece
    setTimeout(() => {
      if (passwordRef.current) passwordRef.current.focus();
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (step === "email") {
      proceedToPassword();
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);
      navigate("/");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales inválidas o error del servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Botones sociales (UI-only)
  const handleGoogle = () => alert("Google Sign-In (solo interfaz)");
  const handleApple = () => alert("Apple Sign-In (solo interfaz)");

  return (
    <>
     <Navbar />
    <div className="login-container">
      <div className="login-box">
        <img
          alt="Palabritas"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="login-logo"
        />

        <h2>Inicia sesión en tu cuenta</h2>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="tucorreo@dominio.com"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && step === "email") {
                e.preventDefault();
                proceedToPassword();
              }
            }}
          />

          {step === "password" && (
            <>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {step === "email" ? "Continuar" : loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="divider"><span>o</span></div>

        <div className="social-container">
          <button type="button" className="social-btn google" onClick={handleGoogle}>
            <span className="social-ico">G</span> Continuar con Google
          </button>
          <button type="button" className="social-btn apple" onClick={handleApple}>
            <span className="social-ico"></span> Continuar con Apple
          </button>
        </div>

        <p className="terms">
          Al continuar, aceptas los{" "}
          <a href="#" onClick={(e)=>e.preventDefault()}>Términos de Servicio</a>,{" "}
          <a href="#" onClick={(e)=>e.preventDefault()}>Términos de Venta</a> y la{" "}
          <a href="#" onClick={(e)=>e.preventDefault()}>Política de Privacidad</a>.
        </p>

        <p className="register-link">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      
      </div>
    </div>
   </>
  )
}
