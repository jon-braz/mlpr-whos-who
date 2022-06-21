import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw/';

import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

setupRouting();

// Setup asset precaching, including area maps
const urlsToCache = getFiles();
urlsToCache.push({ url: '/assets/areas/bluebarn.jpg', revision: 1 });
urlsToCache.push({ url: '/assets/areas/field.jpg', revision: 1 });
urlsToCache.push({ url: '/assets/areas/front.jpg', revision: 1 });
urlsToCache.push({ url: '/assets/areas/oldfolks.jpg', revision: 1 });
urlsToCache.push({ url: '/assets/areas/overview.jpg', revision: 1 });
urlsToCache.push({ url: '/assets/areas/redbarn.jpg', revision: 1 });
urlsToCache.push({ url: '/asses/areas/yard.jpg', revision: 2 });
setupPrecaching(urlsToCache);

// Serve cached JS and CSS, update in background for next fetch
registerRoute(
  ({ request }) =>
    request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate()
);
