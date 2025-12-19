import { CartPriceCalculator } from './cart-price-calculator';
import { PricingRules } from './pricing-rules';
import { Movie, MovieType } from '../movie/movie';

describe('CartPriceCalculator', () => {
  const rules = new PricingRules();
  const calculator = new CartPriceCalculator(rules);

  it('calculates total with BTTF promo enabled', () => {
    const movies: Movie[] = [
      { title: 'BTTF1', type: MovieType.BackToTheFuture, episode: 1 },
      { title: 'BTTF2', type: MovieType.BackToTheFuture, episode: 2 },
      { title: 'BTTF3', type: MovieType.BackToTheFuture, episode: 3 },
    ];
    const total = calculator.calculate(movies, true);
    expect(total).toBe(36); // 15*3*0.8
  });

  it('calculates total with promo disabled', () => {
    const movies: Movie[] = [
      { title: 'BTTF1', type: MovieType.BackToTheFuture, episode: 1 },
      { title: 'BTTF2', type: MovieType.BackToTheFuture, episode: 2 },
    ];
    const total = calculator.calculate(movies, false);
    expect(total).toBe(30); // 15*2
  });

  it('calculates total including other movies', () => {
    const movies: Movie[] = [
      { title: 'BTTF1', type: MovieType.BackToTheFuture, episode: 1 },
      { title: 'Random', type: MovieType.Other, episode: null },
    ];
    const total = calculator.calculate(movies, true);
    expect(total).toBe(35); // 15 + 20
  });

  it('rounds total to 2 decimals', () => {
    const movies: Movie[] = [
      { title: 'BTTF1', type: MovieType.BackToTheFuture, episode: 1 },
      { title: 'BTTF2', type: MovieType.BackToTheFuture, episode: 2 },
      { title: 'BTTF2', type: MovieType.BackToTheFuture, episode: 2 },
    ];
    const total = calculator.calculate(movies, true);
    expect(total).toBe(40.5); // rounded
  });
});
