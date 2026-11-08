import { useState, useEffect, useRef } from 'react';

function InactivityTimerForm() {
  const [text, setText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const timer = useRef(null);

  function restartTimer() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setShowHint(false);
    timer.current = setTimeout(() => {
      setShowHint(true);
    }, 30000);
  }

  useEffect(() => {
    restartTimer();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function handleChange(e) {
    setText(e.target.value);
    restartTimer(); 
  }

  return (
    <div>
      <h2>Таймер бездействия</h2>
      <input 
        value={text} 
        onChange={handleChange} 
        placeholder="Что-нибудь напиши" 
      />
      {showHint && <p>Всё ещё с нами?</p>}
    </div>
  );
}

export default InactivityTimerForm;