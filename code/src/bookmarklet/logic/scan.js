import { trackScanCompleted } from './analytics.js';
import { runCustomRules } from '../rules/index.js'

export function deduplicateViolationNodes(violations = []) {
    return violations.map((violation) => {
        if (!Array.isArray(violation?.nodes) || violation.nodes.length <= 1) {
            return violation;
        }

        const seenNodes = new Set();
        const dedupedNodes = violation.nodes.filter((node) => {
            const signature = JSON.stringify(node?.target || node);
            if (seenNodes.has(signature)) {
                return false;
            }

            seenNodes.add(signature);
            return true;
        });

        return { ...violation, nodes: dedupedNodes };
    });
}

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
            const customRuleResults = await runCustomRules(page.container);
            const combinedViolations = [...axeResults.violations, ...customRuleResults.violations];
            results.push({ ...page, violations: deduplicateViolationNodes(combinedViolations) })
        }

        console.log(results);

        // Track scan completion analytics
        try {
            const violationsByImpact = {
                critical: 0,
                serious: 0,
                moderate: 0,
                minor: 0,
                quality: 0
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
