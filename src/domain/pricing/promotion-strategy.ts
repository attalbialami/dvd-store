import { Movie } from '../movie/movie';

/**
 * Strategy interface for promotional rules
 *
 * Each saga can implement its own promotion logic
 * without impacting the pricing engine
 */
export interface PromotionStrategy {
  /**
   * Returns a multiplicative discount factor
   *
   * Examples:
   * - 1.0 → no discount
   * - 0.9 → 10% discount
   * - 0.8 → 20% discount
   */
  getDiscountFactor(movies: Movie[]): number;
}
