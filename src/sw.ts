/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

// Import Workbox libraries
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Set up the BroadcastChannel
const broadcastChannel = new BroadcastChannel('cache-updates');

// Register routes using StaleWhileRevalidate strategy with custom cacheWillUpdate

// handle api requests
registerRoute(
    ({ url }) => url.origin === 'https://raw.githubusercontent.com' && url.pathname.startsWith('/Rafi-Riday/phoenix-cheatsheet/main/static/db'),
    new StaleWhileRevalidate({
        cacheName: 'api-cache',
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            {
                cacheWillUpdate: async ({ request, response, event }) => {
                    if (response) {
                        const clonedResponse = response.clone();
                        broadcastChannel.postMessage({
                            type: 'CACHE_UPDATED',
                            request: request.url,
                            response: await clonedResponse.json(),
                        });
                    }
                    return response;
                },
            },
        ],
    })
);

// handle image requests
registerRoute(
    ({ request }) => request.destination === 'image',
    new StaleWhileRevalidate({
        cacheName: 'images-cache',
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            {
                cacheWillUpdate: async ({ request, response, event }) => {
                    if (response) {
                        const clonedResponse = response.clone();
                        broadcastChannel.postMessage({
                            type: 'IMAGE_CACHE_UPDATED',
                            request: request.url,
                            response: await clonedResponse.blob(),
                        });
                    }
                    return response;
                },
            },
        ],
    })
);


// Other Workbox configurations
