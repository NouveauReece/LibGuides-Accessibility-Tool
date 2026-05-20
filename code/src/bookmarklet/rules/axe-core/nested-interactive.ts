import type { Rule, AutoFixFunction } from '../types';

export const nestedInteractive: Rule = {
  title: 'Interactive Controls Are Not Nested',
  description: 'Ensure interactive controls are not nested as they are not always announced by screen readers or can cause focus problems for assistive technologies',
  friendlyDescription: 'Don\'t put interactive elements (buttons, links, form fields) inside other interactive elements. This confuses screen readers and keyboard navigation.',
  howToFix: 'Move nested interactive elements outside the parent interactive element.',
  impact: 'serious'
};
