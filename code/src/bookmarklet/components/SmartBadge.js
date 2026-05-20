import { LitElement, html, css } from "lit";

/**
 * A Lit component that renders an rvt-badge with a green Rivet color style
 * when the value/count is 0.
 */
export class SmartBadge extends LitElement {
	
	static properties = {
		value: { type: Number }
	};

    createRenderRoot() { return this; }

	constructor() {
		super();
	}

	render() {
		// Determine the Rivet color style based on the value
		// Green (success) when value is 0
		const badgeClass = this.value === 0 ? `rvt-badge--success-secondary` : `rvt-badge--danger-secondary`;
		
		return html`
			<span class="rvt-badge ${badgeClass}">${this.value}</span>
		`;
	}
	
}

if (!customElements.get("smart-badge")) {
	customElements.define("smart-badge", SmartBadge);
}
