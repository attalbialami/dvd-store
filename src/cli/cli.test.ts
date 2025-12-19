import mockStdin from 'mock-stdin';
import { startCli } from './cli';
import { CartService } from '../app/cart-service';

describe('CLI (100% coverage)', () => {
  let io: mockStdin.MockSTDIN;
  let cartService: CartService;
  let exitFn: jest.Mock;

  beforeEach(() => {
    io = mockStdin.stdin();

    cartService = {
      computeTotal: jest.fn().mockReturnValue(42),
      parseInputToMovies: jest.fn(),
    } as unknown as CartService;

    exitFn = jest.fn();
  });

  afterEach(() => {
    io.restore();
    jest.clearAllMocks();
  });

  it('handles promotions enabled and calculates total', (done) => {
    startCli(cartService, true, exitFn);

    setTimeout(() => {
      io.send('Back to the Future 1\n');
      io.send('Back to the Future 2\n');
      io.send('\n'); // calculate
      io.send('exit\n');
    }, 50);

    setTimeout(() => {
      expect(cartService.computeTotal).toHaveBeenCalledWith(
        'Back to the Future 1\nBack to the Future 2',
      );
      expect(exitFn).toHaveBeenCalledWith(0);
      done();
    }, 200);
  });

  it('handles promotions disabled path', (done) => {
    startCli(cartService, false, exitFn);

    setTimeout(() => {
      io.send('Back to the Future 1\n');
      io.send('\n');
      io.send('exit\n');
    }, 50);

    setTimeout(() => {
      expect(cartService.computeTotal).toHaveBeenCalled();
      done();
    }, 200);
  });

  it('resets basket and starts new session', (done) => {
    startCli(cartService, true, exitFn);

    setTimeout(() => {
      io.send('Back to the Future 1\n');
      io.send('\n'); // calculate
      io.send('Back to the Future 2\n');
      io.send('\n'); // calculate again
      io.send('exit\n');
    }, 50);

    setTimeout(() => {
      expect(cartService.computeTotal).toHaveBeenNthCalledWith(
        1,
        'Back to the Future 1',
      );
      expect(cartService.computeTotal).toHaveBeenNthCalledWith(
        2,
        'Back to the Future 2',
      );
      done();
    }, 250);
  });

  it('exits immediately without input', (done) => {
    startCli(cartService, false, exitFn);

    setTimeout(() => {
      io.send('exit\n');
    }, 50);

    setTimeout(() => {
      expect(exitFn).toHaveBeenCalledWith(0);
      done();
    }, 150);
  });
});
