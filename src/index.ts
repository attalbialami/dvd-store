import dotenv from 'dotenv';

import { createServer } from './api/server';

dotenv.config({
  path: '.env.local',
  quiet: true,
});

/**
 * HTTP entrypoint of the application
 *
 * This file is responsible only for:
 * - starting the HTTP server
 * - listening on a port
 */
const PORT = process.env.PORT ?? 3000;

const app = createServer();

app.listen(PORT, () => {
  console.log(`>> API server running on port ${PORT}`);
});
