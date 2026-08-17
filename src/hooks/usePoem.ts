import { useLocalStorage } from './useLocalStorage';
import type { PoetryDocument } from '../types/poetry';

const sample = 'Chiều nay trời đổ cơn mưa\nTôi ngồi nhớ những ngày xưa xa';
const initialDocument: PoetryDocument = { title: 'Bài thơ chưa đặt tên', content: sample, meter: 'luc-bat' };

export function usePoem() {
  const [document, setDocument] = useLocalStorage<PoetryDocument>('tho-viet-editor-document', initialDocument);
  const updateContent = (content: string) => setDocument({ ...document, content });
  const updateMeter = () => setDocument({ ...document, meter: 'luc-bat' });
  const clearPoem = () => setDocument({ ...document, content: '' });
  const resetAll = () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('tho-viet-editor-')) localStorage.removeItem(key);
    });
    setDocument(initialDocument);
  };
  return { document, updateContent, updateMeter, clearPoem, resetAll };
}
