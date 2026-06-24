import { html, nothing } from "lit";
import { RULE_DEFINITIONS } from '../rules/ruleDescriptions.js';
import { getViolationSeverity } from '../logic/violationSeverity.js';
import tagPrettyName from "../rules/prettyTagNames.js";
import { getAccessibleName } from "../logic/getAccessibleName.js"

const SEVERITY_ICONS = {
	critical: { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--rvt-color-crimson-500)" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7 1h2V4H7zm2 2a1 1 0 1 0-2 0 1 1 0 0 0 2 0"/></svg>`, varPrefix: '--critical' },
	required: { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#996400" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7-3a1 1 0 1 0 2 0 1 1 0 0 0-2 0m2 2H7v5h2z"/></svg>`, varPrefix: '--required' },
	quality: { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--rvt-color-purple-700)" aria-hidden="true"><path d="M1 7h10.844L7.737 2.146 9.263.854 15.31 8l-6.047 7.146-1.526-1.292L11.844 9H1z"/></svg>`, varPrefix: '--quality' },
	unknown: { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--rvt-color-black-600)" aria-hidden="true"><path d="M4 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/></svg>`, varPrefix: '--unknown' },
	hidden: { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--rvt-color-black-600)" aria-hidden="true"><path d="M4 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/></svg>`, varPrefix: '--unknown' }
};

