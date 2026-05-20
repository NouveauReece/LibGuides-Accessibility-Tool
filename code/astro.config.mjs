// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight'; // Documentation

// https://astro.build/config
export default defineConfig({
  outDir: 'dist',
  integrations: [
    starlight({
      title: 'LibGuides Accessibility Tool Docs',
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
        { icon: 'github', label: 'GitHub', href: 'https://github.com/NouveauReece/LibGuides-Accessibility-Tool' },
      ],
    }),
  ]
})