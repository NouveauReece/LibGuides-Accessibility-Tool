import type { Rule, AutoFixFunction } from '../types';

export const ariaAllowedAttr: Rule = {
  title: 'ARIA Attributes Are Valid for Element Role',
  description: 'Ensure an element\'s role supports its ARIA attributes',
  friendlyDescription: 'Each ARIA role has specific attributes it can use. Using unsupported ARIA attributes on a role can confuse screen readers and assistive technology.',
  howToFix: 'Remove ARIA attributes that are not allowed for the element\'s role. Check ARIA specifications for valid attributes.',
  impact: 'critical'
};
