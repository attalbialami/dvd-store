import { Movie, MovieType } from '../../movie/movie';
import { PromotionStrategy } from '../promotion-strategy';

/**
 * Promotion rules for the Back to the Future saga
 *
 * Discounts apply only when different episodes are present
 */
export class BttfPromotion implements PromotionStrategy {
  getDiscountFactor(movies: Movie[]): number {
    // Use a Set to ensure episodes are counted only once
    const episodes = new Set(
      movies
        .filter(
          (m) => m.type === MovieType.BackToTheFuture && m.episode !== null,
        )
        .map((m) => m.episode!),
    );

    const count = episodes.size;

    if (count >= 3) return 0.8;
    if (count === 2) return 0.9;

    return 1.0;
  }
}
