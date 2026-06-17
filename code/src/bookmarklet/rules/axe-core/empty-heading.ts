import type { Rule, AutoFixFunction } from '../types';

export const emptyHeading: Rule = {
  title: 'Empty Heading',
  description: "A heading (e.g. <h4>) doesn't have text",
  friendlyDescription: "A heading (e.g. <h4>) doesn't have text",
  howToFix: "In the LibGuides Rich Text Editor > Source, manually remove any <h1>, <h2>, etc. that are empty.",
  impact: 'critical'
};
