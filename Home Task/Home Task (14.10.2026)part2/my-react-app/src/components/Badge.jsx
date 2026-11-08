function Badge({ text, color }) {
    return (
      <span className={`badge ${color}`}>
        {text}
      </span>
    );
  }
  
  export default Badge;