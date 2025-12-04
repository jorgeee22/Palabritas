import { useState, useEffect } from "react";

export default function SettingsPopover({ isOpen, onClose, onThemeChange }) {
  if (!isOpen) return null;

  const [theme, setTheme] = useState("light");
  const [volume, setVolume] = useState(50);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Aplicar tema al body
  useEffect(() => {
    document.body.dataset.theme = theme;
    if (onThemeChange) onThemeChange(theme);
  }, [theme]);




  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-popover" onClick={(e) => e.stopPropagation()}>
        <h2 className="settings-title">Ajustes</h2>

        {/* Tema */}
        <div className="setting-item">
          <label className="setting-label">Tema</label>
          <div className="setting-row">
            <button
              className={`setting-btn-claro ${theme === "light" ? "active" : ""}`}
              onClick={() => setTheme("light")}
            >
              Claro
            </button>
            <button
              className={`setting-btn-oscuro ${theme === "dark" ? "active" : ""}`}
              onClick={() => setTheme("dark")}
            >
              Oscuro
            </button>
          </div>
        </div>

        <button className="close-settings-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
