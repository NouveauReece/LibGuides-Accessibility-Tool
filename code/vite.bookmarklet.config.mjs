import { defineConfig } from 'vite'

const EXTERNAL_LIT = process.env.EXTERNAL_LIT === 'true';

export default defineConfig({
    root: 'src/bookmarklet',
    build: {
        outDir: '../../dist-bookmarklet',
        emptyOutDir: true,
        lib: {
            entry: EXTERNAL_LIT ? 'index-dynamic.js' : 'index.js',
            name: 'Bookmarklet',
            formats: ['iife'],
            fileName: () => 'bookmarklet.js',
        },
        rollupOptions: {
            external: EXTERNAL_LIT ? ['lit'] : [],
            output: {
                inlineDynamicImports: true,
                compact: true,
            },
        },
    },
})