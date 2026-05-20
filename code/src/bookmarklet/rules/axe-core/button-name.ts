import type { Rule, AutoFixFunction } from '../types';

export const buttonName: Rule = {
  title: 'Buttons Have Descriptive Text',
  description: 'Ensure buttons have discernible text',
  friendlyDescription: 'Every button must have visible text or a label so screen readers can announce what it does. Avoid empty buttons with only icons.',
  howToFix: 'Add visible text to button or add aria-label describing button action.',
  impact: 'critical'
};
