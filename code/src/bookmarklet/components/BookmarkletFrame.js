import { LitElement, html, css, nothing } from "lit";
import { choose } from 'lit/directives/choose.js';
import { until } from 'lit/directives/until.js';
import { getPages, scanPages } from '../logic/utils.js';
import { RULE_DEFINITIONS } from '../rules/ruleDescriptions.js';
import "./PrimaryNav.js";
import "./Loading.js";
import "./SmartBadge.js";



class BookmarkletFrame extends LitElement {

	static properties = {
		_snapped: { type: Boolean, state: true },
        _stylesLoaded: { type: Boolean, state: true },
        _axeLoaded: { type: Boolean, state: true },
        _collectedPageInfo: { type: Boolean, state: true },
        _loadedPages: { type: Boolean, state: true },
		_minimised: { type: Boolean, state: true },
		_selectedPage: { type: Object, state: true },
	};

	constructor() {
		super();
		this._snapped = true;
		this._dragging = false;
		this._offsetX = 0;
		this._offsetY = 0;
		this._onMouseMove = this._dragElement.bind(this);
		this._onMouseUp = this._stopDragging.bind(this);
		this._onResize = this._clampToWindow.bind(this);
		this._minimised = false;
        this._numberOfPages = 0;
		this._scanResults = null;
		this._isScanning = false;
		this._selectedPage = null;
		this._initialViolationCounts = new Map(); // Track initial violation counts for resolved tracking
	}

	static styles = css`
		@keyframes slideIn {
			from {
				transform: translateX(100%);
			}
			to {
				transform: translateX(0);
			}
		}
		@keyframes slideOut {
			from {
				transform: translateX(0);
			}
			to {
				transform: translateX(100%);
			}
		}

		:host {
			background-color: white;
			width: 450px;
			max-height: 100svh;
			position: fixed;
			width: 400px;
			position: fixed;
			top: 0;
			right: 0;
			z-index: 2000000000;
			box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
			animation: slideIn 0.3s ease-out;
			transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

			--critical-light: var(--rvt-color-crimson-100);
			--critical-dark: var(--rvt-color-crimson-500);
			--required-light: var(--rvt-color-gold-100);
			--required-dark: #996400;
			--check-light: var(--rvt-color-purple-100);
			--check-dark: var(--rvt-color-purple-700);
			--unknown-light: var(--rvt-color-black-100);
			--unknown-dark: var(--rvt-color-black-600);
		}

		@media (max-width: 768px) {
			:host {
				width: 100%;
			}
		}

		header {
			cursor: move;
			z-index: 2000000001;
		}

		main {
			overflow-y: auto;
			overflow-x: none;
			max-height: calc(100svh - 75px);

			h2 {
				margin-top: 30px;
				padding-left: 14px;
				font-size: 24px;
			}
		}

		.rvt-lockup__title,
		.rvt-lockup__subtitle {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		.rvt-lockup__subtitle {
			font-size: 0.75rem;
		}

		.rvt-header-global__controls {
			gap: 8px;
		}

		.rvt-global-toggle {
			margin: 0 !important;
		}

		.rvt-link-hub__link {
			display: table-row;
			max-width: 100%;
		}

		table:not(.charts-css) {
			width: 100%;

			td {
				max-width: 160px;
			}

			td a {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

		}

		.charts-css td {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
			align-self: stretch;

			span:first-of-type {
				display: flex; 
				flex-direction: column; 
				justify-content: center; 
				align-items: flex-start; 
				text-align: center;
				font-size: 16px;
				font-weight: 700;
			}

			span:nth-child(2) {
				align-self: stretch;
				color: var(--Black-Primary-400, #4C5A69);
				text-align: center;
				font-size: 12px;
				font-style: normal;
				font-weight: 400;
			}
		}

		
	`;

