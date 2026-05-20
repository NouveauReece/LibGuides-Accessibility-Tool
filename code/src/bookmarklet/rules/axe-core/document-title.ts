import type { Rule, AutoFixFunction } from '../types';

export const documentTitle: Rule = {
  title: 'Page Has a Title',
  description: 'Ensure each HTML document contains a non-empty <title> element',
  friendlyDescription: 'Every page needs a unique, descriptive title in the <title> tag. This appears in browser tabs and helps screen readers and search engines understand the page.',
  howToFix: 'Add a descriptive <title> element in the <head> of the page.',
  impact: 'serious'
};
