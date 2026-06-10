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
									<a class="rvt-link-hub__text rvt-ts-xs rvt-text-bold rvt-flex rvt-flex-row rvt-items-center" style="cursor:pointer;" @click=${() => selectPage(page)}>
										<img class="rvt-card__image" src=${page.image?.src || 'https://s3.amazonaws.com/libapps/apps/common/images/gc-md.gif'} alt="" style="aspect-ratio:1; height:30px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
										${page.title}
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
						<a class="rvt-link-hub__text rvt-ts-xs rvt-text-bold rvt-flex rvt-flex-row rvt-items-center" href="${page.url}" title="Visit ${page.title}">
							<img class="rvt-card__image" src=${page.image?.src || 'https://s3.amazonaws.com/libapps/apps/common/images/gc-md.gif'} alt="" style="aspect-ratio:1; height:30px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
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
