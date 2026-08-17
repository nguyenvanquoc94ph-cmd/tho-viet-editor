import { useMemo } from 'react';
import { inspectBasicLucBatRhymes } from '../../poetry/lucBat';

export function PoetryInspector({ content }: { content: string }) {
  const rhymes = useMemo(() => inspectBasicLucBatRhymes(content), [content]);
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">Kiểm tra vần lục bát</h2>
      <div className="mt-3 space-y-2">
        {rhymes.length ? rhymes.map((item, index) => (
          <div key={`${item.from}-${item.to}-${index}`} className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 p-3 text-sm">
            <strong>{item.from.toUpperCase()}</strong><span>↔</span><strong>{item.to.toUpperCase()}</strong>
            <span className={item.isValid ? 'text-emerald-600' : 'text-amber-600'}>{item.message}</span>
          </div>
        )) : <p className="text-sm text-slate-500">Chưa đủ câu để kiểm tra vần.</p>}
      </div>
    </section>
  );
}
