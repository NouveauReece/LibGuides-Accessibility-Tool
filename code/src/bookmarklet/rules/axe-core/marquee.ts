import type { Rule, AutoFixFunction } from '../types';

export const marquee: Rule = {
  title: 'No Marquee Elements',
  description: 'Ensure <marquee> elements are not used',
  friendlyDescription: 'The <marquee> element (which makes text scroll) is outdated and harmful. It distracts users and can trigger motion sensitivity issues. Don\'t use it.',
  howToFix: 'Remove <marqueee> elements using the LibGuides Rich Text Editor > Source',
  impact: 'serious'
};
