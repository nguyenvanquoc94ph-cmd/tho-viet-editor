import { countSyllables, getLastWord, getLines, getSixthWord } from './tokenizer';
import { getFinalRhyme, rhymesTogether } from './rhyme';
import type { LineInspection, RhymeInspection } from '../types/poetry';

export function inspectLucBatLine(text: string, index: number): LineInspection {
  const isLuc = index % 2 === 0;
  const expected = isLuc ? 6 : 8;
  const syllableCount = countSyllables(text);
  const isCountValid = syllableCount === expected;
  const type = isLuc ? 'lục' : 'bát';
  return {
    index,
    type,
    expectedSyllables: expected,
    syllableCount,
    isCountValid,
    message: isCountValid ? `${syllableCount} tiếng ✓` : `${syllableCount} tiếng ⚠️ Câu ${type} cần ${expected} tiếng`,
    lastWord: getLastWord(text),
    sixthWord: getSixthWord(text),
    finalRhyme: getFinalRhyme(getLastWord(text))
  };
}

export function inspectLucBat(content: string): LineInspection[] {
  return getLines(content).map((line, index) => inspectLucBatLine(line, index));
}

export function inspectBasicLucBatRhymes(content: string): RhymeInspection[] {
  const lines = getLines(content);
  const result: RhymeInspection[] = [];
  for (let i = 0; i < lines.length - 1; i += 2) {
    const lucLast = getLastWord(lines[i]);
    const batSixth = getSixthWord(lines[i + 1]) || getLastWord(lines[i + 1]);
    if (lucLast && batSixth) {
      const valid = rhymesTogether(lucLast, batSixth);
      result.push({
        from: lucLast,
        to: batSixth,
        fromRhyme: getFinalRhyme(lucLast),
        toRhyme: getFinalRhyme(batSixth),
        isValid: valid,
        message: valid ? '✓ Vần phù hợp' : '⚠️ Vần chưa khớp'
      });
    }
  }
  return result;
}
