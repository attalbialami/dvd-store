import dotenv from 'dotenv';

import { CartService } from './app/cart-service';
import { startCli } from './cli/cli';
import { CartPriceCalculator } from './domain/pricing/cart-price-calculator';
import { PricingRules } from './domain/pricing/pricing-rules';

dotenv.config({
  path: '.env.local',
  quiet: true,
});

async function main(): Promise<void> {
  const pricingRules = new PricingRules();
  const calculator = new CartPriceCalculator(pricingRules);
  const cartService = new CartService(calculator);

  const enablePromotions = process.env.ENABLE_PROMOTIONS === 'true';

  startCli(cartService, enablePromotions);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
