import { html, nothing } from "lit";
import { RULE_DEFINITIONS } from '../rules/ruleDescriptions.js';
import { getViolationSeverity } from '../logic/violationSeverity.js';

const SEVERITY_ICONS = {
	critical: { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--rvt-color-crimson-500)" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7 1h2V4H7zm2 2a1 1 0 1 0-2 0 1 1 0 0 0 2 0"/></svg>`, varPrefix: '--critical' },
	required: { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#996400" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7-3a1 1 0 1 0 2 0 1 1 0 0 0-2 0m2 2H7v5h2z"/></svg>`, varPrefix: '--required' },
	check: { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--rvt-color-purple-700)" aria-hidden="true"><path d="M1 7h10.844L7.737 2.146 9.263.854 15.31 8l-6.047 7.146-1.526-1.292L11.844 9H1z"/></svg>`, varPrefix: '--check' },
	unknown: { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--rvt-color-black-600)" aria-hidden="true"><path d="M4 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/></svg>`, varPrefix: '--unknown' }
};

export function renderDetailView({
	page,
	highlightViolationElements,
	backToHub,
	highlightNode,
	initialViolationCounts
}) {

	const groupedViolations = {
		critical: [],
		required: [],
		check: [],
		unknown: []
	};

	page.violations.forEach(violation => {
		const severity = getViolationSeverity(violation);
		groupedViolations[severity.type].push({ violation, severity });
	});

	const renderViolationGroup = (violations, severity) => {
		if (violations.length === 0) return nothing;

		return html`
			<div style="margin-bottom: 24px;">
				<h3 class="rvt-text-bold" style="margin-top: 0; margin-bottom: 8px;">
					${html`${SEVERITY_ICONS[severity]?.icon}`}
					${severity} Fixes (${violations.length})
				</h3>
				${violations.map(({ violation, severity }) => html`
					<div style="border: 1px solid #ddd; border-radius: 4px; padding: 16px; margin-bottom: 12px;">
						<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
						<h4 style="margin: 0; color: #333; flex: 1;"><span class="rvt-badge rvt-badge--danger-secondary">${violation.nodes.length}</span> ${RULE_DEFINITIONS[violation.id]?.title || violation.id}</h4>
						<button @click=${() => highlightViolationElements(violation)} class="rvt-button rvt-button--small rvt-button--secondary">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path d="m15.356 7.478.027.051.235.471-.236.47-.026.052a13 13 0 0 1-.464.794 14 14 0 0 1-1.399 1.853C12.303 12.492 10.427 14 8 14s-4.302-1.508-5.493-2.831A14 14 0 0 1 .644 8.522l-.027-.051L.382 8l.235-.47a6 6 0 0 1 .125-.232 14 14 0 0 1 1.765-2.467C3.697 3.508 5.573 2 8 2s4.302 1.508 5.493 2.831a14 14 0 0 1 1.863 2.647m-12.558.768c.276.436.68 1.013 1.195 1.585C5.053 11.008 6.427 12 8 12s2.948-.992 4.007-2.169A12 12 0 0 0 13.354 8a12 12 0 0 0-1.347-1.831C10.947 4.992 9.573 4 8 4s-2.948.992-4.007 2.169A12 12 0 0 0 2.646 8q.068.113.152.246"/></svg>
							View on Page
						</button>
					</div>
						<p style="margin: 0 0 8px 0; color: #333; font-size: 14px;">${RULE_DEFINITIONS[violation.id]?.friendlyDescription || violation.description}</p>

						${violation.nodes && violation.nodes.length > 0 ? html`
							<div class="rvt-disclosure" data-rvt-disclosure="disclosure-1">
								<button class="rvt-disclosure__toggle" data-rvt-disclosure-toggle aria-expanded="false">Affected elements</button>
								<div class="rvt-disclosure__content" data-rvt-disclosure-target hidden>
									<ul class="rvt-prose rvt-flow" style="padding:0;margin:0;">
										${violation.nodes.map(node => html`
											<li style="padding:0;margin:0;list-style:none;">
											<button @click=${() => highlightNode(node)} class="rvt-button rvt-button--plain" style="text-align: left; width: 100%; padding: 8px; border-radius: 4px; border: 1px solid transparent; cursor: pointer;" title="Click to highlight this element on the page">
												<code class="rvt-font-mono rvt-ts-xxs" style="word-break: break-all; text-overflow: ellipsis; overflow: hidden;">
													${node.html}
												</code>
											</button>
											</li>
											`)}
									</ul>
								</div>
							</div>
							<div class="rvt-disclosure" data-rvt-disclosure="disclosure-2">
								<button class="rvt-disclosure__toggle" data-rvt-disclosure-toggle aria-expanded="false">How to Fix </button>
								<div class="rvt-disclosure__content" data-rvt-disclosure-target hidden>
									${(() => {
									const rule = RULE_DEFINITIONS[violation.id];

									return html`
										<div class="rvt-prose" style="margin:0;">
										${RULE_DEFINITIONS[violation.id]?.howToFix
											? html`<p>${RULE_DEFINITIONS[violation.id]?.howToFix}</p>`
											: html`<p>No fix guidance available for this issue.</p>`}
										</div>
									`;
									})()}
								</div>
							</div>
						` : nothing}
					</div>
				`)}
			</div>
		`;
	};

	return html`
		<div style="padding: 16px;">
			<button @click=${backToHub}  type="button" class="rvt-button rvt-button--plain">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M15 7H4.156l4.107-4.854L6.737.854.69 8l6.047 7.146 1.526-1.292L4.156 9H15z"/></svg>
				<span>Back</span>
			</button>

			<h2 class="rvt-flex rvt-flex-row">
				<img class="rvt-card__image" src=${page.image?.src || 'https://s3.amazonaws.com/libapps/apps/common/images/gc-md.gif'} alt="" style="aspect-ratio:1; height:30px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
				${page.title}
			</h2>

			${page.violations.length > 0 || initialViolationCounts.has(page.title) ? html`
				
				
				${(() => {
					const criticalCount = groupedViolations.critical.length;
					const requiredCount = groupedViolations.required.length;
					const checkCount = groupedViolations.check.length;
					const currentTotal = criticalCount + requiredCount + checkCount;
					
					// Get initial counts and calculate resolved violations
					const initialCounts = initialViolationCounts.get(page.title) || { critical: 0, required: 0, check: 0 };
					const resolvedCritical = Math.max(0, initialCounts.critical - criticalCount);
					const resolvedRequired = Math.max(0, initialCounts.required - requiredCount);
					const resolvedCheck = Math.max(0, initialCounts.check - checkCount);
					const resolvedTotal = resolvedCritical + resolvedRequired + resolvedCheck;
					
					const grandTotal = currentTotal + resolvedTotal;
					if (grandTotal === 0) return nothing;
					
					const criticalPercent = (criticalCount / grandTotal) * 100;
					const requiredPercent = (requiredCount / grandTotal) * 100;
					const checkPercent = (checkCount / grandTotal) * 100;
					const resolvedPercent = (resolvedTotal / grandTotal) * 100;
					
					return html`
						<div style="margin-top: 24px; margin-bottom: 24px;">
							<h3 class="rvt-text-bold" style="margin-top: 0; margin-bottom: 12px;">Violations Summary</h3>
							<table class="charts-css bar multiple stacked">
								<tbody>
									<tr>
										${criticalCount > 0 ? html`
											<td style="--size: calc(${criticalCount} / ${grandTotal}); --color: var(--rvt-color-crimson-100)">
												<span style="color: var(--rvt-color-crimson-500)">${criticalCount}</span>
												<span>Critical</span>
											</td>
										` : nothing}
										${requiredCount > 0 ? html`
											<td style="--size: calc(${requiredCount} / ${grandTotal}); --color: var(--rvt-color-gold-100) ">
												<span style="color: #996400">${requiredCount}</span>
												<span>Required</span>
											</td>
										` : nothing}
										${checkCount > 0 ? html`
											<td style="--size: calc(${checkCount} / ${grandTotal}); --color: var(--rvt-color-purple-100);">
												<span style="color: var(--rvt-color-purple-700)">${checkCount}</span>
												<span>Check</span>
											</td>
										` : nothing}
										${resolvedTotal > 0 ? html`
											<td style="--size: calc(${resolvedTotal} / ${grandTotal}); --color: #27ae60;">
												<span style="color: var(--resolved-dark)">${resolvedTotal}</span>
												<span>Resolved</span>
											</td>
										` : nothing}
									</tr>
								</tbody>
							</table>
							${resolvedTotal > 0 ? html`<p style="margin: 8px 0 0 0; font-size: 12px; color: #27ae60; font-weight: 500;">Progress: ${Math.round((resolvedTotal / (currentTotal + resolvedTotal)) * 100)}% resolved</p>` : nothing}
						</div>
					`;
				})()}
			` : nothing}
				 

				<div style="margin-top: 24px;">
					${page.violations.length === 0 ? html`
						<div class="rvt-alert rvt-alert--success [ rvt-m-top-md ]" role="alert" aria-labelledby="success-alert-title" data-rvt-alert="success">
							<div class="rvt-alert__title" id="success-alert-title">Passed All Checks</div>
							<p class="rvt-alert__message">This page passed all the accessibility checks this tool runs!</p>
						</div>
					` : html`
						${renderViolationGroup(groupedViolations.critical, 'Critical')}
						${renderViolationGroup(groupedViolations.required, 'Required')}
						${renderViolationGroup(groupedViolations.check, 'Check')}
						${renderViolationGroup(groupedViolations.unknown, 'Unknown')}
					`}
				</div>
			</div>
	`;
}
