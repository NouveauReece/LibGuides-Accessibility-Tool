import type { Rule, AutoFixFunction } from '../types';

export const ariaMeterName: Rule = {
  title: 'ARIA Meter Elements Have Names',
  description: 'Ensure every ARIA meter node has an accessible name',
  friendlyDescription: 'ARIA meter elements (progress indicators) need accessible names so screen readers can explain what is being measured.',
  howToFix: 'Add aria-label or aria-labelledby to describe what the meter measures.',
  impact: 'serious'
};
