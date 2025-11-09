import { useState, useRef, useEffect } from "react";
import "../styles/settings.css";
import {  Settings } from 'lucide-react';

function SettingsPopover({ onThemeChange, onVolumeChange }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Leer tema guardado o usar "light" por defecto
    return localStorage.getItem("theme") || "light";
  });
  const [volume, setVolume] = useState(50);
  const popoverRef = useRef(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cambiar tema (notifica al padre y actualiza body)
 useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    onThemeChange && onThemeChange(theme);
  }, [theme, onThemeChange]);


  // Cambiar volumen (notifica al padre)
  useEffect(() => {
    onVolumeChange && onVolumeChange(volume);
  }, [volume, onVolumeChange]);

  return (
    <div className="settings-container" ref={popoverRef}>
      {/* Botón que abre el menú */}
      <div className="navbar-links">
      <button className="settings-button" onClick={() => setOpen((p) => !p)}>
        <Settings size={20} />
            <span>Ajustes</span>
      </button>

      {/* Popover */}
      {open && (
        <div className="settings-popover">
          <h4>Configuración</h4>

          {/* Tema */}
          <div className="setting-item">
            <label>Tema</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="theme-select"
            >
              <option value="light">☀️ Claro</option>
              <option value="dark">🌙 Oscuro</option>
            </select>
          </div>

          {/* Volumen */}
          <div className="setting-item">
            <label>Volumen: {volume}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="volume-slider"
            />
          </div>

          {/* Extra opcional */}
          <div className="setting-item">
            <label>Animaciones</label>
            <select className="theme-select">
              <option value="on">Activadas</option>
              <option value="off">Desactivadas</option>
            </select>
          </div>
        </div>
      )}
    </div>

    </div>
  );
}

export default SettingsPopover;
