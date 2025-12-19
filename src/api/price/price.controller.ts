import { Request, Response } from 'express';

import { CartService } from '../../app/cart-service';

/**
 * HTTP controller responsible for price calculation endpoints
 *
 * This class acts as an adapter between the HTTP layer (Express)
 * and the application layer (CartService)
 *
 * It must:
 * - validate request input
 * - translate HTTP payloads into application-level formats
 * - return HTTP-friendly responses
 */
export class PriceController {
  constructor(private readonly cartService: CartService) {}

  /**
   * Calculates the total price of a cart
   *
   * Expected request body:
   * {
   *   items: string[]
   * }
   *
   * Example:
   * {
   *   "items": ["Back to the Future 1", "Back to the Future 2"]
   * }
   */
  calculate(req: Request, res: Response): void {
    const { items } = req.body;

    // Basic input validation to avoid runtime errors
    if (!Array.isArray(items)) {
      res.status(400).json({
        error: 'items must be an array of strings',
      });
      return;
    }

    const input = items.join('\n');
    const total = this.cartService.computeTotal(input);

    res.status(200).json({ total });
  }
}
