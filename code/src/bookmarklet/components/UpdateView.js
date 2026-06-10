import { html } from "lit";
import CONFIG from "../config.json" assert { type: "json" };

export function renderUpdateView() {
	return html`
		<div class="rvt-flex rvt-flex-column rvt-p-all-xxl rvt-items-stretch" style="gap:100px">
			<div class="rvt-flex rvt-flex-column rvt-items-center rvt-text-center" style="gap:25px;">
				<!-- <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
					<path d="M8 14H4V10H8V14ZM26 0H10C8.9 0 8 .9 8 2V20C8 21.1 8.9 22 10 22H26C27.1 22 28 21.1 28 20V2C28 .9 27.1 0 26 0ZM26 20H10V2H26V20ZM32 4H30V16H32V4ZM32 20H30V22H32V20Z" fill="#C41E3A"/>
				</svg> -->

				<h1 class="rvt-text-bold">Open a LibGuides Page to Continue</h1>
				<p>It looks like you're on a non-LibGuides page... please visit LibGuides to use the ${CONFIG.title}.</p>

				<a class="rvt-button" href="${CONFIG["libguides-url-user"]}" target="_blank">Go to LibGuides</a>
			</div>

			<div class="rvt-flex rvt-flex-column rvt-items-stretch rvt-color-black-400">
			<h1 class="rvt-text-bold">Need Help?</h1>
			<p>Visit our <a href="${CONFIG["docs"]}" target="_blank">documentation</a> or feel free to <a href="${CONFIG["feedback"]}" target="_blank">send feedback</a>.
			<br><br>Sincerely,<br> DUX <img style="display: inline-block" src="https://raw.githubusercontent.com/NouveauReece/LibGuides-Accessibility-Tool/refs/heads/main/code/public/duck.svg" width="12" alt="" /></p>
			
			</div>
		</div>
	`;
}
