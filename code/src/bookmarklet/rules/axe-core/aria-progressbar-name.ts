import type { Rule, AutoFixFunction } from '../types';

export const ariaProgressbarName: Rule = {
  title: 'ARIA Progress Bars Have Names',
  description: 'Ensure every ARIA progressbar node has an accessible name',
  friendlyDescription: 'ARIA progress bars need accessible names so screen readers can explain what process is being tracked.',
  howToFix: 'Add aria-label or aria-labelledby to describe what is being tracked.',
  impact: 'serious'
};
