import type { Rule, AutoFixFunction } from '../types';

export const ariaRoles: Rule = {
  title: 'ARIA Roles Are Valid',
  description: 'Ensure all elements with a role attribute use a valid value',
  friendlyDescription: 'Only use ARIA roles that actually exist in the ARIA specification. Misspelled or made-up roles won\'t be recognized by screen readers.',
  howToFix: 'Use a valid ARIA role or remove the role attribute.',
  impact: 'critical'
};
