import type { Rule, AutoFixFunction } from '../types';

export const ariaToggleFieldName: Rule = {
  title: 'ARIA Toggle Fields Have Names',
  description: 'Ensure every ARIA toggle field has an accessible name',
  friendlyDescription: 'ARIA toggle fields (like checkboxes or switches) need accessible names so screen readers can explain what is being toggled on or off.',
  howToFix: 'Add aria-label, aria-labelledby, or associated label element to name the field.',
  impact: 'serious'
};