	async connectedCallback() {
		super.connectedCallback();
		if (!document.querySelector("#rivet-fonts")) {
			const style = document.createElement("style");
			style.id = "rivet-fonts";
			style.textContent = `@font-face {font-family: BentonSans;font-style: normal;font-weight: 400;src: url("https://fonts.iu.edu/fonts/benton-sans-regular.eot");src: url("https://fonts.iu.edu/fonts/benton-sans-regular.eot?#iefix") format("embedded-opentype"), url("https://fonts.iu.edu/fonts/benton-sans-regular.woff") format("woff"), url("https://fonts.iu.edu/fonts/benton-sans-regular.ttf") format("truetype"), url("https://fonts.iu.edu/fonts/benton-sans-regular.svg#BentonSansRegular") format("svg");font-display: swap;}@font-face {font-family: BentonSans;font-style: italic;font-weight: 400;src: url("https://fonts.iu.edu/fonts/benton-sans-italic.eot");src: url("https://fonts.iu.edu/fonts/benton-sans-italic.eot?#iefix") format("embedded-opentype"), url("https://fonts.iu.edu/fonts/benton-sans-italic.woff") format("woff"), url("https://fonts.iu.edu/fonts/benton-sans-italic.ttf") format("truetype"), url("https://fonts.iu.edu/fonts/benton-sans-italic.svg#BentonSansItalic") format("svg");font-display: swap;}@font-face {font-family: BentonSans;font-style: normal;font-weight: 500;src: url("https://fonts.iu.edu/fonts/benton-sans-medium.eot");src: url("https://fonts.iu.edu/fonts/benton-sans-medium.eot?#iefix") format("embedded-opentype"), url("https://fonts.iu.edu/fonts/benton-sans-medium.woff") format("woff"), url("https://fonts.iu.edu/fonts/benton-sans-medium.ttf") format("truetype"), url("https://fonts.iu.edu/fonts/benton-sans-medium.svg#BentonSansMedium") format("svg");font-display: swap;}@font-face {font-family: BentonSans;font-style: normal;font-weight: 700;src: url("https://fonts.iu.edu/fonts/benton-sans-bold.eot");src: url("https://fonts.iu.edu/fonts/benton-sans-bold.eot?#iefix") format("embedded-opentype"), url("https://fonts.iu.edu/fonts/benton-sans-bold.woff") format("woff"), url("https://fonts.iu.edu/fonts/benton-sans-bold.ttf") format("truetype"), url("https://fonts.iu.edu/fonts/benton-sans-bold.svg#BentonSansBold") format("svg");font-display: swap;}@font-face {font-family: GeorgiaPro;font-style: normal;font-weight: 400;src: url("https://fonts.iu.edu/fonts/georgia-pro-regular.eot");src: url("https://fonts.iu.edu/fonts/georgia-pro-regular.eot?#iefix") format("embedded-opentype"), url("https://fonts.iu.edu/fonts/georgia-pro-regular.woff") format("woff"), url("https://fonts.iu.edu/fonts/georgia-pro-regular.ttf") format("truetype"), url("https://fonts.iu.edu/fonts/georgia-pro-regular.svg#GeorgiaProRegular") format("svg");font-display: swap;}@font-face {font-family: GeorgiaPro;font-style: italic;font-weight: 400;src: url("https://fonts.iu.edu/fonts/georgia-pro-italic.eot");src: url("https://fonts.iu.edu/fonts/georgia-pro-italic.eot?#iefix") format("embedded-opentype"), url("https://fonts.iu.edu/fonts/georgia-pro-italic.woff") format("woff"), url("https://fonts.iu.edu/fonts/georgia-pro-italic.ttf") format("truetype"), url("https://fonts.iu.edu/fonts/georgia-pro-italic.svg#GeorgiaProItalic") format("svg");font-display: swap;}@font-face {font-family: GeorgiaPro;font-style: normal;font-weight: 700;src: url("https://fonts.iu.edu/fonts/georgia-pro-bold.eot");src: url("https://fonts.iu.edu/fonts/georgia-pro-bold.eot?#iefix") format("embedded-opentype"), url("https://fonts.iu.edu/fonts/georgia-pro-bold.woff") format("woff"), url("https://fonts.iu.edu/fonts/georgia-pro-bold.ttf") format("truetype"), url("https://fonts.iu.edu/fonts/georgia-pro-bold.svg#GeorgiaProBold") format("svg");font-display: swap;}@font-face {font-family: GeorgiaPro;font-style: italic;font-weight: 700;src: url("https://fonts.iu.edu/fonts/georgia-pro-bold-italic.eot");src: url("https://fonts.iu.edu/fonts/georgia-pro-bold-italic.eot?#iefix") format("embedded-opentype"), url("https://fonts.iu.edu/fonts/georgia-pro-bold-italic.woff") format("woff"), url("https://fonts.iu.edu/fonts/georgia-pro-bold-italic.ttf") format("truetype"), url("https://fonts.iu.edu/fonts/georgia-pro-bold-italic.svg#GeorgiaProBoldItalic") format("svg");font-display: swap;}`;
			document.head.appendChild(style);
		}

		window.addEventListener("resize", this._onResize);
		this._performScan();
	}

