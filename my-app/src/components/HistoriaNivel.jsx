import React from "react";
//import "../styles/HistoryMode.css"

export default function HistoriaNivel({ level, onClick }) {
  const { id, status } = level;

  const getColor = () => {
    switch (status) {
      case "completed":
        return "bg-success";
      case "unlocked":
        return "bg-warning";
      default:
        return "bg-secondary";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`historia-nivel btn ${getColor()} text-white fw-bold rounded-pill px-4 py-2`}
      style={{ width: "200px" }}
    >
      {status === "locked" ? "🔒 Nivel " + id : "Nivel " + id}
    </button>
  );
}
