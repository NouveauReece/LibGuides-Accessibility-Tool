import { html, nothing } from "lit";
import { until } from 'lit-html/directives/until.js';

export function renderHubView({
	isScanning,
	scanResults,
	getCounts,
	selectPage
}) {
	return html`
		<h1 class="rvt-sr-only">LibGuides Accessibility Tool</h1>

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
									<a class="rvt-link-hub__text rvt-ts-xs rvt-text-bold rvt-flex rvt-flex-row rvt-items-center" @click=${() => selectPage(page)}>
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
				<tr class="rvt-link-hub__item rvt-link-hub__link">
					<td class="">
						<a class="rvt-link-hub__text rvt-ts-xs rvt-text-bold rvt-flex rvt-flex-row" @click=${() => selectPage(page)}>
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
				</tr>
		`), html`<loading-message message="Loading Accessibility Tool..."></loading-message>`)}`}

			</tbody>
			</table>

	`;
}
