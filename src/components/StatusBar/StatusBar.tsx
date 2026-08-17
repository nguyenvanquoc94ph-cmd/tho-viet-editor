import { useMemo } from 'react';
import { inspectLucBat, inspectBasicLucBatRhymes } from '../../poetry/lucBat';

export function StatusBar({ content }: { content: string }) {
  const lines = useMemo(() => inspectLucBat(content), [content]);
  const rhymes = useMemo(() => inspectBasicLucBatRhymes(content), [content]);
  const current = lines.find(line => line.syllableCount > 0) ?? lines[0];
  const rhymeOk = rhymes.length ? rhymes.every(item => item.isValid) : false;
  return (
    <footer className="sticky bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 py-3 text-sm shadow-[0_-8px_30px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 text-slate-600">
        <span>Thể thơ: <strong>Lục bát</strong></span>
        <span>Câu hiện tại: <strong>{current ? current.message : '0 tiếng'}</strong></span>
        <span>Vần: <strong className={rhymeOk ? 'text-emerald-600' : 'text-amber-600'}>{rhymeOk ? '✓' : '⚠️'}</strong></span>
      </div>
    </footer>
  );
}
