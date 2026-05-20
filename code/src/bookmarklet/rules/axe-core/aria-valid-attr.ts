import type { Rule, AutoFixFunction } from '../types';

export const ariaValidAttr: Rule = {
  title: 'ARIA Attribute Names Are Valid',
  description: 'Ensure attributes that begin with aria- are valid ARIA attributes',
  friendlyDescription: 'Only use real ARIA attributes (like aria-label, aria-hidden). Misspelled or made-up attributes starting with "aria-" will be ignored by screen readers.',
  howToFix: 'Remove invalid ARIA attributes or correct spelling to valid ARIA attribute names.',
  impact: 'critical'
};
