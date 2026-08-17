export type Tone = 'ngang' | 'sắc' | 'huyền' | 'hỏi' | 'ngã' | 'nặng';
export type ToneGroup = 'bằng' | 'trắc';
export type Meter = 'luc-bat';

export interface WordAnalysis {
  word: string;
  syllableCount: number;
  finalRhyme: string;
  tone: Tone;
  toneGroup: ToneGroup;
}

export interface PoetryLine {
  text: string;
  syllables: string[];
  syllableCount: number;
}

export interface PoetryDocument {
  title: string;
  content: string;
  meter: Meter;
}

export interface LineInspection {
  index: number;
  type: 'lục' | 'bát';
  expectedSyllables: number;
  syllableCount: number;
  isCountValid: boolean;
  message: string;
  lastWord: string;
  sixthWord: string;
  finalRhyme: string;
}

export interface RhymeInspection {
  from: string;
  to: string;
  fromRhyme: string;
  toRhyme: string;
  isValid: boolean;
  message: string;
}
