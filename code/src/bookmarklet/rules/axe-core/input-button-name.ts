import type { Rule, AutoFixFunction } from '../types';

export const inputButtonName: Rule = {
  title: 'Input Buttons Have Descriptive Text',
  description: 'Ensure input buttons have discernible text',
  friendlyDescription: 'Input buttons (<input type="button">) must have visible text or a value attribute so screen readers can announce their purpose.',
  howToFix: 'Add value attribute or use <button> element with visible text instead.',
  impact: 'critical'
};
