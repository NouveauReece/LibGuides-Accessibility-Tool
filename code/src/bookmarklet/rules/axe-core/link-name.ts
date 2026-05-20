import type { Rule, AutoFixFunction } from '../types';

export const linkName: Rule = {
  title: 'Links Have Descriptive Text',
  description: 'Ensure links have discernible text',
  friendlyDescription: 'Links must have descriptive text explaining where they go. Avoid generic phrases like "click here" or "read more"—be specific.',
  howToFix: 'Change link text to be descriptive of destination or add aria-label.',
  impact: 'serious'
};
