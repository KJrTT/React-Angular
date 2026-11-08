function StatCard({ label, value, color, icon }) {
    return (
      <div className={`stat-card ${color || ''}`}>
        <div className="stat-value">
          {icon && <span className="stat-icon">{icon}</span>}
          {value}
        </div>
        <div className="stat-label">{label}</div>
      </div>
    );
  }
  
  export default StatCard;