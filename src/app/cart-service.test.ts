import { CartService } from './cart-service';
import { CartPriceCalculator } from '../domain/pricing/cart-price-calculator';
import { PricingRules } from '../domain/pricing/pricing-rules';
import { MovieType } from '../domain/movie/movie';

describe('CartService', () => {
  const pricingRules = new PricingRules();
  const calculator = new CartPriceCalculator(pricingRules);
  const cartService = new CartService(calculator);

  beforeEach(() => {
    process.env.ENABLE_PROMOTIONS = 'true';
  });

  it('parses raw input to movies correctly', () => {
    const rawInput = 'Back to the Future 1\nRandom Movie';
    const movies = cartService.parseInputToMovies(rawInput);
    expect(movies[0].type).toBe(MovieType.BackToTheFuture);
    expect(movies[1].type).toBe(MovieType.Other);
  });

  it('computes total with promo enabled', () => {
    const rawInput = 'Back to the Future 1\nBack to the Future 2';
    const total = cartService.computeTotal(rawInput);
    expect(total).toBe(27); // 15*2*0.9
  });

  it('computes total with promo disabled', () => {
    process.env.ENABLE_PROMOTIONS = 'false';
    const rawInput = 'Back to the Future 1\nBack to the Future 2';
    const total = cartService.computeTotal(rawInput);
    expect(total).toBe(30); // 15*2 no promotion
  });

  it('ignores empty lines', () => {
    const rawInput = 'Back to the Future 1\n\nBack to the Future 2';
    const movies = cartService.parseInputToMovies(rawInput);
    expect(movies.length).toBe(2);
  });
});
