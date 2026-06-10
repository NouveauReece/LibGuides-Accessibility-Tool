import { LitElement, html, css, nothing } from "lit";
import CONFIG from '../config.json' assert { type: 'json' };
import { getPages } from '../logic/utils.js';
import { scanPages } from '../logic/scan.js'
import { getUserIdentifier } from '../logic/userIdentification.js';
import { initializeAnalytics, trackBookmarkletOpened } from '../logic/analytics.js';
import { getViolationSeverity } from '../logic/violationSeverity.js';
import { renderHubView } from './HubView.js';
import { renderDetailView } from './DetailView.js';
import { renderUpdateView } from './UpdateView.js';
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
		_notOnLibGuidesPage: { type: Boolean, state: true },
		_userIdentifier: { type: Object, state: true },
	};

	constructor() {
		super();
		// UI state
		this._snapped = true;
		this._minimised = false;
		// Drag state
		this._dragging = false;
		this._offsetX = 0;
		this._offsetY = 0;
		// Event handlers (use arrow functions for lexical this binding)
		this._onMouseMove = (e) => this._dragElement(e);
		this._onMouseUp = (e) => this._stopDragging(e);
		this._onResize = () => this._clampToWindow();
		// Scan state
		this._numberOfPages = 0;
		this._scanResults = null;
		this._isScanning = false;
		this._selectedPage = null;
		this._initialViolationCounts = new Map();
		// Page validation state
		this._notOnLibGuidesPage = false;
		this._userIdentifier = null;
	}

	static styles = css`
		@keyframes slideIn {
			from { transform: translateX(100%); }
			to { transform: translateX(0); }
		}
		@keyframes slideOut {
			from { transform: translateX(0); }
			to { transform: translateX(100%); }
		}

		:host {
			background-color: white;
			max-height: 100svh;
			width: 400px;
			position: fixed;
			top: 0;
			right: 0;
			box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
			animation: slideIn 0.3s ease-out;
			transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		}

		@media (max-width: 768px) {
			:host { width: 100%; }
		}

		header {
			cursor: move;
			z-index: 2000000001;
		}

		main {
			overflow-y: auto;
			overflow-x: none;
			max-height: calc(100svh - 150px);

			h2 {
				margin-top: 30px;
				padding-left: 14px;
				font-size: 24px;
			}
		}

		p {
			margin: 0;
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

		.rvt-footer-base__link {
			text-decoration: underline;
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
		
		.grid-btn {
			display: grid;
			grid-template-columns: 1fr auto;
			grid-template-rows: repeat(2, 1fr);
			grid-template-areas: "icon pretty" "icon node";
			height: min-content;
			padding: 5px;
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

		// init
		this._initTool();
		this._performScan();
	}

	async _initTool() {
		try {
			console.clear();
			this._userIdentifier = await getUserIdentifier();
			this._notOnLibGuidesPage = !this._isOnLibGuidesPage();
			const gaId = 'G-XXXXXXXXXX';
			initializeAnalytics(gaId, this._userIdentifier);
			trackBookmarkletOpened();
			const welcomeLogStyle = 'border-left: 5px solid #900; color: white; padding: 5px 10px;';
			console.log(`%c${CONFIG.title}\nVersion: ${CONFIG.version}\nGA: ${gaId}\nUser: ${this._userIdentifier.value}\nNeed Help? Contact ${CONFIG.maintainer}\nWith 💜 and 🦆, DUX`, welcomeLogStyle)
		} catch (error) {
			console.error('[LAT] Initialization error:', error);
		}
	}

	async _performScan() {
		if (this._isScanning || this._scanResults || this._notOnLibGuidesPage) return;
		this._isScanning = true;
		this._axeLoaded = false;
		try {
			this._scanResults = await this._loadAxe();
			// Store initial violation counts for each page
			this._scanResults.forEach(page => {
				const counts = page.violations.reduce((acc, v) => {
					const severity = getViolationSeverity(v);
					acc[severity.type] = (acc[severity.type] || 0) + 1;
					return acc;
				}, { critical: 0, required: 0, check: 0, unknown: 0 });
				this._initialViolationCounts.set(page.title, counts);
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
		this.remove();
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

	_isOnLibGuidesPage() {
		const currentUrl = window.location.href;
		const userGuideUrl = new URL(CONFIG['libguides-url-user']).hostname;
		const adminGuideUrl = new URL(CONFIG['libguides-url-admin']).hostname;
		const currentHostname = new URL(currentUrl, window.location.origin).hostname;
		return currentHostname === userGuideUrl || currentHostname === adminGuideUrl || currentHostname === "localhost";
	}

	async _loadAxe() {
		return await import('https://esm.sh/axe-core')
		.then(async (axe) => { 
			this.axe = axe;
			const p = await getPages();
			const r = await scanPages(p);
			return r;
		})
		.catch((e) => { throw console.error(e) })
	};

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

		console.log(node);

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
										<span class="rvt-lockup__subtitle">${CONFIG.title}</span>
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

			<main aria-live="polite" aria-atomic="true">

				${this._notOnLibGuidesPage ? this._renderUpdateView() : 
					this._minimised ? nothing : 
					this._selectedPage ? this._renderDetailView() : 
					this._renderHubView()
				}

			</main>

			<footer class="rvt-footer-base rvt-footer-base--light rvt-flex rvt-items-start rvt-justify-center"	>
				<div class="rvt-flex rvt-items-start">
					<div class="rvt-p-lr-md rvt-footer-base__inner" style="gap: 10px;">
						<div class="rvt-footer-base__logo">
							<img src="https://raw.githubusercontent.com/NouveauReece/LibGuides-Accessibility-Tool/refs/heads/main/code/public/favicon.svg">
						</div>
						
						<div>
							<p>${CONFIG.title} • v${CONFIG.version}</p>
							<ul class="rvt-footer-base__list" style="margin-left: 0;">
								<li class="rvt-footer-base__item">
									<a class="rvt-footer-base__link" href="${CONFIG.website}" target="_blank">About</a>
								</li>
								<li class="rvt-footer-base__item">
									<a class="rvt-footer-base__link" href="${CONFIG.docs}" target="_blank">How to Use</a>
								</li>
								<li class="rvt-footer-base__item">
									<a class="rvt-footer-base__link" href="${CONFIG.feedback}" target="_blank">Feedback</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
            `}

		`;
	}

	_renderUpdateView() {
		return renderUpdateView();
	}

	_renderHubView() {
		return renderHubView({
			isScanning: this._isScanning,
			scanResults: this._scanResults,
			getCounts: (page) => this.getCounts(page),
			selectPage: (page) => this._selectPage(page)
		});
	}

	_renderDetailView() {
		return renderDetailView({
			page: this._selectedPage,
			highlightViolationElements: (violation) => this._highlightViolationElements(violation),
			backToHub: () => this._backToHub(),
			highlightNode: (node) => this._highlightNode(node),
			initialViolationCounts: this._initialViolationCounts
		});
	}
}

if (!customElements.get("accessibility-tool")) {
	customElements.define("accessibility-tool", BookmarkletFrame);
}
