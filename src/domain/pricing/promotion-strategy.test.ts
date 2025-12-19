import { PromotionStrategy } from './promotion-strategy';
import { Movie } from '../movie/movie';

describe('PromotionStrategy interface', () => {
  it('can be implemented', () => {
    class DummyPromo implements PromotionStrategy {
      getDiscountFactor(movies: Movie[]): number {
        // we can ignore the parameter for the test
        return 0.5;
      }
    }

    const promo = new DummyPromo();
    expect(promo.getDiscountFactor([])).toBe(0.5);
  });
});
