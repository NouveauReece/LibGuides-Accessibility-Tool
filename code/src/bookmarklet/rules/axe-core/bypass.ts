import type { Rule, AutoFixFunction } from '../types';

export const bypass: Rule = {
  title: 'Skip Navigation Links Available',
  description: 'Ensure each page has at least one mechanism for a user to bypass navigation and jump straight to the content',
  friendlyDescription: 'Keyboard users and screen reader users should be able to skip past repetitive navigation to get to the main content. Add a "Skip to content" link at the top of your page.',
  howToFix: 'Add a "Skip to main content" link that jumps to the main content area.',
  impact: 'serious'
};
