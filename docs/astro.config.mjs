import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Documentation Messagerie Hetic',
			social: {
				github: 'https://github.com/setsudan/hetic-messaging-app-2023-2024',
			},
			sidebar: [
				{
					label: 'Commencer',
					link: '/docs/getting-started',
				},
				{
					label: 'Installation',
					link: '/docs/installation',
				},
				{
					label: 'Connecter Websocket',
					link: '/docs/connect-websocket',
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Routes',
					autogenerate: { directory: 'api' },
				}
			],
		}),
	],
});
