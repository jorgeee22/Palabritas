import { useEffect, useState } from "react";
import { getProfile } from "../utils/api"; 
import { useNavigate } from "react-router-dom";
// import "../styles/login.css";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No autorizado. Inicia sesión nuevamente.");
          navigate("/login"); 
          return;
        }

        const data = await getProfile(token); 
        setUser(data);
      } catch (err) {
        console.log(err)
        setError("No se pudo obtener la información del perfil.");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
   navigate("/login"); 
  };

  if (error) {
    return (
      <div className="login-container">
        <div className="login-box">
          <p className="error">{error}</p>
          <button onClick={() => (navigate("/login"))}>
            Ir al login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-box">
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
<>
     <Navbar />

    <div className="login-container">
      <div className="login-box">
        <h2>Perfil de usuario</h2>
        <p>
          <strong>Nombre:</strong> {user.name}
        </p>
        <p>
          <strong>Correo:</strong> {user.email}
        </p>

        <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
          Cerrar sesión
        </button>
      </div>
    </div>
    </>
  );
}
