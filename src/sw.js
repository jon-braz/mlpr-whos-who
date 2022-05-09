import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw/';

import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

setupRouting();
setupPrecaching(getFiles());

// Serve cached JS and CSS, update in background for next fetch
registerRoute(
  ({ request }) =>
    request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate()
);
