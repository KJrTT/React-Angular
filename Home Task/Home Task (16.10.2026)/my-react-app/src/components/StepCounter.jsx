import { useState } from 'react';

function StepCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div>
      <h2>Счётчик: {count}</h2>
      <div>
        <button onClick={() => setCount((prev) => prev - step)}>-{step}</button>
        <button onClick={() => setCount((prev) => prev + step)}>+{step}</button>
      </div>
      <div>
        <label>Шаг: </label>
        <input 
          type="number" 
          value={step} 
          onChange={(e) => setStep(Number(e.target.value))} 
        />
      </div>
    </div>
  );
}
export default StepCounter;