// Helper function to check if a violation is in a hidden box
function isViolationInHiddenBox(violation) {
	if (!violation.nodes || violation.nodes.length === 0) return false;
	
	// Check if any of the violation nodes are within a hidden box
	for (const node of violation.nodes) {
		try {
			const element = document.querySelector(node.target);
			console.log(element);
			if (!element) continue;
			
			// Traverse up the DOM to find a parent .s-lib-box with a hidden indicator
			let box = element.closest(".s-lib-box")
			let boxTitle = box.querySelector('.s-lib-box-title');
			return boxTitle && boxTitle.querySelector('.fa-eye-slash');
		} catch (e) {
			console.error(e);
		}
	}
	
	return false;
}

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
		quality: [],
		hidden: [],
		unknown: []
	};

	page.violations.forEach(violation => {
		// Check if violation is in a hidden box first
		if (isViolationInHiddenBox(violation)) {
			const severity = 'hidden';
			groupedViolations['hidden'].push({ violation, severity });
		} else {
			const severity = getViolationSeverity(violation);
			groupedViolations[severity.type].push({ violation, severity });
		}
	});

	const renderViolationGroup = (violations, severity) => {
		if (violations.length === 0) return nothing;

		console.log(violations);

		return html`
			<div style="margin-bottom: 24px;">
				<h3 class="rvt-text-bold" style="margin-top: 0; margin-bottom: 8px;">
					${html`${SEVERITY_ICONS[severity]?.icon}`}
					${severity} (${violations.length})
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
								<div class="rvt-disclosure__content" style="margin-left: 1rem" data-rvt-disclosure-target hidden>
									<ul class="rvt-prose rvt-flow" style="padding:0;margin:0;">
										${violation.nodes.map(node => html`
											<li style="padding:0 0 5px 0; margin:0; list-style:none;">
											<button @click=${() => highlightNode(node)} class="rvt-button rvt-button--secondary grid-btn" style="cursor: pointer; text-align: start" title="Click to highlight this element on the page">
												<svg style="grid-area: icon;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path d="m15.356 7.478.027.051.235.471-.236.47-.026.052a13 13 0 0 1-.464.794 14 14 0 0 1-1.399 1.853C12.303 12.492 10.427 14 8 14s-4.302-1.508-5.493-2.831A14 14 0 0 1 .644 8.522l-.027-.051L.382 8l.235-.47a6 6 0 0 1 .125-.232 14 14 0 0 1 1.765-2.467C3.697 3.508 5.573 2 8 2s4.302 1.508 5.493 2.831a14 14 0 0 1 1.863 2.647m-12.558.768c.276.436.68 1.013 1.195 1.585C5.053 11.008 6.427 12 8 12s2.948-.992 4.007-2.169A12 12 0 0 0 13.354 8a12 12 0 0 0-1.347-1.831C10.947 4.992 9.573 4 8 4s-2.948.992-4.007 2.169A12 12 0 0 0 2.646 8q.068.113.152.246"/></svg>
												<p style="word-break: break-all; text-overflow: ellipsis; overflow: hidden;"><strong>${tagPrettyName[document.querySelector(node.target).tagName.toLowerCase()]}</strong>: ${getAccessibleName(node.target) || html`<em>[No Accessible Description]</em>`}</p>
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

			<h2 class="rvt-flex rvt-flex-row rvt-items-center">
				<img class="rvt-card__image" src=${page.image?.src || 'https://s3.amazonaws.com/libapps/apps/common/images/gc-md.gif'} alt="" style="width:30px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
				<span class="rvt-flex rvt-flex-column rvt-items-start">
					${page.title}
					${ page.isHidden ? 
						html`
						<span class="rvt-badge rvt-badge--secondary rvt-flex rvt-flex-row rvt-items-center rvt-color-black rvt-text-medium">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" title="Hidden Page" style="fill:currentColor; aspect-ratio:1; height:15px; width: 15px; object-fit: cover; margin-right: 5px; border-radius: 4px;"><path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/></svg>
						Hidden Page
						</span>` : 
						nothing
					}
				</span>
				
				
			</h2>

			${page.violations.length > 0 || initialViolationCounts.has(page.title) ? html`
				
				
				${(() => {
					const criticalCount = groupedViolations.critical.length;
					const requiredCount = groupedViolations.required.length;
					const qualityCount = groupedViolations.quality.length;
					const hiddenCount = groupedViolations.hidden.length;
					const currentTotal = criticalCount + requiredCount + qualityCount;
					
					// Get initial counts and calculate resolved violations
					const initialCounts = initialViolationCounts.get(page.title) || { critical: 0, required: 0, quality: 0 };
					const resolvedCritical = Math.max(0, initialCounts.critical - criticalCount);
					const resolvedRequired = Math.max(0, initialCounts.required - requiredCount);
					const resolvedquality = Math.max(0, initialCounts.quality - qualityCount);
					const resolvedTotal = resolvedCritical + resolvedRequired + resolvedquality;
					
					const grandTotal = currentTotal + resolvedTotal;
					if (grandTotal === 0) return nothing;
					
					const criticalPercent = (criticalCount / grandTotal) * 100;
					const requiredPercent = (requiredCount / grandTotal) * 100;
					const qualityPercent = (qualityCount / grandTotal) * 100;
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
										${qualityCount > 0 ? html`
											<td style="--size: calc(${qualityCount} / ${grandTotal}); --color: var(--rvt-color-purple-100);">
												<span style="color: var(--rvt-color-purple-700)">${qualityCount}</span>
												<span>Quality</span>
											</td>
										` : nothing}
										${hiddenCount > 0 ? html`
											<td style="--size: calc(${hiddenCount} / ${grandTotal}); --color: var(--rvt-color-purple-100);">
												<span style="color: var(--rvt-color-purple-700)">${hiddenCount}</span>
												<span>Hidden</span>
											</td>
										` : nothing}
										${/* resolvedTotal > 0 ? html`
											<td style="--size: calc(${resolvedTotal} / ${grandTotal}); --color: #27ae60;">
												<span style="color: var(--resolved-dark)">${resolvedTotal}</span>
												<span>Resolved</span>
											</td>
										` : nothing */
										nothing }
									</tr>
								</tbody>
							</table>
							${ /* resolvedTotal > 0 ? html`<p style="margin: 8px 0 0 0; font-size: 12px; color: #27ae60; font-weight: 500;">Progress: ${Math.round((resolvedTotal / (currentTotal + resolvedTotal)) * 100)}% resolved</p>` : nothing */ nothing}
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
						${renderViolationGroup(groupedViolations.quality, 'Quality')}
						${renderViolationGroup(groupedViolations.hidden, 'In a Hidden Box')}
						${renderViolationGroup(groupedViolations.unknown, 'Unknown')}
					`}
				</div>
			</div>
	`;
}
