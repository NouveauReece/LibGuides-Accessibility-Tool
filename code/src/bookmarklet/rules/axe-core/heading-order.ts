import type { Rule, AutoFixFunction } from '../types';

export const headingOrder: Rule = {
  title: 'Incorrect Heading Order',
  description: 'Ensure that headings (e.g. <h5>) have the correct nesting',
  friendlyDescription: 'Ensure that headings (e.g. <h5>) have the correct order',
  howToFix: "In the LibGuides Rich Text Editor and Source Editor, make sure 'subtopic' headings (e.g. <h5>) are within their parent topics (e.g. the correct <h4>). Beware headings that look like paragraph text but are actually a heading!",
  impact: 'serious'
};
