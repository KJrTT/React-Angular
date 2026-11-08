import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Успешный вход!\nEmail: ${email}`);
  }
  const isValid = email.trim() !== '' && password.trim() !== '';

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <div>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button type="submit" disabled={!isValid}>
        Войти
      </button>
    </form>
  );
}
export default LoginForm;