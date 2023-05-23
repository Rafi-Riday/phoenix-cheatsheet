import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

/** @type {import('vite').UserConfig} */
const config = {
	define: {
		'process.env.NODE_ENV': process.env.NODE_ENV === 'production'
			? '"production"'
			: '"development"'
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'production',
			// you don't need to do this if you're using generateSW strategy in your app
			strategies: 'generateSW',
			// strategies: 'injectManifest',
			// you don't need to do this if you're using generateSW strategy in your app
			// filename: generateSW ? undefined : 'prompt-sw.ts',
			// filename: 'my-sw.js',
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
			// injectManifest: {
			// 	globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			// },
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
				runtimeCaching: [{
					urlPattern: ({ request }) => request.destination === 'image',
					handler: 'CacheFirst',
					options: {
						cacheName: 'images-cache',
					},
				}, {
					urlPattern: ({ url }) => url.origin === 'https://raw.githubusercontent.com' && url.pathname.startsWith('/Rafi-Riday/phoenix-cheatsheet/main/static/db'),
					handler: 'CacheFirst',
					options: {
						cacheName: 'api-cache',
						cacheableResponse: {
							statuses: [0, 200]
						}
					},
				}]
			},
			// devOptions: {
			// 	enabled: true,
			// 	type: 'module',
			// 	navigateFallback: '/',
			// },
			// if you have shared info in svelte config file put in a separate module and use it also here
			// kit: {}
		})
	],
}

export default config
