/**
 * User identification module
 * Extracts user email from LibApps or generates anonymous session ID
 */

const CACHE_KEY = 'a11y-tool-user-id';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Generates a v4 UUID for anonymous users
 * @returns {string} UUID v4
 */
function generateUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = Math.random() * 16 | 0;
		const v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

/**
 * Attempts to extract IU email from LibApps account endpoint
 * @returns {Promise<string | null>} Email if successful, null otherwise
 */
async function extractEmailFromLibApps() {
	try {
		console.log('[A11y] Attempting to extract email from LibApps...');
		
		const response = await fetch('https://iub.libapps.com/libapps/account', {
			method: 'GET',
			credentials: 'include', // Include cookies
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
			}
		});

		if (!response.ok) {
			console.log('[A11y] LibApps request returned status:', response.status);
			return null;
		}

		const html = await response.text();

		// Parse HTML for email input
		// Looking for: <input type="text" ... name="email" ... value="emailaddress@example.com" ... />
		const emailMatch = html.match(/<input[^>]*name="email"[^>]*value="([^"]+)"/i);
		
		if (emailMatch && emailMatch[1]) {
			const email = emailMatch[1].trim();
			if (email && email.includes('@')) {
				console.log('[A11y] Email extracted from LibApps:', email);
				return email;
			}
		}

		console.log('[A11y] Email not found in LibApps response');
		return null;
	} catch (error) {
		console.log('[A11y] Email extraction error:', error.message);
		return null;
	}
}

/**
 * Gets or creates a user identifier
 * Attempts to use IU email from LibApps; falls back to anonymous session ID
 * @returns {Promise<{type: string, value: string}>}
 *   - {type: 'email', value: 'user@iu.edu'} if IU email found
 *   - {type: 'anonymous', value: 'uuid-v4'} if anonymous
 */
export async function getUserIdentifier() {
	try {
		// Check if we have a cached identifier
		const cached = localStorage.getItem(CACHE_KEY);
		if (cached) {
			const { data, timestamp } = JSON.parse(cached);
			// Use cache if still within session duration
			if (Date.now() - timestamp < SESSION_DURATION_MS) {
				console.log('[A11y] Using cached user identifier');
				return data;
			}
		}

		// Try to get email from LibApps
		const email = await extractEmailFromLibApps();
		
		let identifier;
		if (email) {
			identifier = { type: 'email', value: email };
		} else {
			// Generate anonymous session ID
			identifier = { type: 'anonymous', value: generateUUID() };
		}

		// Cache the identifier
		localStorage.setItem(CACHE_KEY, JSON.stringify({
			data: identifier,
			timestamp: Date.now()
		}));

		return identifier;
	} catch (error) {
		console.error('[A11y] User identification failed:', error);
		// Always return anonymous fallback on error
		return { type: 'anonymous', value: generateUUID() };
	}
}

/**
 * Clears the cached user identifier
 */
export function clearUserIdentifierCache() {
	localStorage.removeItem(CACHE_KEY);
}
