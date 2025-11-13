export function ClassicAchievements({ stats }) {
  return (
    <div className="classic-achievements">
      <h2>Racha de palabras</h2>
      <div className="streak-card">
        <p>🔥 Racha actual: {stats.currentStreak}</p>
        <p>🏆 Mejor racha: {stats.bestStreak}</p>
        <p>📈 Palabras totales: {stats.totalWords}</p>
      </div>
    </div>
  );
}
