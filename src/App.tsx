import { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { PoemEditor } from './components/PoemEditor/PoemEditor';
import { AssistantPanel } from './components/AssistantPanel/AssistantPanel';
import { PoetryInspector } from './components/PoetryInspector/PoetryInspector';
import { StatusBar } from './components/StatusBar/StatusBar';
import { ConfirmDialog } from './components/ConfirmDialog/ConfirmDialog';
import { usePoem } from './hooks/usePoem';
import { useSelectedWord } from './hooks/useSelectedWord';

export default function App() {
  const { document, updateContent, clearPoem, resetAll } = usePoem();
  const { selectedWord, selectedWordHistory, selectWord, goBack, clearSelection } = useSelectedWord();
  const [copyLabel, setCopyLabel] = useState('📋 Sao chép bài thơ');
  const [saveState, setSaveState] = useState('Đã lưu');
  const [dialog, setDialog] = useState<'clear' | 'reset' | null>(null);

  useEffect(() => {
    setSaveState('Đang lưu...');
    const id = window.setTimeout(() => setSaveState('Đã lưu'), 350);
    return () => window.clearTimeout(id);
  }, [document.content]);

  async function copyPoem() {
    try {
      await navigator.clipboard.writeText(document.content);
      setCopyLabel('✓ Đã sao chép bài thơ');
      window.setTimeout(() => setCopyLabel('📋 Sao chép bài thơ'), 1700);
    } catch (error) {
      console.error(error);
      setCopyLabel('Không thể sao chép tự động');
      window.setTimeout(() => setCopyLabel('📋 Sao chép bài thơ'), 2200);
      alert('Không thể sao chép tự động. Vui lòng thử lại hoặc sao chép nội dung theo cách thủ công.');
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onCopy={copyPoem} onSave={() => setSaveState('Đã lưu')} onClear={() => setDialog('clear')} onReset={() => setDialog('reset')} copyLabel={copyLabel} saveState={saveState} />
      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="space-y-5">
          <PoemEditor content={document.content} selectedWord={selectedWord} onChange={updateContent} onSelectWord={selectWord} />
          <PoetryInspector content={document.content} />
        </div>
        <AssistantPanel selectedWord={selectedWord} history={selectedWordHistory} onExplore={selectWord} onBack={goBack} />
      </main>
      <StatusBar content={document.content} />
      <ConfirmDialog
        open={dialog === 'clear'}
        title="Xóa bài thơ này?"
        description="Toàn bộ nội dung hiện tại sẽ bị xóa. Các thiết lập khác vẫn được giữ nguyên."
        confirmLabel="Xóa"
        onCancel={() => setDialog(null)}
        onConfirm={() => { clearPoem(); clearSelection(); setDialog(null); }}
      />
      <ConfirmDialog
        open={dialog === 'reset'}
        title="Đặt lại tất cả?"
        description="Thao tác này sẽ xóa bài thơ và toàn bộ dữ liệu được lưu trên trình duyệt."
        confirmLabel="Đặt lại"
        onCancel={() => setDialog(null)}
        onConfirm={() => { resetAll(); clearSelection(); setDialog(null); }}
      />
    </div>
  );
}
