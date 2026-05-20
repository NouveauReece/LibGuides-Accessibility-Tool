import type { Rule, AutoFixFunction } from '../types';

export const ariaProhibitedAttr: Rule = {
  title: 'ARIA Attributes Not Used With Wrong Roles',
  description: 'Ensure ARIA attributes are not prohibited for an element\'s role',
  friendlyDescription: 'Some ARIA roles don\'t allow certain attributes. Using prohibited attributes can confuse screen readers about what an element does.',
  howToFix: 'Remove prohibited ARIA attributes from the element.',
  impact: 'serious'
};
