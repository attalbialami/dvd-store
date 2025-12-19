import { Movie } from '../movie/movie';
import { PricingRules } from './pricing-rules';

/**
 * Computes the total cart price using pricing rules and promotions
 *
 * This class contains no parsing or I/O logic and is fully testable
 */
export class CartPriceCalculator {
  constructor(private readonly pricingRules: PricingRules) {}

  /**
   * Calculates the final cart price
   *
   * @param movies Parsed domain movies
   * @param promotionsEnabled Feature flag
   */
  calculate(movies: Movie[], promotionsEnabled: boolean): number {
    let total = 0;

    // Apply promotions per saga
    for (const saga of this.pricingRules.getSagas()) {
      const sagaMovies = movies.filter((m) => m.type === saga);
      const discountFactor = promotionsEnabled
        ? this.pricingRules.getDiscountFactor(movies, saga)
        : 1.0;

      const subtotal = sagaMovies
        .map((m) => this.pricingRules.getUnitPrice(m))
        .reduce((sum, p) => sum + p, 0);

      total += subtotal * discountFactor;
    }

    // Remaining movies without saga promotions
    const otherMovies = movies.filter(
      (m) => !this.pricingRules.getSagas().includes(m.type),
    );

    const otherTotal = otherMovies
      .map((m) => this.pricingRules.getUnitPrice(m))
      .reduce((sum, p) => sum + p, 0);

    // Rounded to 2 decimals for currency precision
    return Math.round((total + otherTotal) * 100) / 100;
  }
}
