function Button({ children, variant = 'primary', onClick, disabled = false }) {
    const colors = {
      primary: '#3b82f6',
      secondary: '#6b7280',
      danger: '#ef4444',
    };
  
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          background: colors[variant],
          color: 'white',
          border: 'none',
          borderRadius: 8,
          padding: '10px 16px',
          fontSize: 14,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {children}
      </button>
    );
  }
  
  export default Button;