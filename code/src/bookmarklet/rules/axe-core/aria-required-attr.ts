import type { Rule, AutoFixFunction } from '../types';

export const ariaRequiredAttr: Rule = {
  title: 'ARIA Roles Have Required Attributes',
  description: 'Ensure elements with ARIA roles have all required ARIA attributes',
  friendlyDescription: 'Each ARIA role has mandatory attributes that must be present. Missing required attributes means screen readers can\'t properly convey the element\'s state and function.',
  howToFix: 'Add all required ARIA attributes for the element\'s role.',
  impact: 'critical'
};
