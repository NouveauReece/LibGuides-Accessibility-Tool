import type { Rule, AutoFixFunction } from '../types';

export const linkNewWindow: Rule = {
  title: 'Links Open in New Window Without Warning',
  description: 'Links with target="_blank" that don\'t warn users they\'re opening in a new tab',
  friendlyDescription: 'When links open in a new window/tab, users should know in advance so they aren\'t surprised. If you use target="_blank", add text like "(opens in new tab)" or use a visual indicator.',
  howToFix: 'Add text like "(opens in new tab)" to warn users, or avoid opening new windows.',
  impact: 'moderate'
};
