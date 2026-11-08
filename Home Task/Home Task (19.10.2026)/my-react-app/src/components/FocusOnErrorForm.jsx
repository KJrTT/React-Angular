import { useState, useRef } from 'react';

function FocusOnErrorForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const nameInput = useRef(null);
  const emailInput = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      nameInput.current.focus();
      return;
    }

    if (!email.includes('@')) {
      emailInput.current.focus();
      return;
    }

    alert('Всё ок!');
  }

  return (
    <div>
      <h2>Фокус на ошибку</h2>
      <form onSubmit={handleSubmit}>
        <input 
          ref={nameInput}
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Имя" 
        />
        <input 
          ref={emailInput}
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" 
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default FocusOnErrorForm;