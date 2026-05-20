import { readFileSync, writeFileSync } from 'fs'

// This is the JS bundle
const code = readFileSync('dist-bookmarklet/bookmarklet.js', 'utf-8')
const bookmarklet = `javascript:(function(){${code.trim()}})();`

// And this is .txt has a URL for pasting into an address bar
writeFileSync('dist-bookmarklet/bookmarklet.txt', bookmarklet)

console.log('Bookmarklet written to dist-bookmarklet/bookmarklet.txt')