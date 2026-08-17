interface HeaderProps {
  onCopy: () => void;
  onSave: () => void;
  onClear: () => void;
  onReset: () => void;
  copyLabel: string;
  saveState: string;
}

export function Header({ onCopy, onSave, onClear, onReset, copyLabel, saveState }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">THƠ VIỆT EDITOR</h1>
          <p className="text-sm text-slate-500">Trợ lý sáng tác thơ tiếng Việt</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select aria-label="Chọn thể thơ" className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <option>Lục bát</option>
          </select>
          <button onClick={onCopy} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700" aria-label="Sao chép bài thơ">{copyLabel}</button>
          <button onClick={onSave} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" aria-label="Lưu">💾 Lưu</button>
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold" aria-label="Mở menu">⋮</summary>
            <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <button onClick={onCopy} className="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-slate-100">Sao chép bài thơ</button>
              <button onClick={onClear} className="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-slate-100">Xóa bài thơ</button>
              <button onClick={onReset} className="block w-full rounded-xl px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">Đặt lại tất cả</button>
            </div>
          </details>
          <span className="text-xs text-slate-500" aria-live="polite">{saveState}</span>
        </div>
      </div>
    </header>
  );
}
