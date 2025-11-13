export function ThematicAchievements({ stats }) {
  return (
    <div className="thematic-achievements">
      <h2>Logros por tema</h2>
      <div className="theme-list">
        {Object.entries(stats).map(([theme, data]) => (
          <div key={theme} className="theme-card">
            <div className="theme-left">
              <span className="shield">🏅 {data.level}</span>
              <span className="theme-name">{theme}</span>
            </div>
            <div className="theme-right">
              <span className="points">{data.count}</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(data.count / data.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
