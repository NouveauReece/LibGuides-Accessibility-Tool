import { readFileSync, writeFileSync, copyFileSync, statSync } from 'fs'

// Read the bundle (minified by Vite/Rollup)
const code = readFileSync('dist-bookmarklet/bookmarklet.js', 'utf-8')

// Collapse all whitespace (including newlines and spaces) to minimize further
let minified = code.replace(/\s+/g, '')

// Wrap the minified code inline without newlines or indentation
const bookmarklet = `javascript:(function(){${minified}})()`

// Write to bookmarklet.txt
writeFileSync('dist-bookmarklet/bookmarklet.txt', bookmarklet)

// Copy bookmarklet-mini.js from source to dist-bookmarklet
copyFileSync('src/bookmarklet/bookmarklet-mini.js', 'dist-bookmarklet/bookmarklet-mini.js')

// Copy bookmarklet.js to public directory
copyFileSync('dist-bookmarklet/bookmarklet.js', 'public/bookmarklet.js')

// Copy bookmarklet-mini.js to public directory
copyFileSync('dist-bookmarklet/bookmarklet-mini.js', 'public/bookmarklet-mini.js')

// Log the byte count
const stats = statSync('dist-bookmarklet/bookmarklet.txt')
console.log(`Bookmarklet written to dist-bookmarklet/bookmarklet.txt (${stats.size} bytes)`)
console.log(`Bookmarklet copied to public/bookmarklet.js`)
console.log(`Bookmarklet mini copied to public/bookmarklet-mini.js`)