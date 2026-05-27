import { trackScanCompleted } from './analytics.js';

export async function scanPages(pages) {
    try {
        const axeOptions = {
            runOnly: ['wcag2a', 'wcag2aa', 'best-practice'],
            iframes: false,
            rules: {
                'color-contrast-enhanced': { enabled: true },
                'hidden-content': { enabled: true },
                'label-content-name-mismatch': { enabled: true },
                'p-as-heading': { enabled: true },
                'table-fake-caption': { enabled: true },
                'td-has-header': { enabled: true }
            },
            resultTypes: ['violations']
        }

        const results = []
        for (const page of pages) {
            const axeResults = await axe.run(page.container, axeOptions);
            results.push({ ...page, violations: axeResults.violations })
        }

        // Track scan completion analytics
        try {
            const violationsByImpact = {
                critical: 0,
                serious: 0,
                moderate: 0,
                minor: 0,
                check: 0
            };
            
            results.forEach(page => {
                page.violations.forEach(violation => {
                    const impact = violation.impact?.toLowerCase() || 'unknown';
                    if (impact in violationsByImpact) {
                        violationsByImpact[impact]++;
                    }
                });
            });
            
            const currentPage = results.find(p => p.current);
            
            trackScanCompleted({
                violationsByImpact,
                pageCount: results.length,
                guideTitle: currentPage?.title || 'unknown',
                guideUrl: window.location.href
            });
        } catch (analyticsError) {
            console.warn('[LAT] Analytics tracking failed:', analyticsError);
        }

        return results
    } catch (err) {
        console.error('[ERROR] scanPages failed:', err);
        console.error('[ERROR] Stack:', err.stack);
    }
}
