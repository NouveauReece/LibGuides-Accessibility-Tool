/**
 * Dynamic Lit entry point
 * Loads Lit from CDN before initializing the bookmarklet
 */

(async function() {
	'use strict';
	
	// Load Lit from CDN before anything else
	const litModule = await import('https://esm.sh/lit@3.1.2');
	
	// Make Lit available as 'lit' module for other imports
	const litModuleProxy = {
		...litModule,
	};
	
	// Register as a module that other dynamic imports can use
	const importMap = { imports: { 'lit': 'https://esm.sh/lit@3.1.2' } };
	const scriptMap = document.createElement('script');
	scriptMap.type = 'importmap';
	scriptMap.textContent = JSON.stringify(importMap);
	document.head.appendChild(scriptMap);
	
	// Now import and initialize the main app
	// Import components (they will now find 'lit' from the import map)
	await import('./components/BookmarkletFrame.js');
	
	// Add highlight styles
	if (document.querySelectorAll('accessibility-tool').length == 0) {
		const style = document.createElement('style');
		style.textContent = `.a11y-violation-highlight {outline: 4px solid #ffcb05 !important;outline-offset: 2px !important;background: rgba(255, 203, 5, 0.1) !important;scroll-margin: 100px;}`;
		document.head.appendChild(style);
		
		const tool = document.createElement('accessibility-tool');
		document.body.appendChild(tool);
	}
})();
