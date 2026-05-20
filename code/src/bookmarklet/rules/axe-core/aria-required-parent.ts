import type { Rule, AutoFixFunction } from '../types';

export const ariaRequiredParent: Rule = {
  title: 'ARIA Elements Have Required Parent Roles',
  description: 'Ensure elements with an ARIA role that require parent roles are contained by them',
  friendlyDescription: 'Some ARIA roles must be contained within specific parent roles. Elements placed outside the correct parent can confuse screen readers about the content structure.',
  howToFix: 'Move element inside the required parent role element.',
  impact: 'critical'
};
