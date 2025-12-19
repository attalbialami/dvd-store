import { MovieType } from './movie';

describe('MovieType enum', () => {
  it('contains BackToTheFuture and Other', () => {
    expect(MovieType.BackToTheFuture).toBe('BackToTheFuture');
    expect(MovieType.Other).toBe('Other');
  });
});
