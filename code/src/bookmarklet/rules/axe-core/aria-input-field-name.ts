import type { Rule, AutoFixFunction } from '../types';

export const ariaInputFieldName: Rule = {
  title: 'ARIA Input Fields Have Names',
  description: 'Ensure every ARIA input field has an accessible name',
  friendlyDescription: 'ARIA input fields need accessible names so screen readers can announce what information users should enter.',
  howToFix: 'Add aria-label, aria-labelledby, or associated label element to name the input.',
  impact: 'serious'
};
