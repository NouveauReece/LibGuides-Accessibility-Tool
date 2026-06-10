export function getAccessibleName(target) {
    const el = document.querySelector(target);
    console.log(el);
    if (!el) { return "[Can't Find Element]" }

    if (el.ariaDescribedByElements) {
        return el.ariaDescribedByElements.map((e) => e.textContent.trim()).join(" ").trim();
    } else if (el.ariaDescription) {
        return el.ariaDescription;
    } else if (el.ariaLabel) {
        return el.ariaLabel;
    } else if (el.tagName == "IMG") {
        const hasAlt = el.hasAttribute('alt');
        if (hasAlt) {
            const alt = el.getAttribute('alt');
            if (alt == "") {
                return `[decorative, sighted users only] ${el.getAttribute('src') || el.getAttribute('srcset')}`;
            } else {
                return alt;
            }
        } else {
            return null
        }
    } else if (el.tagName == "DETAILS" && el.querySelector('> summary')) {
        return el.querySelector('> summary').innerText() || null;
    } else if (el.tagName == "INPUT") {
        return document.querySelector(`label[for='${el.getAttribute('id')}']`).innerText() || null;
    } else if (el.tagName == "SVG") {
        return null
    } else if (el.getAttribute('title')) {
        return el.getAttribute('title');
    } else {
        try {
            return el.innerText;
        } catch {
            return null
        }
    }


}