import { Link, useLocation } from 'react-router-dom';
import { Home, User, Zap, Clock, Settings } from 'lucide-react';
import '../Styles/Navbar.css';
import SettingsPopover from './SettingsUI';

// Barra de navegación superior
function Navbar() {
  const location = useLocation();
   const handleThemeChange = (theme) => {
    console.log("Tema:", theme);
    // Aquí puedes aplicar lógica extra si quieres
  };

    const handleVolumeChange = (vol) => {
    console.log("Volumen:", vol);
    // Aquí puedes ajustar tus efectos de sonido
  };

  // Función para verificar si la ruta está activa
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">

      <div className="navbar-links">
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


        {/* Logo/Título */}
        <Link to="/" className="navbar-title">
          <h1>P A L A B R I T A S</h1>
        </Link>

        {/* Enlaces de navegación con iconos */}
        <div className="navbar-links">
          <Link
            to="/MainMenu"
            className={`nav-link ${isActive('/MainMenu') ? 'active' : ''}`}
          >
            <Home size={20} />
            <span>Menu</span>
          </Link>

          <Link
            to="/profile"
            className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
          >
            <User size={20} />
            <span>Perfil</span>
          </Link>

  
           <SettingsPopover 
        onThemeChange={handleThemeChange}
        onVolumeChange={handleVolumeChange}
      />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;