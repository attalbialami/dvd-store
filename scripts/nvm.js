/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const { exec } = require('child_process');
/* eslint-enable @typescript-eslint/no-require-imports */

fs.readFile('.nvmrc', 'utf8', (err, data) => {
  if (err) {
    console.error('No .nvmrc file found');
    process.exit(1);
  }

  const version = data.trim();

  exec(`nvm install ${version}`, (installErr, installStdout) => {
    if (installErr) {
      console.error(`Error installing nvm version: ${installErr}`);
      process.exit(1);
    }

    console.log(installStdout);

    exec(`nvm use ${version}`, (useErr, useStdout) => {
      if (useErr) {
        console.error(`Error executing nvm use: ${useErr}`);
        process.exit(1);
      }

      console.log(useStdout);
    });
  });
});
