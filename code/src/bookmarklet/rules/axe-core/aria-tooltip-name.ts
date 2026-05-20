import type { Rule, AutoFixFunction } from '../types';

export const ariaTooltipName: Rule = {
  title: 'ARIA Tooltips Have Names',
  description: 'Ensure every ARIA tooltip node has an accessible name',
  friendlyDescription: 'ARIA tooltips need accessible names describing what they provide information about, so screen readers can announce them when the element is focused.',
  howToFix: 'Add aria-label or aria-labelledby to name the tooltip.',
  impact: 'serious'
};
