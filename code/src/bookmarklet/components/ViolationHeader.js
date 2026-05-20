import { LitElement, html } from "lit";

class ViolationHeader extends LitElement {
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
            <h2>Violations (3)</h2>
        `;
    }
}

if (!customElements.get("violation-header")) {
	customElements.define("violation-header", ViolationHeader);
}
