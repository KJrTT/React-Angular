import { useState, useRef } from 'react';

function FileInput() {
  const inputRef = useRef(null);
  const [name, setName] = useState('');

  function handleFile() {
    const file = inputRef.current.files[0];
    if (file) {
      setName(file.name);
    }
  }

  return (
    <div>
      <h2>Файл</h2>
      <input type="file" ref={inputRef} onChange={handleFile} />
      {name && <p>Выбран: {name}</p>}
    </div>
  );
}

export default FileInput;