import { PricingRules } from './pricing-rules';
import { Movie, MovieType } from '../movie/movie';

describe('StrategyBasedPricingRules', () => {
  const rules = new PricingRules();

  it('returns correct price for BTTF', () => {
    const movie: Movie = {
      title: 'BTTF1',
      type: MovieType.BackToTheFuture,
      episode: 1,
    };
    expect(rules.getUnitPrice(movie)).toBe(15);
  });

  it('returns correct price for Other movies', () => {
    const movie: Movie = {
      title: 'Random',
      type: MovieType.Other,
      episode: null,
    };
    expect(rules.getUnitPrice(movie)).toBe(20);
  });

  it('returns correct discount factor', () => {
    const movies: Movie[] = [
      { title: 'BTTF1', type: MovieType.BackToTheFuture, episode: 1 },
      { title: 'BTTF2', type: MovieType.BackToTheFuture, episode: 2 },
      { title: 'BTTF3', type: MovieType.BackToTheFuture, episode: 3 },
    ];
    expect(
      rules.getDiscountFactor(movies, MovieType.BackToTheFuture),
    ).toBe(0.8);
  });

  it('returns 1.0 for sagas without strategy', () => {
    const movies: Movie[] = [];
    expect(rules.getDiscountFactor(movies, MovieType.Other)).toBe(1.0);
  });

  it('getSagas returns all sagas with strategy', () => {
    expect(rules.getSagas()).toContain(MovieType.BackToTheFuture);
  });
});
