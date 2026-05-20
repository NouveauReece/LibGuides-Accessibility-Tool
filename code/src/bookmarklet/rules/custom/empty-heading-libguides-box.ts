import type { Rule, AutoFixFunction } from '../types';

export const emptyHeadingLibguidesBox: Rule = {
  title: 'Heading is Completely Empty',
  description: 'LibGuides box titles or headings with no text content',
  friendlyDescription: 'Empty headings provide no information about what content follows. Delete the heading or add descriptive text describing the section.',
  howToFix: 'Delete the heading or add descriptive text.',
  impact: 'serious'
};
