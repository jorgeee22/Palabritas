import { useState, useEffect } from "react";
import { getHistoriaLevels, checkHistoriaAnswer } from "../api.js";

/**
 * Hook para manejar la lógica del modo historia.
 */
export function useHistoria(id = null) {
  const [levels, setLevels] = useState([]);
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Cargar todos los niveles (o uno específico)
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const data = await getHistoriaLevels();
        setLevels(data);
        if (id) {
          const current = data.find((lvl) => lvl.id === Number(id));
          setLevel(current);
        }
      } catch (error) {
        console.error("Error al cargar niveles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLevels();
  }, [id]);

  // Función para verificar respuesta
  const verifyAnswer = async (id, userAnswer, onSuccess) => {
    try {
      const data = await checkHistoriaAnswer(id, userAnswer);
      if (data.correct) {
        setMessage("✅ ¡Correcto! Nivel completado.");
        if (onSuccess) onSuccess();
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Error en verificación:", error);
      setMessage("Ocurrió un error. Intenta de nuevo.");
    }
  };

  return {
    levels,
    level,
    loading,
    message,
    setMessage,
    verifyAnswer,
  };
}
