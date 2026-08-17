import { useMemo } from 'react';
import { inspectLucBat } from '../../poetry/lucBat';
import { tokenizeLine, cleanWord } from '../../poetry/tokenizer';

interface PoemEditorProps {
  content: string;
  selectedWord: string;
  onChange: (content: string) => void;
  onSelectWord: (word: string) => void;
}

function getWordFromTextarea(textarea: HTMLTextAreaElement): string {
  const text = textarea.value;
  const selection = text.slice(textarea.selectionStart, textarea.selectionEnd);
  if (cleanWord(selection)) return selection;
  const pos = textarea.selectionStart;
  let start = pos;
  let end = pos;
  while (start > 0 && !/\s/.test(text[start - 1])) start -= 1;
  while (end < text.length && !/\s/.test(text[end])) end += 1;
  return text.slice(start, end);
}

export function PoemEditor({ content, selectedWord, onChange, onSelectWord }: PoemEditorProps) {
  const inspections = useMemo(() => inspectLucBat(content), [content]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-base font-bold text-slate-900">Trình soạn thơ</h2>
        <p className="text-sm text-slate-500">Viết từng câu trên một dòng. Bấm hoặc chọn một từ để khám phá vần.</p>
      </div>
      <div className="grid gap-0 lg:grid-cols-[1fr_17rem]">
        <textarea
          value={content}
          onChange={event => onChange(event.target.value)}
          onMouseUp={event => onSelectWord(getWordFromTextarea(event.currentTarget))}
          onKeyUp={event => onSelectWord(getWordFromTextarea(event.currentTarget))}
          spellCheck={false}
          className="min-h-[32rem] w-full resize-none rounded-none border-0 bg-amber-50/30 p-6 font-serif text-xl leading-10 text-slate-900 outline-none focus:ring-2 focus:ring-amber-300 lg:rounded-bl-3xl"
          placeholder="Nhập bài thơ của bạn ở đây..."
          aria-label="Trình soạn thơ"
        />
        <aside className="border-t border-slate-200 bg-slate-50 p-4 lg:border-l lg:border-t-0">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Phân tích từng câu</h3>
          <div className="space-y-3">
            {inspections.map(item => (
              <div key={item.index} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-700">Câu {item.index + 1} · {item.type}</span>
                  <span className={item.isCountValid ? 'text-emerald-600' : 'text-amber-600'}>{item.isCountValid ? '✓' : '⚠️'}</span>
                </div>
                <p className="mt-1 text-slate-600">{item.message}</p>
                {item.finalRhyme && <p className="mt-1 text-slate-500">Vần: {item.finalRhyme}</p>}
              </div>
            ))}
          </div>
          {selectedWord && <div className="mt-4 rounded-2xl bg-amber-100 p-3 text-sm text-amber-900">Từ đang chọn: <strong>{selectedWord}</strong></div>}
          <div className="sr-only">{tokenizeLine(content).join(' ')}</div>
        </aside>
      </div>
    </section>
  );
}
