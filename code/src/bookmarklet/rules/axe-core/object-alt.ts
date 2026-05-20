import type { Rule, AutoFixFunction } from '../types';

export const objectAlt: Rule = {
  title: 'Embedded Objects Have Alt Text',
  description: 'Ensure <object> elements have alternative text',
  friendlyDescription: 'Embedded objects like Java applets or plugins need alternative text describing what they display, similar to image alt text.',
  howToFix: 'Add descriptive text inside <object> element or use aria-label.',
  impact: 'serious'
};
