import { toMovie } from '../domain/movie/bttf-saga';
import { Movie } from '../domain/movie/movie';
import { CartPriceCalculator } from '../domain/pricing/cart-price-calculator';

/**
 * Application service orchestrating input parsing and pricing
 *
 * Acts as a boundary between interfaces (CLI / API)
 * and the domain layer
 */
export class CartService {
  constructor(private readonly priceCalculator: CartPriceCalculator) {}

  /**
   * Parses raw multiline input into domain movies.
   */
  parseInputToMovies(rawInput: string): Movie[] {
    return rawInput
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map(toMovie);
  }

  /**
   * Computes the total cart price from raw input
   */
  computeTotal(rawInput: string): number {
    const movies = this.parseInputToMovies(rawInput);
    const promotionsEnabled = process.env.ENABLE_PROMOTIONS === 'true';

    return this.priceCalculator.calculate(movies, promotionsEnabled);
  }
}
