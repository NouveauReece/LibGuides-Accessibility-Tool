import CONFIG from '../config.json' assert { type: 'json' };

let GA_MEASUREMENT_ID = CONFIG['ga-id'];
let gaInitialized = false;
let userIdentifier = null;
let eventQueue = [];

/**
 * Initializes GA4 with the measurement ID
 * @param {string} measurementId - GA4 Measurement ID (e.g., "G-XXXXXXXXXX")
 * @param {object} identifier - User identifier {type, value}
 */
export function initializeAnalytics(measurementId, identifier) {
	userIdentifier = identifier;
	gaInitialized = true;
	if (!window.gtag && GA_MEASUREMENT_ID) { loadGtagScript(); }
	flushEventQueue();
}

function loadGtagScript() {
	try {
		// Create and inject gtag script
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
		document.head.appendChild(script);

		// Initialise gtag
		window.dataLayer = window.dataLayer || [];
		function gtag() { window.dataLayer.push(arguments); }
		window.gtag = gtag;

		gtag('js', new Date());
		gtag('config', GA_MEASUREMENT_ID, {
			'anonymize_ip': true,
			'allow_google_signals': false
		});

	} catch (error) {
		console.warn('[LAT] Failed to load gtag script:', error);
	}
}

/**
 * Sends an event to GA4
 * @param {string} eventName - Event name (e.g., "scan_completed")
 * @param {object} eventData - Event parameters
 */
export function trackEvent(eventName, eventData = {}) {

	if (!gaInitialized) {
		eventQueue.push({ eventName, eventData });
		return;
	}

	try {
		// Add user context to event data
		const enrichedData = {
			...eventData,
			user_type: userIdentifier?.type || 'unknown',
			user_id: userIdentifier?.value || 'unknown'
		};

		// Use gtag if available, otherwise queue
		if (window.gtag) {
			window.gtag('event', eventName, enrichedData);
			console.log('[LAT] Event:', eventName, enrichedData);
		} else {
			// Fallback: Try direct GA4 endpoint
			sendEventToGA4Endpoint(eventName, enrichedData);
		}
	} catch (error) {
		console.warn('[LAT] Error tracking event:', error);
	}
}

/**
 * Fallback: Send event directly to GA4 endpoint
 * Used if gtag script failed to load
 * @param {string} eventName
 * @param {object} eventData
 */
function sendEventToGA4Endpoint(eventName, eventData) {
	try {
		const payload = {
			measurement_id: GA_MEASUREMENT_ID,
			api_secret: '', // Will be handled client-side via GA config
			events: [{
				name: eventName,
				params: eventData
			}]
		};

		// Send to GA4 measurement protocol
		fetch('https://www.google-analytics.com/mp/collect', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
			keepalive: true
		}).catch(e => console.warn('[A11y Analytics] Direct endpoint failed:', e));
	} catch (error) {
		console.warn('[A11y Analytics] Error sending to GA4 endpoint:', error);
	}
}

function flushEventQueue() {
	while (eventQueue.length > 0) {
		const { eventName, eventData } = eventQueue.shift();
		trackEvent(eventName, eventData);
	}
}

export function trackBookmarkletOpened() {
	trackEvent('bookmarklet_opened', {
		timestamp: new Date().toISOString(),
		page_url: window.location.href
	});
}

/**
 * Tracks scan completion
 * @param {object} scanSummary - Summary of violations
 *   {
 *     violationsByImpact: {critical: 0, serious: 0, moderate: 0, minor: 0, check: 0},
 *     topViolationRuleIds: ['rule-1', 'rule-2', ...],
 *     pageCount: 1,
 *     guideTitle: 'Guide Name',
 *     guideUrl: 'https://...'
 *   }
 */
export function trackScanCompleted(scanSummary) {
	const {
		violationsByImpact = {},
		pageCount = 1,
		guideTitle = 'unknown',
		guideUrl = window.location.href
	} = scanSummary;

	const totalViolations = Object.values(violationsByImpact).reduce((a, b) => a + b, 0);

	trackEvent('scan_completed', {
		total_violations: totalViolations,
		critical_violations: violationsByImpact.critical || 0,
		serious_violations: violationsByImpact.serious || 0,
		moderate_violations: violationsByImpact.moderate || 0,
		minor_violations: violationsByImpact.minor || 0,
		check_violations: violationsByImpact.check || 0,
		top_violation_rules: topViolationRuleIds.slice(0, 5).join(','),
		page_count: pageCount,
		guide_title: guideTitle,
		guide_url: guideUrl,
		timestamp: new Date().toISOString()
	});
}

