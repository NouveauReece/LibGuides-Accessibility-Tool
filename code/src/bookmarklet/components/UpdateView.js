import { html } from 'lit';

export function renderUpdateView(info) {
	return html`	
		<div class="rvt-flex rvt-flex-column rvt-p-all-xxl rvt-items-stretch" style="gap:100px">

			<div class="rvt-flex rvt-flex-column rvt-items-center rvt-text-center" style="gap:25px;">
				<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
					<path d="M0 5H35V0H0V5ZM15 17.935V35H20V17.935L26.52 23.525L29.775 19.73L17.5 9.205L5.225 19.73L8.48 23.525L15 17.935Z" fill="#006298"/>
				</svg>

				<h1 class="rvt-text-bold">Update Available</h1>
				<p>To continue scanning, let's install the latest and greatest.</p>

				<a class="rvt-button" href="${info['update-url']}" target="_blank">Install Update</a>
				
			</div>

			<div class="rvt-flex rvt-flex-column rvt-items-stretch rvt-color-black-400">
				<h1 class="rvt-text-bold">What's New?</h1>
				<p>${info['whats-new'] || "It's a suprise!! 😈"}</p>
				<p><br>Sincerely,<br>Library DUX Team
					<img src="https://raw.githubusercontent.com/NouveauReece/LibGuides-Accessibility-Tool/refs/heads/main/code/public/duck.svg" width="12" alt="">
				</p>
			</div>
		</div>
	`;
}