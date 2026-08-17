import { describe, expect, it } from 'vitest';
import { countSyllables } from '../poetry/syllable';
import { detectTone, getToneGroup } from '../poetry/tone';
import { getFinalRhyme, getPerfectRhymes } from '../poetry/rhyme';
import { inspectLucBat, inspectBasicLucBatRhymes } from '../poetry/lucBat';

describe('Đếm tiếng', () => {
  it('đếm đúng câu 6 tiếng', () => {
    expect(countSyllables('Chiều nay trời đổ cơn mưa')).toBe(6);
  });
  it('đếm đúng câu 7 tiếng', () => {
    expect(countSyllables('Chiều hôm nay trời đổ cơn mưa')).toBe(7);
  });
});

describe('Thanh điệu', () => {
  it.each([
    ['mưa', 'ngang', 'bằng'], ['xưa', 'ngang', 'bằng'], ['chưa', 'ngang', 'bằng'],
    ['vừa', 'huyền', 'bằng'], ['phố', 'sắc', 'trắc'], ['nhớ', 'sắc', 'trắc'],
    ['thương', 'ngang', 'bằng'], ['đường', 'huyền', 'bằng'], ['nhà', 'huyền', 'bằng'], ['người', 'huyền', 'bằng']
  ])('phân tích %s', (word, tone, group) => {
    expect(detectTone(word)).toBe(tone);
    expect(getToneGroup(word)).toBe(group);
  });
});

describe('Vần', () => {
  it('xác định vần ưa', () => {
    expect(getFinalRhyme('mưa')).toBe('ưa');
    expect(getFinalRhyme('xưa')).toBe('ưa');
  });
  it('tìm từ cùng vần', () => {
    expect(getPerfectRhymes('mưa')).toContain('xưa');
    expect(getPerfectRhymes('mưa')).toContain('chưa');
  });
});

describe('Lục bát', () => {
  it('kiểm tra câu lục và câu bát', () => {
    const result = inspectLucBat('Chiều nay trời đổ cơn mưa\nTôi ngồi nhớ những ngày xưa');
    expect(result[0].syllableCount).toBe(6);
    expect(result[1].syllableCount).toBe(7);
    expect(result[1].isCountValid).toBe(false);
  });
  it('kiểm tra vần cơ bản', () => {
    const result = inspectBasicLucBatRhymes('Chiều nay trời đổ cơn mưa\nTôi ngồi nhớ những ngày xưa xa');
    expect(result[0].isValid).toBe(true);
  });
});
