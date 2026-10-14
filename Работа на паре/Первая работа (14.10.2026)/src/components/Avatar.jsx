function Avatar({ name, size = 48 }) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: '#6366f1',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: size / 2,
        }}
      >
        {name[0]}
      </div>
    );
  }
  
  export default Avatar;