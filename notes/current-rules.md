# List of Axe Rules for Current Tool

## Current Implementation
The current tool runs all axe-core `wcag2a`, `wcag2aa`, and `best-practice` rules with the exception of:
* `empty-heading` 
* `heading-order`
* `duplicate-id` 
* `scope-attr-valid`
* `image-alt`
* `frame-title`
* `th-has-data-cells`
* `label-content-name-mismatch` 
*  `page-has-heading-one`

# Rules Checked by Tool

# Included

## WCAG 2.0 Level A & AA Rules (`wcag2a`, `wcag2aa`)

| Rule ID | Description | Impact | Auto-Fix | AF Priority |
| --- | --- | --- | --- | --- |
| [area-alt](https://dequeuniversity.com/rules/axe/4.11/area-alt?application=RuleDescription) | Ensure <area> elements of image maps have alternative text | Critical | Free with img-alt | Medium |
| [aria-allowed-attr](https://dequeuniversity.com/rules/axe/4.11/aria-allowed-attr?application=RuleDescription) | Ensure an element's role supports its ARIA attributes | Critical |  |  |
| [aria-braille-equivalent](https://dequeuniversity.com/rules/axe/4.11/aria-braille-equivalent?application=RuleDescription) | Ensure aria-braillelabel and aria-brailleroledescription have a non-braille equivalent | Serious |  |  |
| [aria-command-name](https://dequeuniversity.com/rules/axe/4.11/aria-command-name?application=RuleDescription) | Ensure every ARIA button, link and menuitem has an accessible name | Serious |  |  |
| [aria-conditional-attr](https://dequeuniversity.com/rules/axe/4.11/aria-conditional-attr?application=RuleDescription) | Ensure ARIA attributes are used as described in the specification of the element's role | Serious |  |  |
| [aria-deprecated-role](https://dequeuniversity.com/rules/axe/4.11/aria-deprecated-role?application=RuleDescription) | Ensure elements do not use deprecated roles | Minor |  |  |
| [aria-hidden-body](https://dequeuniversity.com/rules/axe/4.11/aria-hidden-body?application=RuleDescription) | Ensure aria-hidden="true" is not present on the document body. | Critical |  |  |
| [aria-hidden-focus](https://dequeuniversity.com/rules/axe/4.11/aria-hidden-focus?application=RuleDescription) | Ensure aria-hidden elements are not focusable nor contain focusable elements | Serious |  |  |
| [aria-input-field-name](https://dequeuniversity.com/rules/axe/4.11/aria-input-field-name?application=RuleDescription) | Ensure every ARIA input field has an accessible name | Serious |  |  |
| [aria-meter-name](https://dequeuniversity.com/rules/axe/4.11/aria-meter-name?application=RuleDescription) | Ensure every ARIA meter node has an accessible name | Serious |  |  |
| [aria-progressbar-name](https://dequeuniversity.com/rules/axe/4.11/aria-progressbar-name?application=RuleDescription) | Ensure every ARIA progressbar node has an accessible name | Serious |  |  |
| [aria-prohibited-attr](https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=RuleDescription) | Ensure ARIA attributes are not prohibited for an element's role | Serious |  |  |
| [aria-required-attr](https://dequeuniversity.com/rules/axe/4.11/aria-required-attr?application=RuleDescription) | Ensure elements with ARIA roles have all required ARIA attributes | Critical |  |  |
| [aria-required-children](https://dequeuniversity.com/rules/axe/4.11/aria-required-children?application=RuleDescription) | Ensure elements with an ARIA role that require child roles contain them | Critical |  |  |
| [aria-required-parent](https://dequeuniversity.com/rules/axe/4.11/aria-required-parent?application=RuleDescription) | Ensure elements with an ARIA role that require parent roles are contained by them | Critical |  |  |
| [aria-roles](https://dequeuniversity.com/rules/axe/4.11/aria-roles?application=RuleDescription) | Ensure all elements with a role attribute use a valid value | Critical |  |  |
| [aria-tab-name](https://dequeuniversity.com/rules/axe/4.11/aria-tab-name?application=RuleDescription) | Ensure every ARIA tab node has an accessible name | Serious |  |  |
| [aria-toggle-field-name](https://dequeuniversity.com/rules/axe/4.11/aria-toggle-field-name?application=RuleDescription) | Ensure every ARIA toggle field has an accessible name | Serious |  |  |
| [aria-tooltip-name](https://dequeuniversity.com/rules/axe/4.11/aria-tooltip-name?application=RuleDescription) | Ensure every ARIA tooltip node has an accessible name | Serious |  |  |
| [aria-valid-attr-value](https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=RuleDescription) | Ensure all ARIA attributes have valid values | Critical |  |  |
| [aria-valid-attr](https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr?application=RuleDescription) | Ensure attributes that begin with aria- are valid ARIA attributes | Critical |  |  |
| [blink](https://dequeuniversity.com/rules/axe/4.11/blink?application=RuleDescription) | Ensure <blink> elements are not used | Serious |  |  |
| [button-name](https://dequeuniversity.com/rules/axe/4.11/button-name?application=RuleDescription) | Ensure buttons have discernible text | Critical |  |  |
| [bypass](https://dequeuniversity.com/rules/axe/4.11/bypass?application=RuleDescription) | Ensure each page has at least one mechanism for a user to bypass navigation and jump straight to the content | Serious |  |  |
| [color-contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=RuleDescription) | Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds | Serious | Free with style normalisation |  |
| [definition-list](https://dequeuniversity.com/rules/axe/4.11/definition-list?application=RuleDescription) | Ensure <dl> elements are structured correctly | Serious |  |  |
| [dlitem](https://dequeuniversity.com/rules/axe/4.11/dlitem?application=RuleDescription) | Ensure <dt> and <dd> elements are contained by a <dl> | Serious |  |  |
| [document-title](https://dequeuniversity.com/rules/axe/4.11/document-title?application=RuleDescription) | Ensure each HTML document contains a non-empty <title> element | Serious |  |  |
| [duplicate-id-aria](https://dequeuniversity.com/rules/axe/4.11/duplicate-id-aria?application=RuleDescription) | Ensure every id attribute value used in ARIA and in labels is unique | Critical |  |  |
| [form-field-multiple-labels](https://dequeuniversity.com/rules/axe/4.11/form-field-multiple-labels?application=RuleDescription) | Ensure form field does not have multiple label elements | Moderate |  |  |
| [frame-focusable-content](https://dequeuniversity.com/rules/axe/4.11/frame-focusable-content?application=RuleDescription) | Ensure <frame> and <iframe> elements with focusable content do not have tabindex=-1 | Serious |  |  |
| [frame-title-unique](https://dequeuniversity.com/rules/axe/4.11/frame-title-unique?application=RuleDescription) | Ensure <iframe> and <frame> elements contain a unique title attribute | Serious |  |  |
| [html-has-lang](https://dequeuniversity.com/rules/axe/4.11/html-has-lang?application=RuleDescription) | Ensure every HTML document has a lang attribute | Serious |  |  |
| [html-lang-valid](https://dequeuniversity.com/rules/axe/4.11/html-lang-valid?application=RuleDescription) | Ensure the lang attribute of the <html> element has a valid value | Serious |  |  |
| [html-xml-lang-mismatch](https://dequeuniversity.com/rules/axe/4.11/html-xml-lang-mismatch?application=RuleDescription) | Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page | Moderate |  |  |
| [input-button-name](https://dequeuniversity.com/rules/axe/4.11/input-button-name?application=RuleDescription) | Ensure input buttons have discernible text | Critical |  |  |
| [input-image-alt](https://dequeuniversity.com/rules/axe/4.11/input-image-alt?application=RuleDescription) | Ensure <input type="image"> elements have alternative text | Critical | Free with img-alt |  |
| [label](https://dequeuniversity.com/rules/axe/4.11/label?application=RuleDescription) | Ensure every form element has a label | Critical |  |  |
| [link-in-text-block](https://dequeuniversity.com/rules/axe/4.11/link-in-text-block?application=RuleDescription) | Ensure links are distinguished from surrounding text in a way that does not rely on color | Serious | Free with style normalisation |  |
| [link-name](https://dequeuniversity.com/rules/axe/4.11/link-name?application=RuleDescription) | Ensure links have discernible text | Serious |  |  |
| [list](https://dequeuniversity.com/rules/axe/4.11/list?application=RuleDescription) | Ensure that lists are structured correctly | Serious | 15min |  |
| [listitem](https://dequeuniversity.com/rules/axe/4.11/listitem?application=RuleDescription) | Ensure <li> elements are used semantically | Serious |  |  |
| [marquee](https://dequeuniversity.com/rules/axe/4.11/marquee?application=RuleDescription) | Ensure <marquee> elements are not used | Serious | Free with html normalisation |  |
| [meta-refresh](https://dequeuniversity.com/rules/axe/4.11/meta-refresh?application=RuleDescription) | Ensure <meta http-equiv="refresh"> is not used for delayed refresh | Critical |  |  |
| [meta-viewport](https://dequeuniversity.com/rules/axe/4.11/meta-viewport?application=RuleDescription) | Ensure <meta name="viewport"> does not disable text scaling and zooming | Moderate |  |  |
| [nested-interactive](https://dequeuniversity.com/rules/axe/4.11/nested-interactive?application=RuleDescription) | Ensure interactive controls are not nested as they are not always announced by screen readers or can cause focus problems for assistive technologies | Serious |  |  |
| [no-autoplay-audio](https://dequeuniversity.com/rules/axe/4.11/no-autoplay-audio?application=RuleDescription) | Ensure <video> or <audio> elements do not autoplay audio for more than 3 seconds without a control mechanism to stop or mute the audio | Moderate | 5 min | Low |
| [object-alt](https://dequeuniversity.com/rules/axe/4.11/object-alt?application=RuleDescription) | Ensure <object> elements have alternative text | Serious | Free with img-alt | Medium |
| [role-img-alt](https://dequeuniversity.com/rules/axe/4.11/role-img-alt?application=RuleDescription) | Ensure [role="img"] elements have alternative text | Serious | Free with img-alt | Medium |
| [scrollable-region-focusable](https://dequeuniversity.com/rules/axe/4.11/scrollable-region-focusable?application=RuleDescription) | Ensure elements that have scrollable content are accessible by keyboard in Safari | Serious |  |  |
| [select-name](https://dequeuniversity.com/rules/axe/4.11/select-name?application=RuleDescription) | Ensure select element has an accessible name | Critical |  |  |
| [server-side-image-map](https://dequeuniversity.com/rules/axe/4.11/server-side-image-map?application=RuleDescription) | Ensure that server-side image maps are not used | Minor |  |  |
| [summary-name](https://dequeuniversity.com/rules/axe/4.11/summary-name?application=RuleDescription) | Ensure summary elements have discernible text | Serious |  |  |
| [svg-img-alt](https://dequeuniversity.com/rules/axe/4.11/svg-img-alt?application=RuleDescription) | Ensure <svg> elements with an img, graphics-document or graphics-symbol role have accessible text | Serious | Free with img-alt |  |
| [td-headers-attr](https://dequeuniversity.com/rules/axe/4.11/td-headers-attr?application=RuleDescription) | Ensure that each cell in a table that uses the headers attribute refers only to other <th> elements in that table | Serious | 40min | Low |
| [valid-lang](https://dequeuniversity.com/rules/axe/4.11/valid-lang?application=RuleDescription) | Ensure lang attributes have valid values | Serious |  |  |
| [video-caption](https://dequeuniversity.com/rules/axe/4.11/video-caption?application=RuleDescription) | Ensure <video> elements have captions | Critical | 30min
auto-fix for YouTube; guided for non-YouTube | Medium? |

## Best Practices Rules (`best-practice`)

Rules that do not necessarily conform to WCAG success criterion but are industry accepted practices that improve the user experience.

| Rule ID | Description | Impact | Auto-Fix | AF Priority |
| --- | --- | --- | --- | --- |
| [accesskeys](https://dequeuniversity.com/rules/axe/4.11/accesskeys?application=RuleDescription) | Ensure every accesskey attribute value is unique | Serious |  |  |
| [aria-allowed-role](https://dequeuniversity.com/rules/axe/4.11/aria-allowed-role?application=RuleDescription) | Ensure role attribute has an appropriate value for the element | Minor |  |  |
| [aria-dialog-name](https://dequeuniversity.com/rules/axe/4.11/aria-dialog-name?application=RuleDescription) | Ensure every ARIA dialog and alertdialog node has an accessible name | Serious |  |  |
| [aria-text](https://dequeuniversity.com/rules/axe/4.11/aria-text?application=RuleDescription) | Ensure role="text" is used on elements with no focusable descendants | Serious |  |  |
| [aria-treeitem-name](https://dequeuniversity.com/rules/axe/4.11/aria-treeitem-name?application=RuleDescription) | Ensure every ARIA treeitem node has an accessible name | Serious |  |  |
| [empty-table-header](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=RuleDescription) | Ensure table headers have discernible text | Minor |  |  |
| [frame-tested](https://dequeuniversity.com/rules/axe/4.11/frame-tested?application=RuleDescription) | Ensure <iframe> and <frame> elements contain the axe-core script | Critical |  |  |
| [image-redundant-alt](https://dequeuniversity.com/rules/axe/4.11/image-redundant-alt?application=RuleDescription) | Ensure image alternative is not repeated as text | Minor | Free with img-alt |  |
| [label-title-only](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=RuleDescription) | Ensure that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes | Serious |  |  |
| [landmark-banner-is-top-level](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=RuleDescription) | Ensure the banner landmark is at top level | Moderate |  |  |
| [landmark-contentinfo-is-top-level](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=RuleDescription) | Ensure the contentinfo landmark is at top level | Moderate |  |  |
| [landmark-main-is-top-level](https://dequeuniversity.com/rules/axe/4.11/landmark-main-is-top-level?application=RuleDescription) | Ensure the main landmark is at top level | Moderate |  |  |
| [landmark-no-duplicate-banner](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=RuleDescription) | Ensure the document has at most one banner landmark | Moderate |  |  |
| [landmark-no-duplicate-contentinfo](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=RuleDescription) | Ensure the document has at most one contentinfo landmark | Moderate |  |  |
| [landmark-no-duplicate-main](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-main?application=RuleDescription) | Ensure the document has at most one main landmark | Moderate |  |  |
| [landmark-one-main](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=RuleDescription) | Ensure the document has a main landmark | Moderate |  |  |
| [landmark-unique](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=RuleDescription) | Ensure landmarks are unique | Moderate |  |  |
| [meta-viewport-large](https://dequeuniversity.com/rules/axe/4.11/meta-viewport-large?application=RuleDescription) | Ensure <meta name="viewport"> can scale a significant amount | Minor |  |  |
| [presentation-role-conflict](https://dequeuniversity.com/rules/axe/4.11/presentation-role-conflict?application=RuleDescription) | Ensure elements marked as presentational do not have global ARIA or tabindex so that all screen readers ignore them | Minor |  |  |
| [region](https://dequeuniversity.com/rules/axe/4.11/region?application=RuleDescription) | Ensure all page content is contained by landmarks | Moderate |  |  |
| [skip-link](https://dequeuniversity.com/rules/axe/4.11/skip-link?application=RuleDescription) | Ensure all skip links have a focusable target | Moderate |  |  |
| [tabindex](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=RuleDescription) | Ensure tabindex attribute values are not greater than 0 | Serious |  |  |
| [table-duplicate-name](https://dequeuniversity.com/rules/axe/4.11/table-duplicate-name?application=RuleDescription) | Ensure the <caption> element does not contain the same text as the summary attribute | Minor |  |  |

## Custom Rules They Made

| Rule ID | Description | How? | Needs Fixing? | Auto-Fix | AF Priority |
| --- | --- | --- | --- | --- | --- |
| `link-url-only-text` | Links whose visible text is a raw URL. | Selects all `<a>` elements and flags links where `textContent.trim()` starts with `http://` or `https://`. | Conversation.
If keep, detect links without protocol, DOI links, `www.` , etc. | 15min
Not auto-fix, but could open to the correct menu to fix | Low |
| `image-no-alt`  
`img-alt` | Images missing an `alt` attribute. | Uses `img:not([alt])`. | Moderate.
Still flags some decorative images. Perhaps create another rule for `image-decorative` | Free with img-alt |  |
| `image-alt-quality` | Low-quality alt text | Checks `img[alt]`; converts `alt` to lowercase; flags if it starts with phrases like “image of”, looks like a filename, is longer than 250 chars, or is all caps. | Conversation. 
Some instances you need to say “image of” or “screenshot of.” Let’s decide text length. | Free with img-alt | Medium |
| `duplicate-id` | Duplicate `id` attributes in user-controlled content. | Collects all `[id]`, skips LibGuides auto-generated IDs, groups by ID value, and reports IDs with more than one element. Uses `getCssSelector(el, true)` to avoid selectors based on duplicate IDs. | Minor.
Don’t skip autogenerated IDs. Might indicate copy/paste. | 20min | Low |
| `scope-attr-valid` | Invalid table attributes on data cells. | Selects `td[scope], td[headers]` and reports them as invalid. | Critical.
Reimplement table checks for WYSIWYG editor. Flags things that might be correct |  |  |
| `frame-title` | Iframes missing accessible names. | Flags `<iframe>` elements without non-empty `title`, non-empty `aria-label`, or any `aria-labelledby`. | Minor.
Should reduce to `title` and `aria-labelledby` (only if id for element exists). Check if WYSIWYG puts title on embeds or no, might need to flag if bad title used. |  |  |
| `empty-container` | Flags empty sections/containers/LibGuides boxes. | Looks for `[id^="s-lg-box"], section, article, aside, div[role="regiion"]`; flags elements with no text, media, or interactive descendants. | Minor.
Lol typo. Double check if other classes are possible on WYSIWYG boxes | 10min | High |
| `th-has-data-cells` | Tables with data cells but no header cells. | Flags every `<table>` that has at least one `<td>` and zero `<th>`. | Minor. 
Double check WYSIWYG output. | 20min
auto-add `<th>` so the person can fill them in | High |
| `table-semantic-markup` | Tables missing semantic structure. | Flags tables with no `<thead>`, no `<tbody>`, and no `<caption>`. | Moderate
Remove `<caption>` selection (not all tables need a caption). Double check if WYSIWYG outputs `<thead>` .  | 10min
auto-add `<thead>`  | Medium |
| `link-new-window` | Links opening in a new tab/window without warning. | Selects `a[target="_blank"]`; checks visible text, image alt text, `aria-label`, `title`, and external-link icon classes for warning phrases. | Remove. 
Replace with rule that checks for “link opens in a new tab” and flags it as bad. | 15 min | High |
| `iframe-unique-name` | Duplicate iframe `name` attributes. | Groups `iframe[name]` by name and flags duplicates. | Fine. |  |  |
| `label-content-name-mismatch` | Visible label does not match accessible name for buttons/links/submit inputs. | Checks `button, a, input[type="submit"], input[type="button"]`; compares `textContent` with `aria-label`. Flags if neither contains the other. | Remove.
Other rules cover ensuring there’s an accessible name. Should probably just create a new rule for any WYSIWYG default accessible names that need replacing. | N/A |  |
| `link-not-distinguished` | Links that are not visually distinguishable from surrounding text. | Checks links where computed style has no underline and the link color equals the parent text color. | Remove.
Controlled by global CSS. | N/A |  |
| `layout-table` | Tables likely used for visual layout rather than data. | Flags tables without `<th>` where either row count is ≤ 2 or more than half of cells contain images/divs. Ignores tables with `role="presentation"`. | Conversation. Flawed logic. 
Should probably either just flag inaccessible tables (`th-has-data-cells`) or flag all tables. |  |  |
| `heading-order` | Heading levels that skip more than one level. | Iterates all headings in DOM order. If current level minus previous level is greater than 1, flags the current heading. | Minor.
Rework logic around some edge cases. | Free with cleanup tool | High |
| `icon-no-text` | Icon-only links/buttons without labels. | Finds Font Awesome/Glyphicon/icon spans, checks if parent is `<a>` or `<button>`, then looks for sibling text, `aria-label`, `aria-labelledby`, or `title`. | Remove.
Replace with a rule that flags all FA/icons/ `<i>` tags as a problem. | 15min | Medium |
| `empty-heading-image-only` | Headings containing only an image/icon/media and no text. | In `checkEmptyHeadings()`, checks all headings whose `textContent.trim()` is empty and that contain `img`, `i`, `svg`, or class containing `icon`. | Good
 |  |  |
| `empty-heading-whitespace` | Completely empty headings. | In `checkEmptyHeadings()`, flags headings with no text and no detected media, unless classified as a LibGuides box heading. | Remove.
Handled by axe’s `empty-heading` | Free with cleanup tool |  |
| `empty-heading-libguides-box` | Empty LibGuides box titles/headings. | Empty headings are classified as LibGuides-related if inside `[id^="s-lg-box"]`, have class `s-lib-box-title`, or their ID starts with `s-lg-box`. | Minor.
Double check id selection. Might vary. |  |  |
| `page-has-heading-one` | Defined in explanation/filter list but not custom-implemented. | axe’s `page-has-heading-one` is filtered out, but no replacement custom check is added. | Remove.
Handled by axe’s `page-has-heading-one` |  |  |
| `image-alt` | axe’s image-alt is filtered out and replaced mostly by `image-no-alt` and `image-alt-quality`. | Custom check only catches missing `alt` | Remove.
Handled by axe’s `image-alt` | Free with img-alt |  |

# Excluded

## Rules they disabled

| Rule ID | Description | Impact | Action | Auto-Fix | AF Priority |
| --- | --- | --- | --- | --- | --- |
| [empty-heading](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=RuleDescription) | Ensure headings have discernible text | Minor | Re-enable | Free with cleanup tool |  |
| [heading-order](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=RuleDescription) | Ensure the order of headings is semantically correct | Moderate | Re-enable | 20min
Free with cleanup tool… validate it works well 💀 | High |
| [duplicate-id](https://dequeuniversity.com/rules/axe/4.11/duplicate-id?application=RuleDescription) | already deprecated?! lol | n/a | n/a |  |  |
| [scope-attr-valid](https://dequeuniversity.com/rules/axe/4.11/scope-attr-valid?application=RuleDescription) | Ensure the scope attribute is used correctly on tables | Moderate | None |  |  |
| [image-alt](https://dequeuniversity.com/rules/axe/4.11/image-alt?application=RuleDescription) | Ensure <img> elements have alternative text or a role of none or presentation | Critical | Re-enable | 20min
Not quite auto but guided.  (also fixes other forms of alt missing) | High |
| [frame-title](https://dequeuniversity.com/rules/axe/4.11/frame-title?application=RuleDescription) | Ensure <iframe> and <frame> elements have an accessible name | Serious | Re-enable | 15min
Not quite auto but guided
 | Medium |
| [th-has-data-cells](https://dequeuniversity.com/rules/axe/4.11/th-has-data-cells?application=RuleDescription) | Ensure that <th> elements and elements with role=columnheader/rowheader have data cells they describe | Serious | Re-enable | 20min
 | Medium |
| [label-content-name-mismatch](https://dequeuniversity.com/rules/axe/4.11/label-content-name-mismatch?application=RuleDescription) | Ensure that elements labelled through their content must have their visible text as part of their accessible name | Serious | None |  |  |
| [page-has-heading-one](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=RuleDescription) | Ensure that the page, or at least one of its frames contains a level-one heading | Moderate | Adapt | 20min
Adapt for h3 being top heading ;) | High |

## WCAG 2.1 Level A & AA Rules (`wcag21a` , `wcag21aa` )

| Rule ID | Description | Impact | Action |
| --- | --- | --- | --- |
| [autocomplete-valid](https://dequeuniversity.com/rules/axe/4.11/autocomplete-valid?application=RuleDescription) | Ensure the autocomplete attribute is correct and suitable for the form field | Serious | None |
| [avoid-inline-spacing](https://dequeuniversity.com/rules/axe/4.11/avoid-inline-spacing?application=RuleDescription) | Ensure that text spacing set through style attributes can be adjusted with custom stylesheets | Serious | None |

## WCAG 2.2 Level A & AA Rules (`wcag22aa` )

These rules are disabled by default, until WCAG 2.2 is more widely adopted and required.

| Rule ID | Description | Impact | Action |
| --- | --- | --- | --- |
| [target-size](https://dequeuniversity.com/rules/axe/4.11/target-size?application=RuleDescription) | Ensure touch targets have sufficient size and space | Serious | None |

## WCAG 2.x level AAA rules (`wcag2aaa`)

Rules that check for conformance to WCAG AAA success criteria that can be fully automated. These are disabled by default in axe-core.

| Rule ID | Description | Impact | Action | Auto-Fix |
| --- | --- | --- | --- | --- |
| [color-contrast-enhanced](https://dequeuniversity.com/rules/axe/4.11/color-contrast-enhanced?application=RuleDescription) | Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds | Serious | Re-enable | Free with cleanup |
| [identical-links-same-purpose](https://dequeuniversity.com/rules/axe/4.11/identical-links-same-purpose?application=RuleDescription) | Ensure that links with the same accessible name serve a similar purpose | Minor | None |  |
| [meta-refresh-no-exceptions](https://dequeuniversity.com/rules/axe/4.11/meta-refresh-no-exceptions?application=RuleDescription) | Ensure <meta http-equiv="refresh"> is not used for delayed refresh | Minor | None |  |

## Experimental Rules (`experimental`)

Rules we are still testing and developing. They are disabled by default in axe-core, but are enabled for the axe browser extensions.

| Rule ID | Description | Impact | Action | Auto-Fix | AF Priority |
| --- | --- | --- | --- | --- | --- |
| [css-orientation-lock](https://dequeuniversity.com/rules/axe/4.11/css-orientation-lock?application=RuleDescription) | Ensure content is not locked to any specific display orientation, and the content is operable in all display orientations | Serious |  |  |  |
| [focus-order-semantics](https://dequeuniversity.com/rules/axe/4.11/focus-order-semantics?application=RuleDescription) | Ensure elements in the focus order have a role appropriate for interactive content | Minor |  |  |  |
| [hidden-content](https://dequeuniversity.com/rules/axe/4.11/hidden-content?application=RuleDescription) | Inform users about hidden content. | Minor | Re-enable | 10min
Allows unhiding | High |
| [label-content-name-mismatch](https://dequeuniversity.com/rules/axe/4.11/label-content-name-mismatch?application=RuleDescription) | Ensure that elements labelled through their content must have their visible text as part of their accessible name | Serious | Re-enable |  |  |
| [p-as-heading](https://dequeuniversity.com/rules/axe/4.11/p-as-heading?application=RuleDescription) | Ensure bold, italic text and font-size is not used to style <p> elements as a heading | Serious | Re-enable | 30min
Easy implement but will be mostly quality testing 💀 | High |
| [table-fake-caption](https://dequeuniversity.com/rules/axe/4.11/table-fake-caption?application=RuleDescription) | Ensure that tables with a caption use the <caption> element. | Serious | Re-enable | 20min
Allows unhiding | Medium |
| [td-has-header](https://dequeuniversity.com/rules/axe/4.11/td-has-header?application=RuleDescription) | Ensure that each non-empty data cell in a <table> larger than 3 by 3 has one or more table headers | Critical | Re-enable | Free with th-has-data-cells | High |

# Rules we may consider adding

- Flagging any and all `<input>` or `<form>` fields in a WYSIWYG box as something worth checking. People probs shouldn’t be building their own forms.
- Detect tables that attempt to have two dimensions but only one row of `<th>`s
- Style normalisation (port from existing cleanup tool)
- HTML normalisation (port from existing cleanup tool)