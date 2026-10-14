function Card({ title, children }) {
    return (
      <div
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: 10,
          padding: 16,
          marginBottom: 12,
          maxWidth: 360,
        }}
      >
        <h3>{title}</h3>
        {children}
      </div>
    );
  }
  
  export default Card;