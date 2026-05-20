import type { Rule, AutoFixFunction } from '../types';

export const skipLink: Rule = {
  title: 'Skip Links Have Focusable Targets',
  description: 'Ensure all skip links have a focusable target',
  friendlyDescription: 'Skip links (like "Skip to main content") must point to focusable elements. If the target isn\'t focusable, keyboard users can\'t reach main content.',
  impact: 'moderate'
};
