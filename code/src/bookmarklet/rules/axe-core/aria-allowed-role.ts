import type { Rule, AutoFixFunction } from '../types';

export const ariaAllowedRole: Rule = {
  title: 'ARIA Roles Match HTML Semantics',
  description: 'Ensure role attribute has an appropriate value for the element',
  friendlyDescription: 'ARIA roles should match the semantic meaning of the HTML element. Using conflicting roles confuses assistive technology.',
  impact: 'minor'
};
