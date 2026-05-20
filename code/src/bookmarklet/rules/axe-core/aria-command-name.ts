import type { Rule, AutoFixFunction } from '../types';

export const ariaCommandName: Rule = {
  title: 'Interactive Elements Have Accessible Names',
  description: 'Ensure every ARIA button, link and menuitem has an accessible name',
  friendlyDescription: 'ARIA buttons, links, and menu items need accessible names so screen reader users know what they do. This can be visible text or ARIA labels.',
  howToFix: 'Add visible text, aria-label, aria-labelledby, or title attribute to name the element.',
  impact: 'serious'
};
