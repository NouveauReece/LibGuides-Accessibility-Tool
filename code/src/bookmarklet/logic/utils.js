/**
 * Returns an array of page objects with properties:
 *      title - page title
 *      container - the guide's main container/element
 *      current - whether it's the current page
 *      image - url of the first image featured on the page
 *      url - page url
 */
export async function getPages() {
    let pages = [...document.querySelectorAll('[aria-label="Guide Pages"] li a:not([id^="s-lg-admin"])')]
    .map((link) => ({
        title: link.innerText.trim(),
        url: link.href,
        current: link.classList.contains('active') || link.parentElement.classList.contains('active')
    }))
    .filter(page => {
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            return true;
        }
        try { return new URL(page.url).hostname === location.hostname
        } catch { return false }
    })

    pages = await Promise.all(pages.map(async (page) => {
        if (page) {
            console.log(page.title,page.active);
        }
        const source = (async () => {
            if (location.hostname != "guides.libraries.indiana.edu") {
                return document.documentElement.outerHTML;
            } else {
                const response = await fetch(page.url);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const text = await response.text();
                return text;
            }
        })

        const htmlString = await source();
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');

        let container;
        if (location.pathname.endsWith('admin_c.php')) {
            container = doc.querySelector('#s-lg-guide-main') || doc.querySelector('#s-lg-content') || doc.body;
            container.querySelectorAll('.s-lg-content-edit, .btn-group, .s-lg-guide-mini-cmd-bar, .s-lg-box-edit, .s-lib-box-edit, [id*="admin-edit"], .dropdown-toggle, div:has(> [id^="s-lg-admin-edit-content-link"])').forEach(el => el.remove());
        } else {
            container = doc.querySelector('#s-lg-guide-main') || doc.querySelector('#s-lg-content') || doc.body;
        }

        // Find first image not from /libapps/apps/common
        const allImages = container.querySelectorAll('img');
        let image = null;
        for (const img of allImages) {
            const src = img.src || '';
            if (!src.includes('/libapps/apps/common') && !src.includes('/icons')) {
                image = {
                    src: src,
                    alt: img.alt || '',
                    title: img.title || ''
                };
                break;
            }
        }

        return { ...page, container, image }
    }))
    return pages;
}

const selectors = {
    "box" : `[class^='s-lg-box-wrapper-']`,
    "regular-box" : `[class^='s-lg-box-wrapper-']:not(:has(.s-lib-jqtabs)):not(:has(.s-lib-profile-container))`,
    "tab-box" : `[class^='s-lg-box-wrapper-']:has(.s-lib-jqtabs)`,
    "profile-box" : `[class^='s-lg-box-wrapper-']:has(.s-lib-profile-container)`,
    "gallery-box" : `[class^='s-lg-box-wrapper-']:has([class^="slick"])`,
    "link-list" : `div:has(>.s-lg-link-list)`,
    "database" : `div:has(>.s-lg-link-list .s-lg-database)`,
    "media" : `.s-lg-widget`,
    "catalog" : `div:has(>.s-lg-link-list .s-lg-book)`,
    "document" : `div:has(>.s-lg-link-list .s-lg-file-desc)`,
    "rss" : `.s-lg-rss`,
    "guide-list" : `div:has(>.s-lg-system-list s-lg-guide-list)`,
    "poll" : `.s-lg-poll-outer, .s-lg-poll`,
    "google-search" : `div:has(>[id^="google_"])`,
    "add-box-btn" : `.s-lg-admin-addbox`,
    "edit-btns" : `[id^="s-lg-admin-edit"]`
}