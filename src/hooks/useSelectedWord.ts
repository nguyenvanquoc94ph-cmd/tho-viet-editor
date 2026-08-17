import { useState } from 'react';
import { cleanWord } from '../poetry/tokenizer';

export function useSelectedWord() {
  const [selectedWord, setSelectedWord] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const selectWord = (word: string) => {
    const cleaned = cleanWord(word);
    if (!cleaned) return;
    setSelectedWord(cleaned);
    setHistory(prev => [...prev, cleaned]);
  };

  const goBack = () => {
    setHistory(prev => {
      if (prev.length <= 1) {
        setSelectedWord('');
        return [];
      }
      const next = prev.slice(0, -1);
      setSelectedWord(next[next.length - 1] ?? '');
      return next;
    });
  };

  const clearSelection = () => {
    setSelectedWord('');
    setHistory([]);
  };

  return { selectedWord, selectedWordHistory: history, selectWord, goBack, clearSelection };
}
