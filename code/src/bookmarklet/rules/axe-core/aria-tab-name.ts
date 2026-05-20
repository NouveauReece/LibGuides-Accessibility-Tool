import type { Rule, AutoFixFunction } from '../types';

export const ariaTabName: Rule = {
  title: 'ARIA Tab Elements Have Names',
  description: 'Ensure every ARIA tab node has an accessible name',
  friendlyDescription: 'ARIA tabs need accessible names so screen readers can announce what each tab contains or represents.',
  howToFix: 'Add aria-label, aria-labelledby, or visible text to name the tab.',
  impact: 'serious'
};
