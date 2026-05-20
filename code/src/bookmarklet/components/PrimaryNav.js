import { LitElement, html } from 'lit'

class PrimaryNav extends LitElement {
    
    createRenderRoot() { return this }

    render() {
        return html`
            <div class="my-component">
                <p>Hello from light DOM!</p>
            </div>
        `
    }
}

if (!customElements.get('primary-nav')) {
	customElements.define('primary-nav', PrimaryNav);
}