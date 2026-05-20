import { defineConfig } from 'vite'

export default defineConfig({
    root: 'src/bookmarklet',
    build: {
        outDir: '../../dist-bookmarklet',
        emptyOutDir: true,
        lib: {
            entry: 'index.js',
            name: 'Bookmarklet',
            formats: ['iife'],
            fileName: () => 'bookmarklet.js',
        },
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
        minify: true,
    },
})