import readline from 'node:readline';

import { CartService } from '../app/cart-service';
import { cliColors } from './cli-colors';

/**
 * Starts the interactive CLI interface
 *
 * Responsible only for:
 * - user interaction
 * - input/output
 * - delegating business logic to CartService
 */
export function startCli(
  cartService: CartService,
  enablePromotions: boolean,
  /* istanbul ignore next */
  exitFn: (code: number) => void = process.exit,
): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(
    cliColors.storeTitle('========================================='),
  );
  console.log(
    cliColors.storeTitle('=====                               ====='),
  );
  console.log(
    cliColors.storeTitle('=====          Welcome to           ====='),
  );
  console.log(
    cliColors.storeTitle('===== "ATTALBI ALAMI" DVD store CLI ====='),
  );
  console.log(
    cliColors.storeTitle('=====                               ====='),
  );

  if (enablePromotions) {
    let str = cliColors.storeTitle('=====      ');
    str += cliColors.storeSale('  SPECIAL  OFFERS  ');
    str += cliColors.storeTitle('      =====');
    console.log(str);
  }
  console.log(
    cliColors.storeTitle('=========================================\n'),
  );

  console.log(
    cliColors.storeText(
      'Enter one DVD title per line (empty line to calculate)',
    ),
  );
  console.log(cliColors.storeText(`Type 'exit' to quit.\n`));

  const ask = (): void => {
    const items: string[] = [];

    console.log(cliColors.storeNewCart('  > New cart...'));

    const loop = () => {
      rl.question('🔵  ', (line) => {
        const input = line.trim();

        if (input.toLowerCase() === 'exit') {
          rl.close();
          return;
        }

        if (!input) {
          const total = cartService.computeTotal(items.join('\n'));
          console.log(cliColors.price(`Total: ${total} €\n`));
          ask();
          return;
        }

        items.push(input);
        loop();
      });
    };

    loop();
  };

  ask();

  rl.on('close', () => {
    console.log(cliColors.storeText('Good bye, see you soon !'));
    exitFn(0);
  });
}
