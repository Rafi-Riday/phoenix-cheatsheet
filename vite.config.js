import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'production',
			strategies: 'generateSW',
			registerType: 'autoUpdate',
			scope: '/',
			base: '/',
			selfDestroying: process.env.SELF_DESTROYING_SW === 'true',
			manifest: {
				name: "Phoenix Cheat-Sheet",
				short_name: "Phoenix Cheat-Sheet",
				description: "Phoenix Cheat-Sheet App",
				start_url: "/",
				scope: '/',
				display: "standalone",
				theme_color: "#570df8",
				background_color: "#f2f2f2",
				icons: [
					{
						src: "/favicon-192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any maskable"
					},
					{
						src: "/favicon-512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable"
					}
				]
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
				runtimeCaching: [{
					urlPattern: ({ request }) => request.destination === 'image',
					handler: 'NetworkFirst',
					options: {
						cacheName: 'images-cache',
					},
				}, {
					urlPattern: ({ url }) => url.origin === 'https://raw.githubusercontent.com' && url.pathname.startsWith('/Rafi-Riday/phoenix-cheatsheet/main/static/db'),
					handler: 'NetworkFirst',
					options: {
						cacheName: 'api-cache',
						cacheableResponse: {
							statuses: [0, 200]
						}
					},
				}]
			},
		})
	],
});
