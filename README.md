# THƠ VIỆT EDITOR

**Trợ lý sáng tác thơ tiếng Việt**

THƠ VIỆT EDITOR là một MVP frontend-only dành cho người viết thơ tiếng Việt. Sản phẩm được thiết kế theo tinh thần một IDE tối giản cho người làm thơ: trình soạn thơ là trung tâm, phần trợ lý cung cấp phân tích tiếng Việt, vần, thanh điệu và kiểm tra lục bát cơ bản.

## Mục tiêu V0.1

- Không sử dụng AI.
- Không có chatbot.
- Không cần đăng nhập.
- Không cần backend hoặc database.
- Toàn bộ Poetry Engine chạy trong trình duyệt.
- Có thể deploy lên Render Free dưới dạng Static Site.

## Tính năng đã có

- Trình soạn thơ nhiều dòng, hỗ trợ Unicode tiếng Việt.
- Chọn một từ trong bài thơ để phân tích.
- Phân tích số tiếng, vần cuối, thanh điệu và nhóm thanh.
- Tìm từ gieo vần từ dữ liệu nội bộ.
- Click từ gieo vần để khám phá tiếp.
- Lưu lịch sử khám phá từ và quay lại từ trước.
- Đếm tiếng từng câu.
- Kiểm tra lục bát cơ bản: câu lục 6 tiếng, câu bát 8 tiếng.
- Kiểm tra vần cơ bản giữa câu lục và câu bát.
- Tự động lưu vào localStorage.
- Khôi phục bài thơ sau khi refresh.
- Sao chép toàn bộ bài thơ bằng Clipboard API.
- Xóa bài thơ sau khi xác nhận.
- Đặt lại toàn bộ dữ liệu sau khi xác nhận.
- Giao diện hoàn toàn bằng tiếng Việt.
- Responsive cho desktop, tablet và mobile.

## Công nghệ

- React
- TypeScript
- Vite
- Tailwind CSS
- Vitest

## Cấu trúc thư mục

```text
src/
  components/
    Header/
    PoemEditor/
    AssistantPanel/
    PoetryInspector/
    StatusBar/
    ConfirmDialog/
  poetry/
    tokenizer.ts
    syllable.ts
    tone.ts
    rhyme.ts
    lucBat.ts
  data/
    vietnameseRhymes.ts
  hooks/
    usePoem.ts
    useSelectedWord.ts
    useLocalStorage.ts
  types/
    poetry.ts
  __tests__/
    poetry.test.ts
  App.tsx
  main.tsx
```

## Chạy local

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

## Chạy unit tests

```bash
npm run test
```

## Deploy Render Free

Tạo một Render Static Site với cấu hình:

- Build command: `npm run build`
- Publish directory: `dist`

Không cần database, backend, server, cron job hoặc background worker.

## Giới hạn của Poetry Engine V0.1

- Dữ liệu vần còn nhỏ, chỉ phục vụ MVP.
- Bộ tách tiếng dựa trên khoảng trắng và xử lý dấu câu cơ bản.
- Kiểm tra lục bát chỉ bao gồm số tiếng và một số quan hệ vần cơ bản.
- Chưa xử lý đầy đủ ngoại lệ, biến âm, vần thông, vần ép hoặc ngữ cảnh thơ dân gian.
- Chưa có gợi ý câu, viết lại câu hoặc phân tích toàn bài bằng AI.

## Định hướng phát triển V0.2

V0.2 có thể bổ sung AI Copilot theo triết lý:

- AI tạo gợi ý.
- Poetry Engine kiểm tra.
- Người dùng quyết định.

Các hướng mở rộng:

- Gợi ý câu tiếp theo.
- Gợi ý câu thay thế.
- Gợi ý từ phù hợp.
- Gợi ý câu giữ vần.
- Gợi ý câu giữ số tiếng.
- Gợi ý theo cảm xúc và ngữ cảnh toàn bài.
- Mở rộng dữ liệu vần lên hàng nghìn từ.
- Thêm các thể thơ khác như thơ bốn chữ, năm chữ, bảy chữ, song thất lục bát và thơ tự do.
