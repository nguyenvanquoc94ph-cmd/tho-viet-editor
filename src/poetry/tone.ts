import type { Tone, ToneGroup } from '../types/poetry';

const toneMap: Record<string, Tone> = {
  á:'sắc', é:'sắc', í:'sắc', ó:'sắc', ú:'sắc', ý:'sắc', ắ:'sắc', ấ:'sắc', ế:'sắc', ố:'sắc', ớ:'sắc', ứ:'sắc',
  à:'huyền', è:'huyền', ì:'huyền', ò:'huyền', ù:'huyền', ỳ:'huyền', ằ:'huyền', ầ:'huyền', ề:'huyền', ồ:'huyền', ờ:'huyền', ừ:'huyền',
  ả:'hỏi', ẻ:'hỏi', ỉ:'hỏi', ỏ:'hỏi', ủ:'hỏi', ỷ:'hỏi', ẳ:'hỏi', ẩ:'hỏi', ể:'hỏi', ổ:'hỏi', ở:'hỏi', ử:'hỏi',
  ã:'ngã', ẽ:'ngã', ĩ:'ngã', õ:'ngã', ũ:'ngã', ỹ:'ngã', ẵ:'ngã', ẫ:'ngã', ễ:'ngã', ỗ:'ngã', ỡ:'ngã', ữ:'ngã',
  ạ:'nặng', ẹ:'nặng', ị:'nặng', ọ:'nặng', ụ:'nặng', ỵ:'nặng', ặ:'nặng', ậ:'nặng', ệ:'nặng', ộ:'nặng', ợ:'nặng', ự:'nặng'
};

export function detectTone(word: string): Tone {
  const lower = word.normalize('NFC').toLowerCase();
  for (const char of lower) {
    if (toneMap[char]) return toneMap[char];
  }
  return 'ngang';
}

export function getToneGroup(word: string): ToneGroup {
  const tone = detectTone(word);
  return tone === 'ngang' || tone === 'huyền' ? 'bằng' : 'trắc';
}
