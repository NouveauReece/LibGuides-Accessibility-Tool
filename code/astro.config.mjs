// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { remarkModifiedTime } from './scripts/remark-modified-time';
import CONFIG from './src/bookmarklet/config.json' with { type: 'json' };
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: CONFIG.website,
  srcDir: './src/website',
  outDir: 'dist-website',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'dark-plus',
      wrap: true,
    },
    processor: unified({
      remarkPlugins: [remarkModifiedTime],
    })
  },
  integrations: [mdx()],
});