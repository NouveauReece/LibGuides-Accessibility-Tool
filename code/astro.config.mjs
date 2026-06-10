// @ts-check
import { defineConfig } from 'astro/config';
import CONFIG from './src/bookmarklet/config.json' with { type: 'json' };
import starlight from '@astrojs/starlight'; // Documentation

// https://astro.build/config
export default defineConfig({
  site: CONFIG.website,
  srcDir: './src/website',
  outDir: 'dist-website',
  integrations: [
    starlight({
      title: `${CONFIG.title} Docs`,
      logo: {
        src: '/public/favicon.svg',
      },
      sidebar: [
        {
          label: 'Docs',
          items: [{ autogenerate: { directory: 'docs' } }],
        },
      ],
      routeMiddleware: './src/docsRouteMiddleware.mjs',
      social: [
        { icon: 'github', label: 'GitHub', href: CONFIG.github },
      ],
    }),
  ]
})