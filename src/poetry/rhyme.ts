import { vietnameseRhymeIndex } from '../data/vietnameseRhymes';
import { cleanWord } from './tokenizer';
import { detectTone, getToneGroup } from './tone';
import type { WordAnalysis } from '../types/poetry';

const VOWELS = 'aăâeêioôơuưy';
const toneToBase: Record<string, string> = {
  á:'a', à:'a', ả:'a', ã:'a', ạ:'a',
  ắ:'ă', ằ:'ă', ẳ:'ă', ẵ:'ă', ặ:'ă',
  ấ:'â', ầ:'â', ẩ:'â', ẫ:'â', ậ:'â',
  é:'e', è:'e', ẻ:'e', ẽ:'e', ẹ:'e',
  ế:'ê', ề:'ê', ể:'ê', ễ:'ê', ệ:'ê',
  í:'i', ì:'i', ỉ:'i', ĩ:'i', ị:'i',
  ó:'o', ò:'o', ỏ:'o', õ:'o', ọ:'o',
  ố:'ô', ồ:'ô', ổ:'ô', ỗ:'ô', ộ:'ô',
  ớ:'ơ', ờ:'ơ', ở:'ơ', ỡ:'ơ', ợ:'ơ',
  ú:'u', ù:'u', ủ:'u', ũ:'u', ụ:'u',
  ứ:'ư', ừ:'ư', ử:'ư', ữ:'ư', ự:'ư',
  ý:'y', ỳ:'y', ỷ:'y', ỹ:'y', ỵ:'y'
};

export function removeToneMarksKeepVietnameseVowels(value: string): string {
  return value.normalize('NFC').toLowerCase().replace(/[áàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/g, c => toneToBase[c] ?? c);
}

export function getFinalRhyme(word: string): string {
  const cleaned = removeToneMarksKeepVietnameseVowels(cleanWord(word));
  if (!cleaned) return '';
  let firstVowelIndex = -1;
  for (let i = 0; i < cleaned.length; i += 1) {
    if (VOWELS.includes(cleaned[i])) {
      firstVowelIndex = i;
      break;
    }
  }
  return firstVowelIndex >= 0 ? cleaned.slice(firstVowelIndex) : cleaned;
}

export function getPerfectRhymes(word: string): string[] {
  const rhyme = getFinalRhyme(word);
  const normalizedWord = cleanWord(word).toLowerCase();
  return (vietnameseRhymeIndex[rhyme] ?? []).filter(item => item !== normalizedWord);
}

export function getNearRhymes(word: string): string[] {
  const rhyme = getFinalRhyme(word);
  if (!rhyme) return [];
  return Object.entries(vietnameseRhymeIndex)
    .filter(([key]) => key !== rhyme && (key.endsWith(rhyme.slice(-2)) || rhyme.endsWith(key.slice(-2))))
    .flatMap(([, words]) => words)
    .slice(0, 18);
}

export function getRhymeCandidates(word: string): string[] {
  return Array.from(new Set([...getPerfectRhymes(word), ...getNearRhymes(word)])).slice(0, 24);
}

export function analyzeWord(word: string): WordAnalysis {
  const cleaned = cleanWord(word);
  return {
    word: cleaned,
    syllableCount: cleaned ? 1 : 0,
    finalRhyme: getFinalRhyme(cleaned),
    tone: detectTone(cleaned),
    toneGroup: getToneGroup(cleaned)
  };
}

export function rhymesTogether(a: string, b: string): boolean {
  const ar = getFinalRhyme(a);
  const br = getFinalRhyme(b);
  return Boolean(ar && br && ar === br);
}
