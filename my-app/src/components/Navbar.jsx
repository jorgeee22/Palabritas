import { Link, useLocation } from 'react-router-dom';
import { Home, User, Zap, Clock } from 'lucide-react';
import '../Styles/Navbar.css';

// Barra de navegación superior
function Navbar() {
  const location = useLocation();

  // Función para verificar si la ruta está activa
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Título */}
        <Link to="/" className="navbar-title">
          <h1>Palabritas</h1>
        </Link>

        {/* Enlaces de navegación con iconos */}
        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <Home size={20} />
            <span>Inicio</span>
          </Link>

          <Link
            to="/profile"
            className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
          >
            <User size={20} />
            <span>Perfil</span>
          </Link>

          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <Clock size={20} />
            <span>Modo Clásico</span>
          </Link>

          <Link
            to="/GameThematic"
            className={`nav-link ${isActive('/GameThematic') ? 'active' : ''}`}
          >
            <Zap size={20} />
            <span>Modo Rápido</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;