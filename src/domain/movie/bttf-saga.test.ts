import { extractEpisode, toMovie } from './bttf-saga';
import { MovieType } from './movie';

describe('bttf-saga', () => {
  describe('extractEpisode', () => {
    it('returns episode number for valid BTTF titles', () => {
      expect(extractEpisode('Back to the Future 1')).toBe(1);
      expect(extractEpisode('Back to the Future 2')).toBe(2);
      expect(extractEpisode('Back to the Future 3')).toBe(3);
    });

    it('returns null for invalid episodes', () => {
      expect(extractEpisode('Back to the Future 4')).toBeNull();
      expect(extractEpisode('Back to the Future X')).toBeNull();
      expect(extractEpisode('Random Movie')).toBeNull();
    });

    it('handles extra spaces and case insensitivity', () => {
      expect(extractEpisode('  back TO the Future 2  ')).toBe(2);
      expect(extractEpisode('BACK TO THE FUTURE 3')).toBe(3);
    });
  });

  describe('toMovie', () => {
    it('returns BackToTheFuture type for valid episodes', () => {
      const movie = toMovie('Back to the Future 1');
      expect(movie.type).toBe(MovieType.BackToTheFuture);
      expect(movie.episode).toBe(1);
    });

    it('returns Other type for invalid titles', () => {
      const movie = toMovie('Random Movie');
      expect(movie.type).toBe(MovieType.Other);
      expect(movie.episode).toBeNull();
    });

    it('handles normalization correctly', () => {
      const movie = toMovie('  back TO the Future 2  ');
      expect(movie.type).toBe(MovieType.BackToTheFuture);
      expect(movie.episode).toBe(2);
    });
  });
});
