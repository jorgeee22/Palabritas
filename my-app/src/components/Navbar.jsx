import { Link, useLocation } from "react-router-dom";
import { Home, User, Zap, Clock, Star } from "lucide-react";
import "../styles/Navbar.css"

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return (
      location.pathname === path ||
      location.pathname.startsWith(path + "/")
    );
  };

  return (
    <nav className="nav-main">
      <div className="nav-container">

        {/* LEFT */}
        <div className="nav-left">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            <Clock size={18} />
            <span className="nav-text">Palabra del día</span>
          </Link>

          <Link to="/GameThematic" className={`nav-link ${isActive("/GameThematic") ? "active" : ""}`}>
            <Zap size={18} />
            <span className="nav-text">Modo Temático</span>
          </Link>

          <Link to="/historia" className={`nav-link ${isActive("/historia") ? "active" : ""}`}>
            <Star size={18} />
            <span className="nav-text">Modo Historia</span>
          </Link>
        </div>

        {/* CENTER TITLE */}
        <Link className="nav-title" to="/">
          P A L A B R I T A S
        </Link>

        {/* RIGHT */}
        <div className="nav-right">
          <Link to="/MainMenu" className={`nav-link ${isActive("/MainMenu") ? "active" : ""}`}>
            <Home size={18} />
            <span className="nav-text">Menu</span>
          </Link>

          <Link to="/profile" className={`nav-link ${isActive("/profile") ? "active" : ""}`}>
            <User size={18} />
            <span className="nav-text">Perfil</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