	async _performScan() {
		if (this._isScanning || this._scanResults) return;
		this._isScanning = true;
		this._axeLoaded = false;
		try {
			this._scanResults = await this._loadAxe();
			// Store initial violation counts for each page
			this._scanResults.forEach(page => {
				const critical = page.violations.filter(v => v.impact === 'critical' || v.impact === 'serious').length;
				const required = page.violations.filter(v => v.impact === 'moderate' || v.impact === 'minor').length;
				const check = page.violations.filter(v => v.impact === 'check').length;
			this._initialViolationCounts.set(page.title, { critical, required, check });
			});
			this._axeLoaded = true;
		} finally {
			this._isScanning = false;
		}
		this.requestUpdate();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener("resize", this._onResize);
	}

	_minimise() {
		this._minimised = !this._minimised;
	}

	_snap() {
		this._snapped = true;
		this.style.left = "unset";
		this.style.top = "0px";
		this.style.right = "0px";
		this._minimised = false;
	}

	_close() {
		this.style.animation = "slideOut 0.3s ease-in";
		this.addEventListener("animationend", () => this.remove());
	}

	_startDragging(e) {
		e.preventDefault();
		const rect = this.getBoundingClientRect();
		this._offsetX = e.clientX - rect.left;
		this._offsetY = e.clientY - rect.top;
		this._dragging = true;
		this._snapped = false;
		document.addEventListener("mousemove", this._onMouseMove);
		document.addEventListener("mouseup", this._onMouseUp);
	}

	_dragElement(e) {
		const rect = this.getBoundingClientRect();
		const newX = Math.max(0, Math.min(e.clientX - this._offsetX, window.innerWidth - rect.width));
		const newY = Math.max(0, Math.min(e.clientY - this._offsetY, window.innerHeight - rect.height));
		this.style.left = `${newX}px`;
		this.style.top = `${newY}px`;
		this.style.right = "unset";
	}

	_stopDragging(e) {
		e.preventDefault();
		this._dragging = false;
		document.removeEventListener("mousemove", this._onMouseMove);
		document.removeEventListener("mouseup", this._onMouseUp);
	}

	_clampToWindow() {
		if (this._snapped) return;
		const rect = this.getBoundingClientRect();
		const currentX = parseFloat(this.style.left) || 0;
		const currentY = parseFloat(this.style.top) || 0;
		this.style.left = `${Math.max(0, Math.min(currentX, window.innerWidth - rect.width))}px`;
		this.style.top = `${Math.max(0, Math.min(currentY, window.innerHeight - rect.height))}px`;
	}

	async _loadAxe() {
		return await import('https://esm.sh/axe-core')
		.then(async (axe) => { 
			this.axe = axe;
			const p = await getPages();
			console.log(p);
			const r = await scanPages(p);
			console.log(r);
			return r;
		})
		.catch((e) => { throw console.error(e) })
	};

	async _updateAvailable() {
		return false
	}

	_selectPage(page) {
		this._selectedPage = page;
	}

	_backToHub() {
		this._selectedPage = null;
		this._clearHighlights();
	}

