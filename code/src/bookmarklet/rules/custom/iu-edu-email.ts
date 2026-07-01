import type { Rule, AutoFixFunction, CustomCheckFunction } from '../types';
import type { NodeResult } from 'axe-core';
import { buildNodeResult, buildAxeResult } from '../index';

const retiredCampusDomains = ["indiana.edu", "iupui.edu", "iuk.edu", "iupuc.edu", "ius.edu", "iun.edu", "iusb.edu", "iue.edu", "iufw.edu"];
const hrefSelector = retiredCampusDomains.map(domain => `[href*="${domain}"][href^="mailto:"]`).join(", ");


const iuEduEmailCheck: CustomCheckFunction = async (root) => {

    const failingNodes: NodeResult[] = [];

    root.querySelectorAll(hrefSelector).forEach((el) => {
        failingNodes.push(
            buildNodeResult( iuEduEmail, el, `Email link uses a retired campus domain instead of @iu.edu: ${el.getAttribute('href')}`)
        );
    });

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let node: Node | null;
    while ((node = walker.nextNode())) {
        const text = node.textContent ?? '';
        if (retiredCampusDomains.some(domain => text.includes(domain))) {
            const parentEl = node.parentElement;
            if (parentEl) {
                failingNodes.push(
                    buildNodeResult(iuEduEmail, parentEl, `Text contains a retired campus domain: "${text.trim()}"`)
                );
            }
        }
    }

    const r = buildAxeResult(iuEduEmail, failingNodes);
    // console.log(r);
    return r;
};

const iuEduEmailFix: AutoFixFunction = (elDef) => {
    const element = document.querySelector(elDef.target[0])!;
    if (element.hasAttribute('href')) {
        const href = element.getAttribute('href');
        if (retiredCampusDomains.some(domain => href.includes(domain))) {
            const updatedHref = retiredCampusDomains.reduce(
                (value, domain) => value.replaceAll(domain, 'iu.edu'),
                href
            );
            element.setAttribute('href', updatedHref);
        }
    }

    const textNodeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    let node: Node | null;
    while ((node = textNodeWalker.nextNode())) {
        const text = node.textContent ?? '';
        if (retiredCampusDomains.some(domain => text.includes(domain))) {
            node.textContent = retiredCampusDomains.reduce(
                (value, domain) => value.replaceAll(domain, 'iu.edu'),
                text
            );
        }
    }
}

export const iuEduEmail: Rule = {
    id: "iu-edu-email",
    title: 'Migrate to @iu.edu Email',
    description: 'Replace any campus-specific email address (e.g. @indiana.edu) with @iu.edu',
    friendlyDescription: 'Replace any campus-specific email address (e.g. @indiana.edu) with @iu.edu',
    howToFix: 'In the Editor, updates links and email addresses to use @iu.edu by changing text or editing the "href" of a link.',
    impact: 'serious',
    customCheck: iuEduEmailCheck,
    autoFixFunction: iuEduEmailFix
};
