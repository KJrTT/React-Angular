import { useState } from 'react';

function ReviewForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('5');
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);

    setName('');
    setRating('5');
    setText('');
  }

  const nameError = name.length < 2;
  const textError = text.length < 10;
  const canSubmit = !nameError && !textError;

  return (
    <div>
      <h2>Оставить отзыв</h2>
      {sent && <p style={{ color: 'green' }}>Спасибо!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Ваше имя" 
          />
          {nameError && <span style={{ color: 'red' }}> Имя слишком короткое</span>}
        </div>

        <div>
          <select value={rating} onChange={e => setRating(e.target.value)}>
            <option value="5">5 звёзд</option>
            <option value="4">4 звезды</option>
            <option value="3">3 звезды</option>
            <option value="2">2 звезды</option>
            <option value="1">1 звезда</option>
          </select></div>

        <div>
          <textarea 
            value={text} 
            onChange={e => setText(e.target.value)} 
            placeholder="Текст отзыва" 
          />
          {textError && <span style={{ color: 'red' }}> Минимум 10 символов</span>}</div>

        <button type="submit" disabled={!canSubmit}>Отправить</button>
      </form>
    </div>
  );
}

export default ReviewForm;