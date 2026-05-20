import type { Rule, AutoFixFunction } from '../types';

export const summaryName: Rule = {
  title: 'Summary Elements Have Text',
  description: 'Ensure summary elements have discernible text',
  friendlyDescription: 'The <summary> element (used with <details>) must have visible text describing what the collapsible section contains.',
  howToFix: 'Add descriptive text inside <summary> element.',
  impact: 'serious'
};
