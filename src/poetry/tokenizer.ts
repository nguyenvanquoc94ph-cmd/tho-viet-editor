const PUNCTUATION = /[.,!?;:()\[\]{}"'“”‘’…、。！？；：«»<>]/g;

export function normalizeSpaces(text: string): string {
  return text.replace(/[\t\u00A0]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function cleanWord(word: string): string {
  return word
    .normalize('NFC')
    .replace(PUNCTUATION, '')
    .replace(/^[-–—]+|[-–—]+$/g, '')
    .trim();
}

export function tokenizeLine(line: string): string[] {
  const normalized = normalizeSpaces(line);
  if (!normalized) return [];
  return normalized.split(' ').map(cleanWord).filter(Boolean);
}

export function getLines(content: string): string[] {
  return content.replace(/\r\n/g, '\n').split('\n');
}

export function getLastWord(line: string): string {
  const words = tokenizeLine(line);
  return words.length ? words[words.length - 1] : '';
}

export function getSixthWord(line: string): string {
  const words = tokenizeLine(line);
  return words.length >= 6 ? words[5] : '';
}

export function countSyllables(line: string): number {
  return tokenizeLine(line).length;
}
