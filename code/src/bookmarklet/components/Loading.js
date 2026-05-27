import { LitElement, html } from "lit";

class Loading extends LitElement {
	static properties = {
		message: { type: String },
	};

	createRenderRoot() {
		return this;
	}

	constructor() {
		super();
		this.message = "Loading...";
	}

	render() {
		return html`
			<div class="rvt-font-sans rvt-flex rvt-flex-column rvt-justify-center rvt-items-center rvt-p-tb-xxl">
				<div class="rvt-loader rvt-loader--md" aria-busy="true" aria-labelledby="loading-message"></div>
				<p id="loading-message" class="rvt-font-sans rvt-m-top-sm">${this.message}</p>
			</div>
		`;
	}
}

if (!customElements.get("loading-message")) {
	customElements.define("loading-message", Loading);
}
