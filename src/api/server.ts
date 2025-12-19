import bodyParser from 'body-parser';
import express from 'express';

import { CartService } from '../app/cart-service';
import { CartPriceCalculator } from '../domain/pricing/cart-price-calculator';
import { PricingRules } from '../domain/pricing/pricing-rules';
import { PriceController } from './price/price.controller';

/**
 * Creates and configures the Express application
 *
 * This file wires all dependencies together
 * but does not contain any business logic
 */
export function createServer() {
  const app = express();

  app.use(bodyParser.json());

  // Dependency wiring
  const pricingRules = new PricingRules();
  const calculator = new CartPriceCalculator(pricingRules);
  const cartService = new CartService(calculator);
  const controller = new PriceController(cartService);

  /**
   * POST /price
   *
   * Calculates the total cart price.
   */
  app.post('/price', (req, res) => controller.calculate(req, res));

  return app;
}
