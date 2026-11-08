import { useState } from 'react';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  function next() {
    if (step === 1) {
      if (!name || !email.includes('@')) {
        alert('Заполните имя и корректный email');
        return;
      }
    }
    if (step === 2) {
      if (!city) {
        alert('Введите город');
        return;
      }
    }
    setStep(step + 1);
  }

  return (
    <div>
      <h2>Шаг {step} из 3</h2>

      {step === 1 && (
        <div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Имя" />
          <br/>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        </div>
      )}

      {step === 2 && (
        <div>
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="Город" />
        </div>
      )}

      {step === 3 && (
        <div>
          <p>Имя: {name}</p>
          <p>Email: {email}</p>
          <p>Город: {city}</p>
        </div>
      )}

      <div>
        {step > 1 && <button onClick={() => setStep(step - 1)}>Назад</button>}
        {step < 3 && <button onClick={next}>Далее</button>}
        {step === 3 && <button onClick={() => alert('Отправлено!')}>Отправить</button>}
      </div>
    </div>
  );
}

export default MultiStepForm;