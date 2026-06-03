/**
 * Conditional Lit loader
 * When EXTERNAL_LIT=true, loads from CDN at runtime
 * When EXTERNAL_LIT=false, uses bundled version
 */

let litModule;

export async function initLit() {
	if (litModule) return litModule;
	
	// Dynamic import from CDN
	const module = await import('https://esm.sh/lit@3.1.2');
	litModule = module;
	return module;
}

// For static imports (when bundled)
export { LitElement, html, css, nothing } from 'lit';