	_highlightViolationElements(violation) {
		this._clearHighlights();

		if (!violation.nodes || violation.nodes.length === 0) return;

		let firstElement = null;
		const highlightedElements = [];

		violation.nodes.forEach(node => {
			if (node.target && node.target.length > 0) {
				const selector = node.target[0];
				try {
					const elements = document.querySelectorAll(selector);
					elements.forEach(el => {
						el.classList.add('a11y-violation-highlight');
						highlightedElements.push(el);
						if (!firstElement) { firstElement = el; }
					});
				} catch (e) {
					// Invalid selector, skip
				}
			}
		});

		if (firstElement) {
			firstElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}

	_clearHighlights() {
		document.querySelectorAll('.a11y-violation-highlight').forEach(el => {
			el.classList.remove('a11y-violation-highlight');
		});
	}

	_highlightNode(node) {
		this._clearHighlights();

		if (!node.target || node.target.length === 0) return;

		const selector = node.target[0];
		try {
			const elements = document.querySelectorAll(selector);
			if (elements.length > 0) {
				const firstElement = elements[0];
				
				// Check if element is inside a tab pane and switch to that tab
				const tabPane = firstElement.closest('[role="tabpanel"]');
				if (tabPane && tabPane.id) {
					// Find the corresponding tab button using data-bs-target
					const tabButton = document.querySelector(`[data-bs-target="#${tabPane.id}"]`);
					if (tabButton) {
						// Trigger the tab change
						tabButton.click();
						// Give the tab time to animate before scrolling
						setTimeout(() => {
							elements.forEach(el => {
								el.classList.add('a11y-violation-highlight');
							});
							firstElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
						}, 100);
						return;
					}
				}
				
				// If not in a tab, highlight normally
				elements.forEach(el => {
					el.classList.add('a11y-violation-highlight');
				});
				firstElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		} catch (e) {
			// Invalid selector, skip
		}
	}

	getCounts = (page) => {
		let critical = 0;
		let required = 0;
		let check = 0;

		page.violations.forEach(v => {
			if (v.impact === 'critical' || v.impact === 'serious') {
			critical++;
			} else if (v.impact === 'moderate' || v.impact === 'minor') {
			required++;
			} else if (v.impact === 'check') {
			check++;
			}
		});

		return {
			issues: critical + required,
			checks: check
		};
	};
	

	render() {
		return html`

            <!-- ADD TRACKING -->

            <!-- ADD LOGIC FOR SEEING IF THERE'S A NEW VERSION OF TOOL -->

			<link rel="stylesheet" href="https://unpkg.com/rivet-core@latest/css/rivet.min.css" @load=${() => { this._stylesLoaded = true }}/>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/chart.css" />

            ${!this._stylesLoaded ? nothing : html`
			<header class="rvt-header-wrapper rvt-font-sans" @mousedown=${this._startDragging}>
				<div class="rvt-header-global">
					<div class="rvt-container-xl">
						<div class="rvt-header-global__inner">
							<div class="rvt-header-global__logo-slot">
								<div class="rvt-lockup">
									<div class="rvt-lockup__tab">
										<svg xmlns="http://www.w3.org/2000/svg" class="rvt-lockup__trident" viewBox="0 0 28 34">
											<path d="M-3.34344e-05 4.70897H8.83308V7.174H7.1897V21.1426H10.6134V2.72321H8.83308V0.121224H18.214V2.65476H16.2283V21.1426H19.7889V7.174H18.214V4.64047H27.0471V7.174H25.0614V23.6761L21.7746 26.8944H16.2967V30.455H18.214V33.8787H8.76463V30.592H10.6819V26.8259H5.20403L1.91726 23.6077V7.174H-3.34344e-05V4.70897Z" fill="currentColor"></path>
										</svg>
									</div>
									<div class="rvt-lockup__body">
										<span class="rvt-lockup__title">Libraries</span>
										<span class="rvt-lockup__subtitle">LibGuides Accessibility Tool</span>
									</div>
								</div>
							</div>
							<div class="rvt-header-global__controls">
								<!-- Controls for Moving Tool -->
								<button @click=${this._minimise} class="rvt-global-toggle" title=${!this._minimised ? "Collapse Tool" : "Expand Tool"}>
									<span class="rvt-sr-only">${!this._minimised ? "Collapse Tool" : "Expand Tool"}</span>
									${!this._minimised
										? html` <svg aria-hidden="true" fill="currentColor" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
												<path d="M15 9H1V7h14v2Z"></path>
											</svg>`
										: html` <svg aria-hidden="true" fill="currentColor" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
												<path d="M7 7V.5h2V7h6.5v2H9v6.5H7V9H.5V7H7Z"></path>
											</svg>`}
								</button>

								<button @click=${this._snap} class="rvt-global-toggle" data-snap title="Snap Tool to Side">
									<span class="rvt-sr-only">Snap Tool to Side</span>
									<svg aria-hidden="true" fill="currentColor" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
										<path d="M10.586 4H4V2h10v10h-2V5.414l-8.293 8.293-1.414-1.414L10.586 4Z"></path>
									</svg>
								</button>

								<button @click=${this._close} class="rvt-global-toggle" title="Close Tool">
									<span class="rvt-sr-only">Close Tool</span>
									<svg aria-hidden="true" fill="currentColor" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
										<path d="m3.5 2.086 4.5 4.5 4.5-4.5L13.914 3.5 9.414 8l4.5 4.5-1.414 1.414-4.5-4.5-4.5 4.5L2.086 12.5l4.5-4.5-4.5-4.5L3.5 2.086Z"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</header>

			<main>

				<!-- BODY -->
				 ${this._minimised ? nothing : this._selectedPage ? this._renderDetailView() : this._renderHubView() }

			</main>
            `}

		`;
	}

	_renderHubView() {
		return html`
				<h1 class="rvt-sr-only">LibGuides Accessibility Tool</h1>

				${this._isScanning ? 
						// Scanning is occuring
						html`<loading-message message="Loading Accessibility Tool..."></loading-message>` 
						: html`

					<div style="background: #f4f0f4; padding: 10px 0;">
						<h2 class="rvt-text-bold">This Page</h2>
						<table class="rvt-table-plain">
							<thead>
								<tr>
									<th>Page</th>
									<th>Issues</th>
									<th>Checks</th>
								</tr>
							</thead>

							<tbody>
								${until(this._scanResults.map((page) => html`
									${ !page.current ? nothing : html`
										<tr class="rvt-link-hub__item rvt-link-hub__link">
										<td class="">
											<a class="rvt-link-hub__text rvt-ts-xs rvt-text-bold rvt-flex rvt-flex-row rvt-items-center" @click=${() => this._selectPage(page)}>
												<img class="rvt-card__image" src=${page.image?.src || 'https://s3.amazonaws.com/libapps/apps/common/images/gc-md.gif'} alt="" style="aspect-ratio:1; height:30px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
												${page.title}
											</a>
										</td>
										${(() => {
										const counts = this.getCounts(page);
										return html`
											<td>
											<smart-badge value="${counts.issues}"></smart-badge>
											</td>
											<td>
												<smart-badge value="${counts.checks}"></smart-badge>
											</td>
										`;
										})()}
									</tr>`}
									`), nothing)}
							</tbody>
						</table>
					</div>

					<h2 class="rvt-text-bold">All Pages</h2>
					<table class="rvt-table-plain">
					<thead>
						<tr>
							<th>Page</th>
							<th>Issues</th>
							<th>Checks</th>
						</tr>
					</thead>

					<tbody>
					

					${until(this._scanResults.map((page) => html`
						<tr class="rvt-link-hub__item rvt-link-hub__link">
							<td class="">
								<a class="rvt-link-hub__text rvt-ts-xs rvt-text-bold rvt-flex rvt-flex-row" @click=${() => this._selectPage(page)}>
									<img class="rvt-card__image" src=${page.image?.src || 'https://s3.amazonaws.com/libapps/apps/common/images/gc-md.gif'} alt="" style="aspect-ratio:1; height:30px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
									${page.title}
								</a>
							</td>
							${(() => {
							const counts = this.getCounts(page);
							return html`
								<td>
								<smart-badge value="${counts.issues}"></smart-badge>
								</td>
								<td>
									<smart-badge value="${counts.checks}"></smart-badge>
								</td>
							`;
							})()}
						</tr>
				`), html`<loading-message message="Loading Accessibility Tool..."></loading-message>`)}`}

				</tbody>
				</table>

		`;
	}

	_renderDetailView() {
		const page = this._selectedPage;

		const severity = {}

		const getViolationSeverity = (violation) => {
			if (violation.impact === 'critical' || violation.impact === 'serious') {
				return { type: 'critical', label: 'Critical', color: '#c41e3a', bgColor: '#ffe0e0'};
			} else if (violation.impact === 'moderate' || violation.impact === 'minor') {
				return { type: 'required', label: 'Required', color: '#f9a825', bgColor: '#fff8e0' };
			} else if (violation.impact === 'check') {
				return { type: 'check', label: 'Check', color: '#330D2B', bgColor: '#DECADC' };
			}
			return { type: 'unknown', label: 'Unknown', color: '#666', bgColor: '#f5f5f5' };
		};

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
						${choose(severity, [
						['Critical', () => html`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--critical-dark)" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7 1h2V4H7zm2 2a1 1 0 1 0-2 0 1 1 0 0 0 2 0"/></svg>`],
						['Required', () => html`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--required-dark)" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7-3a1 1 0 1 0 2 0 1 1 0 0 0-2 0m2 2H7v5h2z"/></svg>`],
						['Check', () => html`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--check-dark)" aria-hidden="true"><path d="M1 7h10.844L7.737 2.146 9.263.854 15.31 8l-6.047 7.146-1.526-1.292L11.844 9H1z"/></svg>`]
							],
						() => html`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--unknown-dark)" aria-hidden="true"><path d="M4 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/></svg>`)}
						${severity} Fixes (${violations.length})
					</h3>
					${violations.map(({ violation, severity }) => html`
						<div style="border: 1px solid #ddd; border-radius: 4px; padding: 16px; margin-bottom: 12px;">
							<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
							<h4 style="margin: 0; color: #333; flex: 1;"><span class="rvt-badge rvt-badge--danger-secondary">${violation.nodes.length}</span> ${RULE_DEFINITIONS[violation.id]?.title || violation.id}</h4>
							<button @click=${() => this._highlightViolationElements(violation)} class="rvt-button rvt-button--small rvt-button--secondary">
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
												<button @click=${() => this._highlightNode(node)} class="rvt-button rvt-button--plain" style="text-align: left; width: 100%; padding: 8px; border-radius: 4px; border: 1px solid transparent; cursor: pointer;" title="Click to highlight this element on the page">
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
					<button @click=${this._backToHub}  type="button" class="rvt-button rvt-button--plain">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M15 7H4.156l4.107-4.854L6.737.854.69 8l6.047 7.146 1.526-1.292L4.156 9H15z"/></svg>
						<span>Back</span>
					</button>

					<h2 class="rvt-flex rvt-flex-row">
						<img class="rvt-card__image" src=${page.image?.src || 'https://s3.amazonaws.com/libapps/apps/common/images/gc-md.gif'} alt="" style="aspect-ratio:1; height:30px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
						${page.title}
					</h2>

				${page.violations.length > 0 || this._initialViolationCounts.has(page.title) ? html`
					
					
					${(() => {
						const criticalCount = groupedViolations.critical.length;
						const requiredCount = groupedViolations.required.length;
						const checkCount = groupedViolations.check.length;
						const currentTotal = criticalCount + requiredCount + checkCount;
						
						// Get initial counts and calculate resolved violations
								const initialCounts = this._initialViolationCounts.get(page.title) || { critical: 0, required: 0, check: 0 };
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
												<td style="--size: calc(${criticalCount} / ${grandTotal}); --color: var(--critical-light)">
													<span style="color: var(--critical-dark)">${criticalCount}</span>
													<span>Critical</span>
												</td>
											` : nothing}
											${requiredCount > 0 ? html`
												<td style="--size: calc(${requiredCount} / ${grandTotal}); --color: var(--required-light) ">
													<span style="color: var(--required-dark)">${requiredCount}</span>
													<span>Required</span>
												</td>
											` : nothing}
											${checkCount > 0 ? html`
												<td style="--size: calc(${checkCount} / ${grandTotal}); --color: var(--check-light);">
													<span style="color: var(--check-dark)">${checkCount}</span>
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
}

if (!customElements.get("accessibility-tool")) {
	customElements.define("accessibility-tool", BookmarkletFrame);
}
