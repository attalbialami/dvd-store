import { BttfPromotion } from './bttf-promotion';
import { Movie, MovieType } from '../../movie/movie';

describe('BttfPromotion', () => {
  const promo = new BttfPromotion();

  it('applies 20% discount for 3 distinct episodes', () => {
    const movies: Movie[] = [
      { title: 'BTTF1', type: MovieType.BackToTheFuture, episode: 1 },
      { title: 'BTTF2', type: MovieType.BackToTheFuture, episode: 2 },
      { title: 'BTTF3', type: MovieType.BackToTheFuture, episode: 3 },
    ];
    expect(promo.getDiscountFactor(movies)).toBe(0.8);
  });

  it('applies 10% discount for 2 distinct episodes', () => {
    const movies: Movie[] = [
      { title: 'BTTF1', type: MovieType.BackToTheFuture, episode: 1 },
      { title: 'BTTF2', type: MovieType.BackToTheFuture, episode: 2 },
    ];
    expect(promo.getDiscountFactor(movies)).toBe(0.9);
  });

  it('no discount for 1 episode', () => {
    const movies: Movie[] = [
      { title: 'BTTF1', type: MovieType.BackToTheFuture, episode: 1 },
    ];
    expect(promo.getDiscountFactor(movies)).toBe(1.0);
  });

  it('ignores duplicates', () => {
    const movies: Movie[] = [
      { title: 'BTTF1', type: MovieType.BackToTheFuture, episode: 1 },
      { title: 'BTTF1', type: MovieType.BackToTheFuture, episode: 1 },
      { title: 'BTTF2', type: MovieType.BackToTheFuture, episode: 2 },
    ];
    expect(promo.getDiscountFactor(movies)).toBe(0.9); // only 2 distinct
  });
});
