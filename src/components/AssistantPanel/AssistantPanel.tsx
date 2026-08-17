import { useMemo } from 'react';
import { analyzeWord, getRhymeCandidates } from '../../poetry/rhyme';

interface AssistantPanelProps {
  selectedWord: string;
  history: string[];
  onExplore: (word: string) => void;
  onBack: () => void;
}

export function AssistantPanel({ selectedWord, history, onExplore, onBack }: AssistantPanelProps) {
  const analysis = useMemo(() => selectedWord ? analyzeWord(selectedWord) : null, [selectedWord]);
  const rhymes = useMemo(() => selectedWord ? getRhymeCandidates(selectedWord) : [], [selectedWord]);

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
      <h2 className="text-base font-bold text-slate-900">TRỢ LÝ SÁNG TÁC</h2>
      {!analysis ? (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
          Chọn một từ trong bài thơ để khám phá
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Từ đang chọn</p>
            <p className="mt-2 text-4xl font-black uppercase tracking-tight text-slate-900">{analysis.word}</p>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-slate-50 p-3"><dt className="text-slate-500">Số tiếng</dt><dd className="font-bold">{analysis.syllableCount}</dd></div>
            <div className="rounded-2xl bg-slate-50 p-3"><dt className="text-slate-500">Vần</dt><dd className="font-bold">{analysis.finalRhyme || 'chưa rõ'}</dd></div>
            <div className="rounded-2xl bg-slate-50 p-3"><dt className="text-slate-500">Thanh</dt><dd className="font-bold">{analysis.tone}</dd></div>
            <div className="rounded-2xl bg-slate-50 p-3"><dt className="text-slate-500">Nhóm thanh</dt><dd className="font-bold">{analysis.toneGroup}</dd></div>
          </dl>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Từ gieo vần</p>
              {history.length > 1 && <button onClick={onBack} className="text-sm font-semibold text-slate-600 hover:text-slate-900">← Quay lại</button>}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {rhymes.length ? rhymes.map(word => (
                <button key={word} onClick={() => onExplore(word)} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-900 hover:bg-amber-100">{word}</button>
              )) : <p className="text-sm text-slate-500">Chưa có từ gieo vần trong dữ liệu V0.1.</p>}
            </div>
          </div>
          {history.length > 0 && <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">Lịch sử: {history.join(' → ')}</div>}
        </div>
      )}
    </aside>
  );
}
