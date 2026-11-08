import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function NoteDraft() {
  const [draft, setDraft] = useLocalStorage('note-draft', '');
  const [text, setText] = useState(draft);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDraft(text);
    }, 500);

    return () => clearTimeout(timer);
  }, [text, setDraft]);

  return (
    <div>
      <h3>Черновик заметки (автосохранение)</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="40"
        placeholder="Печатайте здесь..."
      />
    </div>
  );
}