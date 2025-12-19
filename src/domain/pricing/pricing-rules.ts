import { Movie, MovieType } from '../movie/movie';
import { BttfPromotion } from './promotion/bttf-promotion';
import { PromotionStrategy } from './promotion-strategy';

/**
 * Central pricing configuration based on strategies
 *
 * - Defines base prices
 * - Delegates promotion logic to dedicated strategies
 */
export class PricingRules {
  private static readonly BTTF_PRICE = 15;
  private static readonly OTHER_MOVIE_PRICE = 20;

  private promotionStrategies: Map<MovieType, PromotionStrategy> = new Map([
    [MovieType.BackToTheFuture, new BttfPromotion()],
  ]);

  /**
   * Returns the base price of a movie without promotions
   */
  getUnitPrice(movie: Movie): number {
    switch (movie.type) {
      case MovieType.BackToTheFuture:
        return PricingRules.BTTF_PRICE;
      default:
        return PricingRules.OTHER_MOVIE_PRICE;
    }
  }

  /**
   * Computes the discount factor for a given saga
   */
  getDiscountFactor(movies: Movie[], saga: MovieType): number {
    const strategy = this.promotionStrategies.get(saga);
    return strategy ? strategy.getDiscountFactor(movies) : 1.0;
  }

  /**
   * Lists all sagas that have active promotion strategies
   */
  getSagas(): MovieType[] {
    return Array.from(this.promotionStrategies.keys());
  }
}
