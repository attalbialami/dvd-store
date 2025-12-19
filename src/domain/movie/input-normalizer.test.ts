import { normalizeTitle } from './input-normalizer';

describe('normalizeTitle', () => {
  it('trims spaces at start and end', () => {
    expect(normalizeTitle('  hello world  ')).toBe('hello world');
  });

  it('converts to lowercase', () => {
    expect(normalizeTitle('HeLLo WoRLD')).toBe('hello world');
  });

  it('replaces multiple spaces/tabs with single space', () => {
    expect(normalizeTitle('hello   world')).toBe('hello world');
    expect(normalizeTitle('hello\tworld')).toBe('hello world');
  });

  it('combines trimming, lowercasing and space normalization', () => {
    expect(normalizeTitle('  HeLLo \t WoRLD  ')).toBe('hello world');
  });
});
