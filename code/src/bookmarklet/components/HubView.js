import { html, nothing } from "lit";
import CONFIG from '../config.json' with { type: 'json' };
import { until } from 'lit-html/directives/until.js';

export function renderHubView({
	isScanning,
	scanResults,
	getCounts,
	selectPage
}) {
	return html`
		<h1 class="rvt-sr-only">${CONFIG.title}</h1>

		${isScanning ? 
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
						${until(scanResults.map((page) => html`
							${ !page.current ? nothing : html`
								<tr class="rvt-link-hub__item rvt-link-hub__link">
								<td class="">
									<a class="rvt-link-hub__text rvt-ts-xs rvt-text-bold rvt-flex rvt-flex-row rvt-items-center" style="cursor:pointer;" @click=${() => selectPage(page)} title="Show Accessibility Violations for ${page.isHidden ? '[Hidden Page]' : nothing} ${page.title}">
										${ page.isHidden ? 
											html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" title="Hidden Page" style="fill: rgb(79,92,132); aspect-ratio:1; height:30px; width: 30px; object-fit: cover; margin-right: 10px; border-radius: 4px;"><path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/></svg>` : 
											html`<img class="rvt-card__image" src=${page.image?.src || 'https://s3.amazonaws.com/libapps/apps/common/images/gc-md.gif'} alt="" style="aspect-ratio:1; height:30px; object-fit: cover; margin-right: 10px; border-radius: 4px;">`
										}
										<span style="margin-right: 5px; word-break: break-all; text-overflow: ellipsis; overflow: hidden;">${page.title}</span>
									</a>
								</td>
								${(() => {
								const counts = getCounts(page);
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

			<h2 class="rvt-text-bold">All Pages in this Guide</h2>
			<table class="rvt-table-plain">
			<thead>
				<tr>
					<th>Page</th>
					<th>Issues</th>
					<th>Checks</th>
				</tr>
			</thead>

			<tbody>
			

			${until(scanResults.map((page) => html`
				<tr class="rvt-link-hub__item">
					<td style="padding-right: 0px;">
						<a class="rvt-link-hub__text rvt-ts-xs rvt-text-bold rvt-flex rvt-flex-row rvt-items-center" href="${page.url}" title="Visit ${page.isHidden ? '[Hidden Page]' : nothing} ${page.title}">
							${ page.isHidden ? 
								html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" title="Hidden Page" style="fill: rgb(79,92,132); aspect-ratio:1; height:30px; object-fit: cover; margin-right: 10px; border-radius: 4px;"><path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/></svg>` : 
								html`<img class="rvt-card__image" src=${page.image?.src || 'https://s3.amazonaws.com/libapps/apps/common/images/gc-md.gif'} alt="" style="aspect-ratio:1; height:30px; object-fit: cover; margin-right: 10px; border-radius: 4px;">`
							}
							<span style="margin-right: 5px; word-break: break-all; text-overflow: ellipsis; overflow: hidden;">${page.title}</span>
							<svg style="overflow: visible" aria-hidden="true" fill="currentColor" focusable="false" height="12" viewBox="0 0 16 16" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M15 1H9v2h2.586l-3 3L10 7.414l3-3V7h2V1Z"></path><path d="M7 3H1v12h12V9h-2v4H3V5h4V3Z"></path></svg>
						</a>
					</td>
					${(() => {
					const counts = getCounts(page);
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
